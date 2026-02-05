import {
  initDB,
  getRandomNotRecentlyShown,
  getMultipleNotRecentlyShown,
  logActivity,
  getTodayActivity,
  getCompletedPuzzles,
  savePuzzleProgress,
  saveQuizScore,
  saveGameScore,
  getGameHighScore,
  cleanupShownRecords,
  getAll,
  getAllQuizStats,
  getWeeklyStats,
  getUnlockedAchievements,
  unlockAchievement
} from './db.js';
import { initFallbackQuotes, refreshAllContent, FALLBACK_QUOTES, LONG_READS } from './content-fetchers.js';
import { EXERCISE_CATEGORIES, EXERCISES, getRandomExercise } from './exercises.js';
import { MYSTERY_PUZZLES, getRandomMystery, checkMysteryAnswer } from './puzzles-mystery.js';
import { MINI_CROSSWORDS, getRandomCrossword, isCrosswordComplete } from './puzzles-crossword.js';
import { BRITPOP_QUESTIONS, getQuizQuestions } from './quiz-britpop.js';
import { ANAGRAMS, MISSING_LETTERS, WORD_CLUES, WORD_SEARCHES, getRandomAnagram, getRandomMissingLetters, getRandomWordClue, getRandomWordSearch, checkAnagramAnswer, checkMissingLettersAnswer, checkWordClueAnswer } from './puzzles-words.js';
import { TetrisGame } from './game-tetris.js';
import { getBatchedContent, getWordPuzzlesByType } from './content-batch.js';
import { createExerciseAnimation } from './stick-figure.js';
import { ACHIEVEMENTS, checkAchievements } from './achievements.js';
import { fetchNews, getCategories, formatTimeAgo, clearCache as clearNewsCache } from './news.js';

/**
 * Play a celebration sound using Web Audio API
 * Creates a pleasant chime without needing audio files
 */
function playCelebrationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Play a pleasant ascending arpeggio (C-E-G-C)
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = freq;
      osc.type = 'sine';

      const startTime = now + i * 0.1;
      const duration = 0.3;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });

    // Clean up context after sounds finish
    setTimeout(() => ctx.close(), 1000);
  } catch (e) {
    // Silently fail - sound is not critical
    console.log('Sound not available:', e.message);
  }
}

/**
 * Play a raspberry/buzzer sound for wrong answers
 * Creates a fun descending "wah-wah" effect
 */
function playWrongSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Create two oscillators for a "wah-wah" effect
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    // Low buzzy sound with descending pitch
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(100, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(80, now + 0.3);

    // Second oscillator slightly detuned for thickness
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(198, now);
    osc2.frequency.exponentialRampToValueAtTime(98, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(78, now + 0.3);

    // Volume envelope
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);

    setTimeout(() => ctx.close(), 500);
  } catch (e) {
    console.log('Sound not available:', e.message);
  }
}

/**
 * Main App
 * 
 * Philosophy:
 * - Show content immediately (from cache)
 * - Refresh in background (if online)
 * - Never show loading spinners
 * - Never notify
 * - Never repeat content within 10 days
 * - Just be there when she opens it
 */

class CarerCalmApp {
  constructor() {
    this.currentView = 'home';
    this.currentExercise = null;
    this.currentMystery = null;
    this.mysteryAnswer = null;
    this.currentCrossword = null;
    this.crosswordAnswers = {};
    this.currentQuiz = null;
    this.quizAnswers = [];
    this.quizScore = 0;
    this.quizIndex = 0;
    this.tetrisGame = null;
    this.currentWordPuzzle = null;
    this.wordPuzzleType = null;
    this.wordSearchFound = [];
    this.currentAnimator = null;
    // Track shown exercises per category to prevent repeats
    this.shownExercisesThisSession = new Map(); // category -> Set of exercise IDs
    // News state
    this.newsCategory = 'headlines';
    this.newsItems = [];
    this.newsLoading = false;
    this.selectedArticle = null;
  }

  async init() {
    await initDB();
    await initFallbackQuotes();
    
    // Clean up old shown records
    cleanupShownRecords();
    
    // Refresh content in background (won't block)
    refreshAllContent();
    
    // Render initial view
    this.render();
    
    // Set up navigation
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Handle back navigation
    window.addEventListener('popstate', () => {
      this.stopTetris();
      this.currentView = 'home';
      this.resetGameState();
      this.render();
    });
  }
  
  resetGameState() {
    this.currentExercise = null;
    this.currentMystery = null;
    this.mysteryAnswer = null;
    this.currentCrossword = null;
    this.crosswordAnswers = {};
    this.currentQuiz = null;
    this.quizAnswers = [];
    this.quizScore = 0;
    this.quizIndex = 0;
    this.currentWordPuzzle = null;
    this.wordPuzzleType = null;
    this.wordSearchFound = [];
    if (this.currentAnimator) {
      this.currentAnimator.stop();
      this.currentAnimator = null;
    }
  }

  stopAnimator() {
    if (this.currentAnimator) {
      this.currentAnimator.stop();
      this.currentAnimator = null;
    }
  }

  stopTetris() {
    if (this.tetrisGame) {
      this.tetrisGame.stop();
      this.tetrisGame = null;
    }
  }

  async render() {
    const app = document.getElementById('app');
    
    // Stop tetris if leaving that view
    if (this.currentView !== 'tetris') {
      this.stopTetris();
    }
    
    switch (this.currentView) {
      case 'home':
        app.innerHTML = await this.renderHome();
        break;
      case 'exercise':
        app.innerHTML = this.renderExercise();
        this.initExerciseAnimation();
        break;
      case 'scroll':
        app.innerHTML = await this.renderScrollContent();
        break;
      case 'games':
        app.innerHTML = this.renderGamesMenu();
        break;
      case 'mystery':
        app.innerHTML = await this.renderMystery();
        break;
      case 'crossword':
        app.innerHTML = await this.renderCrossword();
        break;
      case 'quiz':
        if (!this.currentQuiz) {
          await this.loadQuizAsync();
        }
        app.innerHTML = this.renderQuiz();
        break;
      case 'anagram':
      case 'missing-letters':
      case 'word-clue':
        if (!this.currentWordPuzzle) {
          await this.loadWordPuzzleAsync();
        }
        app.innerHTML = this.renderWordPuzzle();
        break;
      case 'word-search':
        if (!this.currentWordPuzzle) {
          await this.loadWordSearchAsync();
        }
        app.innerHTML = this.renderWordSearch();
        break;
      case 'tetris':
        app.innerHTML = this.renderTetris();
        this.initTetris();
        break;
      case 'weekly':
        app.innerHTML = await this.renderWeekly();
        break;
      case 'news':
        app.innerHTML = await this.renderNews();
        break;
      case 'news-article':
        app.innerHTML = this.renderNewsArticle();
        break;
    }

    this.attachEventHandlers();
  }

  async renderHome() {
    // Get content with 10-day rotation
    const image = await getRandomNotRecentlyShown('images', 'image');
    const quote = await getRandomNotRecentlyShown('quotes', 'quote') 
      || FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    const todayActivity = await getTodayActivity();
    
    const exerciseCount = todayActivity.filter(a => a.type === 'exercise').length;
    const breathCount = todayActivity.filter(a => a.type === 'breathe').length;
    const gameCount = todayActivity.filter(a => a.type === 'game' || a.type === 'puzzle' || a.type === 'quiz').length;
    
    const imageStyle = image 
      ? `background-image: url('${image.thumbUrl}'); background-size: cover; background-position: center;`
      : `background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #e1bee7 50%, #d1c4e9 75%, #bbdefb 100%); background-size: 200% 200%;`;

    const todayParts = [];
    if (exerciseCount > 0) todayParts.push(`${exerciseCount} movement${exerciseCount > 1 ? 's' : ''}`);
    if (breathCount > 0) todayParts.push(`${breathCount} breath${breathCount > 1 ? 's' : ''}`);
    if (gameCount > 0) todayParts.push(`${gameCount} game${gameCount > 1 ? 's' : ''}`);
    
    const todaySection = todayParts.length > 0
      ? `<div class="today-wins">Today: ${todayParts.join(' · ')}</div>`
      : '';

    return `
      <div class="home">
        <div class="hero" style="${imageStyle}">
          <div class="hero-overlay"></div>
          ${image ? `<div class="photo-credit">Photo: ${image.photographer}</div>` : ''}
        </div>
        
        <div class="content">
          <div class="quote-section">
            <p class="quote">"${quote.text}"</p>
            ${quote.author !== 'Unknown' ? `<p class="quote-author">— ${quote.author}</p>` : ''}
          </div>

          ${todaySection}
          
          <div class="prompt">What do you need?</div>
          
          <div class="category-buttons">
            ${Object.entries(EXERCISE_CATEGORIES).map(([id, cat]) => `
              <button class="category-btn" data-category="${id}">
                <span class="category-icon">${cat.icon}</span>
                <span class="category-label">${cat.label}</span>
              </button>
            `).join('')}
          </div>
          
          <div class="secondary-buttons">
            <button class="secondary-btn" data-action="games">
              🎮 Play something
            </button>
            <button class="secondary-btn" data-action="scroll">
              📖 Something to read
            </button>
            <button class="secondary-btn" data-action="news">
              📰 News
            </button>
          </div>

          <div class="weekly-button-container" style="margin-top: 1.5rem; text-align: center;">
            <button class="weekly-btn" data-action="weekly">
              📊 Your Week
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderExercise() {
    const ex = this.currentExercise;
    if (!ex) return this.renderHome();

    const category = EXERCISE_CATEGORIES[ex.category];
    const minutes = Math.floor(ex.duration / 60);
    const seconds = ex.duration % 60;
    const durationText = minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, '0')}`
      : `${seconds} seconds`;

    // Stop any existing animator before creating new one
    this.stopAnimator();

    return `
      <div class="exercise-view">
        <button class="back-btn" data-action="back">← Back</button>

        <div class="exercise-header">
          <div class="stick-figure-placeholder" id="exercise-animation"></div>
          <h1 class="exercise-name">${ex.name}</h1>
          <p class="exercise-duration">${durationText}</p>
        </div>

        <div class="exercise-steps">
          ${ex.steps.map((step, i) => `
            <div class="step">
              <span class="step-number">${i + 1}</span>
              <span class="step-text">${step}</span>
            </div>
          `).join('')}
        </div>

        <div class="exercise-footer">
          <button class="done-btn" data-action="done">Done</button>
          <p class="stop-note">Stop whenever you need to. There's no wrong way to do this.</p>
        </div>
      </div>
    `;
  }

  initExerciseAnimation() {
    if (!this.currentExercise) return;

    const placeholder = document.getElementById('exercise-animation');
    if (!placeholder) return;

    const { container, animator } = createExerciseAnimation(this.currentExercise);
    placeholder.appendChild(container);
    this.currentAnimator = animator;
  }

  renderGamesMenu() {
    return `
      <div class="games-menu">
        <button class="back-btn" data-action="home">← Back</button>
        
        <h1 class="games-title">Play something</h1>
        <p class="games-subtitle">A few minutes of distraction</p>
        
        <div class="games-list">
          <button class="game-btn" data-game="tetris">
            <span class="game-icon">🧱</span>
            <div class="game-info">
              <span class="game-name">Blocks</span>
              <span class="game-desc">Classic falling blocks - zone out</span>
            </div>
          </button>
          
          <button class="game-btn" data-game="mystery">
            <span class="game-icon">🔍</span>
            <div class="game-info">
              <span class="game-name">Mini Mystery</span>
              <span class="game-desc">Who did it? Cluedo-style puzzles</span>
            </div>
          </button>
          
          <button class="game-btn" data-game="crossword">
            <span class="game-icon">✏️</span>
            <div class="game-info">
              <span class="game-name">Mini Crossword</span>
              <span class="game-desc">Quick 5×5 word puzzles</span>
            </div>
          </button>
          
          <button class="game-btn" data-game="quiz">
            <span class="game-icon">🎵</span>
            <div class="game-info">
              <span class="game-name">Britpop Quiz</span>
              <span class="game-desc">90s music trivia</span>
            </div>
          </button>

          <button class="game-btn" data-game="anagram">
            <span class="game-icon">🔤</span>
            <div class="game-info">
              <span class="game-name">Anagram</span>
              <span class="game-desc">Unscramble the letters</span>
            </div>
          </button>

          <button class="game-btn" data-game="missing-letters">
            <span class="game-icon">✍️</span>
            <div class="game-info">
              <span class="game-name">Missing Letters</span>
              <span class="game-desc">Fill in the blanks</span>
            </div>
          </button>

          <button class="game-btn" data-game="word-clue">
            <span class="game-icon">💡</span>
            <div class="game-info">
              <span class="game-name">Word Clue</span>
              <span class="game-desc">Guess the word from the clue</span>
            </div>
          </button>

          <button class="game-btn" data-game="word-search">
            <span class="game-icon">🔎</span>
            <div class="game-info">
              <span class="game-name">Word Search</span>
              <span class="game-desc">Find the hidden words</span>
            </div>
          </button>
        </div>
      </div>
    `;
  }

  async renderScrollContent() {
    // Get content with 10-day rotation
    const stories = await getMultipleNotRecentlyShown('stories', 'story', 5);
    const quotes = await getMultipleNotRecentlyShown('quotes', 'quote', 3);
    const images = await getMultipleNotRecentlyShown('images', 'image', 3);
    
    const content = [];
    
    if (images[0]) {
      content.push({ type: 'image', data: images[0] });
    }
    
    stories.forEach((story, i) => {
      content.push({ type: 'story', data: story });
      if (quotes[i]) {
        content.push({ type: 'quote', data: quotes[i] });
      }
      if (images[i + 1]) {
        content.push({ type: 'image', data: images[i + 1] });
      }
    });

    if (content.length === 0) {
      const fallbackQuotes = FALLBACK_QUOTES
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      fallbackQuotes.forEach(q => {
        content.push({ type: 'quote', data: { text: q.text, author: q.author } });
      });
    }

    // Add multiple long reads spread through the content (server batch + bundled fallback)
    const batchedReads = await getBatchedContent('long-reads', LONG_READS);
    const shuffledReads = [...batchedReads].sort(() => Math.random() - 0.5).slice(0, 3);
    shuffledReads.forEach((read, i) => {
      const pos = Math.min(2 + i * 3, content.length);
      content.splice(pos, 0, { type: 'long-read', data: read });
    });

    return `
      <div class="scroll-view">
        <button class="back-btn" data-action="home">← Back</button>

        <div class="scroll-content">
          ${content.map(item => this.renderScrollItem(item)).join('')}
        </div>

        <div class="scroll-footer">
          <p>That's all for now.</p>
          <button class="home-btn" data-action="home">Back to start</button>
        </div>
      </div>
    `;
  }

  renderScrollItem(item) {
    switch (item.type) {
      case 'image':
        return `
          <div class="scroll-item scroll-image">
            <img src="${item.data.url}" alt="${item.data.alt}" loading="lazy">
            <p class="photo-credit">Photo: ${item.data.photographer}</p>
          </div>
        `;
      
      case 'story':
        return `
          <div class="scroll-item scroll-story">
            <h3>${item.data.title}</h3>
            <p>${item.data.description}</p>
            ${item.data.link ? `<a href="${item.data.link}" target="_blank" rel="noopener">Read more →</a>` : ''}
          </div>
        `;
      
      case 'quote':
        return `
          <div class="scroll-item scroll-quote">
            <p class="quote">"${item.data.text}"</p>
            ${item.data.author && item.data.author !== 'Unknown'
              ? `<p class="quote-author">— ${item.data.author}</p>`
              : ''}
          </div>
        `;

      case 'long-read':
        return `
          <div class="scroll-item scroll-story long-read">
            <div class="long-read-badge">${item.data.readTime} read</div>
            <h3>${item.data.title}</h3>
            ${item.data.paragraphs.map(p => `<p>${p}</p>`).join('')}
          </div>
        `;

      default:
        return '';
    }
  }

  // ==================
  // MYSTERY PUZZLE
  // ==================
  
  async renderMystery() {
    if (!this.currentMystery) {
      const completed = await getCompletedPuzzles('mystery');
      const completedIds = completed.map(p => p.puzzleId);
      // Try batched mysteries first, fall back to bundled
      const batchedMysteries = await getBatchedContent('mysteries', []);
      const allMysteries = [...MYSTERY_PUZZLES, ...batchedMysteries];
      // Dedupe by id
      const seen = new Set();
      const deduped = allMysteries.filter(m => {
        if (seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      });
      const available = deduped.filter(p => !completedIds.includes(p.id));
      const pool = available.length > 0 ? available : deduped;
      this.currentMystery = pool[Math.floor(Math.random() * pool.length)];
      this.mysteryAnswer = { who: null, where: null, evidence: null };
    }
    
    const m = this.currentMystery;
    
    return `
      <div class="mystery-view">
        <button class="back-btn" data-action="back">← Back</button>
        
        <div class="mystery-header">
          <h1 class="mystery-title">🔍 ${m.title}</h1>
          <p class="mystery-scenario">${m.scenario}</p>
        </div>
        
        <div class="mystery-clues">
          <h3>The Clues:</h3>
          <ul>
            ${m.clues.map(clue => `<li>${clue}</li>`).join('')}
          </ul>
        </div>
        
        <div class="mystery-answer">
          <h3>Your deduction:</h3>
          
          <div class="mystery-select">
            <label>Who did it?</label>
            <div class="option-buttons" data-field="who">
              ${m.suspects.map(s => `
                <button class="option-btn ${this.mysteryAnswer?.who === s ? 'selected' : ''}" data-value="${s}">${s}</button>
              `).join('')}
            </div>
          </div>
          
          <div class="mystery-select">
            <label>Where?</label>
            <div class="option-buttons" data-field="where">
              ${m.locations.map(l => `
                <button class="option-btn ${this.mysteryAnswer?.where === l ? 'selected' : ''}" data-value="${l}">${l}</button>
              `).join('')}
            </div>
          </div>
          
          <div class="mystery-select">
            <label>The evidence?</label>
            <div class="option-buttons" data-field="evidence">
              ${m.items.map(i => `
                <button class="option-btn ${this.mysteryAnswer?.evidence === i ? 'selected' : ''}" data-value="${i}">${i}</button>
              `).join('')}
            </div>
          </div>
          
          <button class="submit-btn" data-action="check-mystery" 
            ${this.mysteryAnswer?.who && this.mysteryAnswer?.where && this.mysteryAnswer?.evidence ? '' : 'disabled'}>
            Solve the mystery
          </button>
        </div>
      </div>
    `;
  }

  // ==================
  // CROSSWORD
  // ==================
  
  async renderCrossword() {
    if (!this.currentCrossword) {
      const completed = await getCompletedPuzzles('crossword');
      const completedIds = completed.map(p => p.puzzleId);
      // Try batched crosswords first, fall back to bundled
      const batchedCrosswords = await getBatchedContent('crosswords', []);
      const allCrosswords = [...MINI_CROSSWORDS, ...batchedCrosswords];
      const seen = new Set();
      const deduped = allCrosswords.filter(c => {
        if (seen.has(c.id)) return false;
        seen.add(c.id);
        return true;
      });
      const available = deduped.filter(c => !completedIds.includes(c.id));
      const pool = available.length > 0 ? available : deduped;
      this.currentCrossword = pool[Math.floor(Math.random() * pool.length)];
      this.crosswordAnswers = {};
    }
    
    const c = this.currentCrossword;
    
    return `
      <div class="crossword-view">
        <button class="back-btn" data-action="back">← Back</button>
        
        <h1 class="crossword-title">✏️ ${c.title}</h1>
        
        <div class="crossword-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; max-width: 250px; margin: 0 auto;">
          ${c.grid.map((row, rowIdx) => 
            row.map((cell, colIdx) => {
              if (cell === '#') {
                return `<div class="crossword-cell black" style="background: #333; aspect-ratio: 1;"></div>`;
              }
              const number = this.getCellNumber(c, rowIdx, colIdx);
              return `
                <div class="crossword-cell" style="position: relative; aspect-ratio: 1; border: 1px solid #ccc;">
                  ${number ? `<span class="cell-number" style="position: absolute; top: 1px; left: 2px; font-size: 8px; color: #666;">${number}</span>` : ''}
                  <input type="text" maxlength="1" 
                    data-row="${rowIdx}" data-col="${colIdx}"
                    value="${this.crosswordAnswers[`${rowIdx}-${colIdx}`] || ''}"
                    class="cell-input"
                    style="width: 100%; height: 100%; border: none; text-align: center; font-size: 18px; text-transform: uppercase; background: transparent;">
                </div>
              `;
            }).join('')
          ).join('')}
        </div>
        
        <div class="crossword-clues" style="margin-top: 1.5rem;">
          <div class="clue-section">
            <h3>Across</h3>
            ${c.across.map(clue => `
              <p class="clue" style="margin: 0.5rem 0; font-size: 0.9rem;"><strong>${clue.number}.</strong> ${clue.clue}</p>
            `).join('')}
          </div>
          <div class="clue-section" style="margin-top: 1rem;">
            <h3>Down</h3>
            ${c.down.map(clue => `
              <p class="clue" style="margin: 0.5rem 0; font-size: 0.9rem;"><strong>${clue.number}.</strong> ${clue.clue}</p>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="submit-btn" data-action="check-crossword">Check answers</button>
          <button class="secondary-btn" data-action="reveal-crossword">Reveal answers</button>
        </div>
      </div>
    `;
  }
  
  getCellNumber(crossword, row, col) {
    for (const clue of crossword.across) {
      if (clue.row === row && clue.col === col) return clue.number;
    }
    for (const clue of crossword.down) {
      if (clue.row === row && clue.col === col) return clue.number;
    }
    return null;
  }

  // ==================
  // BRITPOP QUIZ
  // ==================
  
  async loadQuizAsync() {
    // Load quiz stats for display
    this.quizStats = await getAllQuizStats();

    // Merge batched questions with bundled ones
    const batchedQuestions = await getBatchedContent('quiz-questions', []);
    const allQuestions = [...BRITPOP_QUESTIONS, ...batchedQuestions];
    const seen = new Set();
    const deduped = allQuestions.filter(q => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });
    const shuffled = deduped.sort(() => Math.random() - 0.5);
    this.currentQuiz = shuffled.slice(0, 10);
    this.quizAnswers = [];
    this.quizScore = 0;
    this.quizIndex = 0;
  }

  renderQuiz() {
    if (!this.currentQuiz) {
      return '<div class="loading"><p>Loading quiz...</p></div>';
    }

    // Show results if done
    if (this.quizIndex >= this.currentQuiz.length) {
      return this.renderQuizResults();
    }

    const q = this.currentQuiz[this.quizIndex];
    const stats = this.quizStats || { totalQuizzes: 0, averagePercent: 0 };

    return `
      <div class="quiz-view">
        <button class="back-btn" data-action="back">← Back</button>

        <div class="quiz-header">
          <span class="quiz-progress">Question ${this.quizIndex + 1} of ${this.currentQuiz.length}</span>
          <span class="quiz-score">Score: ${this.quizScore}</span>
        </div>

        ${stats.totalQuizzes > 0 ? `
          <div class="quiz-all-time-stats" style="text-align: center; font-size: 0.85rem; color: var(--text-soft); margin-bottom: 1rem;">
            All-time: ${stats.totalQuizzes} quizzes · ${stats.averagePercent}% avg${stats.bestScore === 100 ? ' · 🏆' : ''}
          </div>
        ` : ''}

        <div class="quiz-question">
          <p class="question-text">${q.question}</p>

          <div class="quiz-options">
            ${q.options.map(opt => `
              <button class="quiz-option" data-answer="${opt}">${opt}</button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  renderQuizResults() {
    const percentage = Math.round((this.quizScore / this.currentQuiz.length) * 100);
    
    let message = '';
    if (percentage === 100) message = '🎸 Perfect! You really know your Britpop!';
    else if (percentage >= 80) message = '🎵 Brilliant! Proper 90s knowledge!';
    else if (percentage >= 60) message = '🎤 Not bad! Got some good memories there.';
    else if (percentage >= 40) message = '📻 Could do with a bit more Radio 1 circa 1995!';
    else message = '💿 Time for a Britpop refresher course!';
    
    return `
      <div class="quiz-view">
        <button class="back-btn" data-action="back">← Back</button>
        
        <div class="quiz-results">
          <h1>🎵 Quiz Complete!</h1>
          <p class="result-score">${this.quizScore} out of ${this.currentQuiz.length}</p>
          <p class="result-message">${message}</p>
          
          <button class="submit-btn" data-action="quiz-again">Play again</button>
          <button class="secondary-btn" data-action="back" style="margin-top: 1rem; display: block; width: 100%;">Back to games</button>
        </div>
      </div>
    `;
  }

  // ==================
  // WORD PUZZLES
  // ==================

  async loadWordPuzzleAsync() {
    if (this.currentView === 'anagram') {
      const batched = await getWordPuzzlesByType('anagrams', []);
      const all = [...ANAGRAMS, ...batched];
      this.currentWordPuzzle = all[Math.floor(Math.random() * all.length)];
      this.wordPuzzleType = 'anagram';
    } else if (this.currentView === 'missing-letters') {
      const batched = await getWordPuzzlesByType('missingLetters', []);
      const all = [...MISSING_LETTERS, ...batched];
      this.currentWordPuzzle = all[Math.floor(Math.random() * all.length)];
      this.wordPuzzleType = 'missing-letters';
    } else {
      const batched = await getWordPuzzlesByType('wordClues', []);
      const all = [...WORD_CLUES, ...batched];
      this.currentWordPuzzle = all[Math.floor(Math.random() * all.length)];
      this.wordPuzzleType = 'word-clue';
    }
  }

  async loadWordSearchAsync() {
    const batched = await getWordPuzzlesByType('wordSearches', []);
    const all = [...WORD_SEARCHES, ...batched];
    this.currentWordPuzzle = all[Math.floor(Math.random() * all.length)];
    this.wordPuzzleType = 'word-search';
    this.wordSearchFound = [];
  }

  renderWordPuzzle() {
    if (!this.currentWordPuzzle) {
      return '<div class="loading"><p>Loading puzzle...</p></div>';
    }

    const p = this.currentWordPuzzle;
    let icon, title, puzzleDisplay;

    if (this.wordPuzzleType === 'anagram') {
      icon = '🔤';
      title = 'Anagram';
      puzzleDisplay = `
        <div class="puzzle-letters">${p.letters}</div>
        <div class="puzzle-hint">Hint: ${p.hint}</div>
      `;
    } else if (this.wordPuzzleType === 'missing-letters') {
      icon = '✍️';
      title = 'Missing Letters';
      puzzleDisplay = `
        <div class="puzzle-missing">${p.puzzle}</div>
        <div class="puzzle-hint">Hint: ${p.hint}</div>
      `;
    } else {
      icon = '💡';
      title = 'Word Clue';
      puzzleDisplay = `
        <div class="puzzle-clue">${p.clue}</div>
        <div class="puzzle-length">${p.length} letters</div>
      `;
    }

    return `
      <div class="word-puzzle-view">
        <button class="back-btn" data-action="back">← Back</button>

        <div class="word-puzzle-header">
          <span class="word-puzzle-icon">${icon}</span>
          <h1 class="word-puzzle-title">${title}</h1>
        </div>

        <div class="word-puzzle-content">
          ${puzzleDisplay}
          <input type="text" class="puzzle-input" id="puzzle-answer" placeholder="Your answer..." autocomplete="off" autocapitalize="characters">
          <br>
          <button class="submit-btn" data-action="check-word-puzzle">Check answer</button>
        </div>
      </div>
    `;
  }

  renderWordSearch() {
    if (!this.currentWordPuzzle) {
      return '<div class="loading"><p>Loading puzzle...</p></div>';
    }

    const ws = this.currentWordPuzzle;
    const allFound = this.wordSearchFound.length === ws.words.length;

    return `
      <div class="word-puzzle-view">
        <button class="back-btn" data-action="back">← Back</button>

        <div class="word-puzzle-header">
          <span class="word-puzzle-icon">🔎</span>
          <h1 class="word-puzzle-title">${ws.title}</h1>
          <p class="word-puzzle-subtitle">Find all the words in the grid</p>
        </div>

        <div class="word-puzzle-content">
          <div class="word-list">
            ${ws.words.map(w => `
              <span class="word-tag ${this.wordSearchFound.includes(w) ? 'found' : ''}">${w}</span>
            `).join('')}
          </div>

          <div class="word-search-grid" style="grid-template-columns: repeat(${ws.grid[0].length}, 1fr);">
            ${ws.grid.map((row, r) =>
              row.map((cell, c) => `
                <div class="ws-cell" data-row="${r}" data-col="${c}">${cell}</div>
              `).join('')
            ).join('')}
          </div>

          <div style="margin-top: var(--space-md);">
            <input type="text" class="puzzle-input" id="ws-guess" placeholder="Type a word you found..." autocomplete="off" autocapitalize="characters">
            <br>
            <button class="submit-btn" data-action="check-word-search">Check word</button>
          </div>

          ${allFound ? `
            <div class="puzzle-result correct" style="margin-top: var(--space-lg);">
              <h2>🎉 All found!</h2>
              <button class="submit-btn" data-action="word-search-again">Another word search</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ==================
  // TETRIS
  // ==================

  renderTetris() {
    // Full screen tetris - back button is in the game itself
    return `
      <div class="tetris-view tetris-fullscreen">
        <canvas id="tetris-canvas"></canvas>
      </div>
    `;
  }

  async initTetris() {
    await new Promise(r => setTimeout(r, 50)); // Wait for canvas to be in DOM
    const canvas = document.getElementById('tetris-canvas');
    if (canvas) {
      // Size canvas to fill the container
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);

      // onBack callback to return to home
      const onBack = async () => {
        if (this.tetrisGame) {
          const score = this.tetrisGame.score;
          if (score > 0) {
            await saveGameScore('tetris', score);
            await logActivity('game', { game: 'tetris', score });
          }
        }
        this.currentView = 'home';
        this.render();
      };

      this.tetrisGame = new TetrisGame(canvas, onBack);
      this.tetrisGame.start();

      // Handle game over tap to restart
      canvas.addEventListener('click', async () => {
        if (this.tetrisGame && this.tetrisGame.gameOver) {
          const score = this.tetrisGame.score;
          await saveGameScore('tetris', score);
          await logActivity('game', { game: 'tetris', score });
          this.tetrisGame.reset();
        }
      });
    }
  }

  // ==================
  // WEEKLY ROUNDUP
  // ==================

  async renderWeekly() {
    const stats = await getWeeklyStats();
    const earnedAchievements = checkAchievements(stats);
    const unlockedBefore = await getUnlockedAchievements();
    const unlockedIds = new Set(unlockedBefore.map(a => a.id));

    // Check for newly earned achievements and unlock them
    for (const achievement of earnedAchievements) {
      if (!unlockedIds.has(achievement.id)) {
        await unlockAchievement(achievement);
        unlockedIds.add(achievement.id);
      }
    }

    // Encouraging message based on activity
    let encouragement = '';
    if (stats.daysActive >= 7) {
      encouragement = '🌟 Incredible! You showed up every single day!';
    } else if (stats.daysActive >= 5) {
      encouragement = '💪 Fantastic week! You are building great habits!';
    } else if (stats.daysActive >= 3) {
      encouragement = '🌸 Lovely progress! Keep nurturing yourself!';
    } else if (stats.totalBreaks > 0) {
      encouragement = '🌱 Every break counts! You are doing great!';
    } else {
      encouragement = '☕ Ready for some self-care? Let us start!';
    }

    return `
      <div class="weekly-view">
        <button class="back-btn" data-action="back">← Back</button>

        <div class="weekly-header">
          <h1>📊 Your Week</h1>
          <p class="weekly-encouragement">${encouragement}</p>
        </div>

        <div class="weekly-stats-grid">
          <div class="stat-card">
            <span class="stat-emoji">🏃‍♀️</span>
            <span class="stat-value">${stats.exercises}</span>
            <span class="stat-label">Exercises</span>
          </div>
          <div class="stat-card">
            <span class="stat-emoji">🧘</span>
            <span class="stat-value">${stats.breaths}</span>
            <span class="stat-label">Breathing</span>
          </div>
          <div class="stat-card">
            <span class="stat-emoji">🧩</span>
            <span class="stat-value">${stats.puzzles}</span>
            <span class="stat-label">Puzzles</span>
          </div>
          <div class="stat-card">
            <span class="stat-emoji">🎓</span>
            <span class="stat-value">${stats.quizzes}</span>
            <span class="stat-label">Quizzes</span>
          </div>
          <div class="stat-card">
            <span class="stat-emoji">🎮</span>
            <span class="stat-value">${stats.games}</span>
            <span class="stat-label">Games</span>
          </div>
          <div class="stat-card">
            <span class="stat-emoji">📅</span>
            <span class="stat-value">${stats.daysActive}/7</span>
            <span class="stat-label">Days Active</span>
          </div>
        </div>

        <div class="achievements-section">
          <h2>🏆 Achievements</h2>
          <div class="achievements-grid">
            ${ACHIEVEMENTS.map(a => {
              const unlocked = unlockedIds.has(a.id);
              return `
                <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                  <span class="achievement-emoji">${unlocked ? a.emoji : '🔒'}</span>
                  <div class="achievement-info">
                    <span class="achievement-name">${a.name}</span>
                    <span class="achievement-desc">${a.desc}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <button class="submit-btn" data-action="back">Back to home</button>
        </div>
      </div>
    `;
  }

  // ==================
  // NEWS READER
  // ==================

  async renderNews() {
    const categories = getCategories();

    // Show loading state initially
    if (this.newsItems.length === 0 && !this.newsLoading) {
      this.newsLoading = true;
      // Fetch will happen after render, triggered by loading state
      setTimeout(() => this.loadNewsCategory(this.newsCategory), 50);
    }

    const categoryTabs = categories.map(cat => `
      <button class="news-tab ${this.newsCategory === cat.id ? 'active' : ''}"
              data-news-category="${cat.id}">
        <span class="news-tab-icon">${cat.icon}</span>
        <span class="news-tab-label">${cat.name}</span>
      </button>
    `).join('');

    let contentHtml = '';

    if (this.newsLoading) {
      contentHtml = `
        <div class="news-loading">
          <div class="news-spinner"></div>
          <p>Loading news...</p>
        </div>
      `;
    } else if (this.newsItems.length === 0) {
      contentHtml = `
        <div class="news-empty">
          <p>📭 No news available right now</p>
          <button class="secondary-btn" data-action="refresh-news">Try again</button>
        </div>
      `;
    } else {
      contentHtml = `
        <div class="news-list">
          ${this.newsItems.map((item, index) => `
            <article class="news-card" data-news-index="${index}">
              ${item.image ? `<div class="news-image" style="background-image: url('${item.image}')"></div>` : ''}
              <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <p class="news-description">${item.description}</p>
                <div class="news-meta">
                  <span class="news-source">${item.source}</span>
                  <span class="news-time">${formatTimeAgo(item.pubDate)}</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="news-view">
        <div class="news-header">
          <button class="back-btn" data-action="back">← Back</button>
          <h1>📰 News</h1>
        </div>

        <div class="news-tabs">
          ${categoryTabs}
        </div>

        <div class="news-content-area">
          ${contentHtml}
        </div>
      </div>
    `;
  }

  async loadNewsCategory(category) {
    this.newsCategory = category;
    this.newsLoading = true;
    this.newsItems = [];
    this.render();

    try {
      this.newsItems = await fetchNews(category);
    } catch (error) {
      console.error('Failed to load news:', error);
      this.newsItems = [];
    }

    this.newsLoading = false;
    this.render();
  }

  renderNewsArticle() {
    const article = this.selectedArticle;
    if (!article) {
      this.currentView = 'news';
      return this.renderNews();
    }

    // Clean up content - remove scripts, styles, etc
    let content = article.content || article.description;
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    // Keep basic formatting tags
    content = content.replace(/<(?!\/?(p|br|strong|em|b|i|h[1-6]|ul|ol|li|a|blockquote)[ >])[^>]+>/gi, '');

    return `
      <div class="news-article-view">
        <div class="news-article-header">
          <button class="back-btn" data-action="back-to-news">← Back</button>
        </div>

        ${article.image ? `
          <div class="news-article-image" style="background-image: url('${article.image}')"></div>
        ` : ''}

        <div class="news-article-content">
          <h1 class="news-article-title">${article.title}</h1>

          <div class="news-article-meta">
            <span class="news-source">${article.source}</span>
            <span class="news-time">${formatTimeAgo(article.pubDate)}</span>
          </div>

          <div class="news-article-body">
            ${content}
          </div>

          <div class="news-article-footer">
            <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-read-more">
              Read full article on ${article.source} →
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // ==================
  // EVENT HANDLERS
  // ==================

  attachEventHandlers() {
    // Category buttons (exercises)
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const category = btn.dataset.category;
        // Try batched exercises + bundled
        const batchedExercises = await getBatchedContent('exercises', []);
        const allExercises = [...EXERCISES, ...batchedExercises];
        const forCategory = allExercises.filter(ex => ex.category === category);

        // Get or create the shown set for this category
        if (!this.shownExercisesThisSession.has(category)) {
          this.shownExercisesThisSession.set(category, new Set());
        }
        const shownIds = this.shownExercisesThisSession.get(category);

        // Filter to exercises not yet shown this session
        let available = forCategory.filter(ex => !shownIds.has(ex.id));

        // If all have been shown, reset the tracking for this category
        if (available.length === 0) {
          shownIds.clear();
          available = forCategory;
        }

        // Pick a random exercise from available pool
        this.currentExercise = available.length > 0
          ? available[Math.floor(Math.random() * available.length)]
          : getRandomExercise(category);

        // Mark this exercise as shown
        if (this.currentExercise) {
          shownIds.add(this.currentExercise.id);
        }

        this.currentView = 'exercise';
        history.pushState({}, '', '');
        this.render();
      });
    });

    // Games menu
    document.querySelectorAll('[data-action="games"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = 'games';
        history.pushState({}, '', '');
        this.render();
      });
    });
    
    // Game selection
    document.querySelectorAll('.game-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const game = btn.dataset.game;
        this.currentView = game;
        history.pushState({}, '', '');
        this.render();
      });
    });

    // Scroll content
    document.querySelectorAll('[data-action="scroll"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = 'scroll';
        history.pushState({}, '', '');
        this.render();
      });
    });

    // News
    document.querySelectorAll('[data-action="news"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.newsItems = [];
        this.newsLoading = false;
        this.selectedArticle = null;
        this.currentView = 'news';
        history.pushState({}, '', '');
        this.render();
      });
    });

    // News category tabs
    document.querySelectorAll('.news-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.newsCategory;
        if (category !== this.newsCategory) {
          this.loadNewsCategory(category);
        }
      });
    });

    // News card click (open article)
    document.querySelectorAll('.news-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.newsIndex);
        this.selectedArticle = this.newsItems[index];
        this.currentView = 'news-article';
        history.pushState({}, '', '');
        this.render();
      });
    });

    // Back to news list from article
    document.querySelectorAll('[data-action="back-to-news"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedArticle = null;
        this.currentView = 'news';
        this.render();
      });
    });

    // Refresh news
    document.querySelectorAll('[data-action="refresh-news"]').forEach(btn => {
      btn.addEventListener('click', () => {
        clearNewsCache(this.newsCategory);
        this.loadNewsCategory(this.newsCategory);
      });
    });

    // Weekly roundup
    document.querySelectorAll('[data-action="weekly"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = 'weekly';
        history.pushState({}, '', '');
        this.render();
      });
    });

    // Home button
    document.querySelectorAll('[data-action="home"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.stopTetris();
        this.currentView = 'home';
        this.resetGameState();
        this.render();
      });
    });

    // Back button (context-aware)
    document.querySelectorAll('[data-action="back"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.stopTetris();
        // Go back to games menu from game, or home from games menu
        if (['mystery', 'crossword', 'quiz', 'tetris', 'anagram', 'missing-letters', 'word-clue', 'word-search'].includes(this.currentView)) {
          this.currentView = 'games';
        } else {
          this.currentView = 'home';
        }
        this.resetGameState();
        this.render();
      });
    });

    // Done button (exercises)
    document.querySelectorAll('[data-action="done"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const type = this.currentExercise.category === 'breathe' ? 'breathe' : 'exercise';
        await logActivity(type, {
          exerciseId: this.currentExercise.id,
          exerciseName: this.currentExercise.name
        });
        
        this.currentView = 'home';
        this.currentExercise = null;
        this.render();
      });
    });
    
    // Mystery puzzle answers
    document.querySelectorAll('.mystery-select .option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const field = btn.closest('.option-buttons').dataset.field;
        const value = btn.dataset.value;
        
        if (!this.mysteryAnswer) this.mysteryAnswer = {};
        this.mysteryAnswer[field] = value;
        
        // Update UI
        btn.closest('.option-buttons').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        // Enable submit if all selected
        const submitBtn = document.querySelector('[data-action="check-mystery"]');
        if (this.mysteryAnswer.who && this.mysteryAnswer.where && this.mysteryAnswer.evidence) {
          submitBtn.removeAttribute('disabled');
        }
      });
    });
    
    // Check mystery answer
    document.querySelectorAll('[data-action="check-mystery"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const correct = checkMysteryAnswer(this.currentMystery, this.mysteryAnswer);

        if (correct) {
          playCelebrationSound();
          await savePuzzleProgress(this.currentMystery.id, {
            type: 'mystery',
            puzzleId: this.currentMystery.id,
            completed: true,
            completedAt: Date.now()
          });
          await logActivity('puzzle', { type: 'mystery', puzzleId: this.currentMystery.id });
        } else {
          playWrongSound();
        }

        // Show result with animated icons
        const resultHtml = `
          <div class="mystery-result ${correct ? 'correct' : 'wrong'} ${!correct ? 'wrong-shake' : ''}">
            <h2>
              <span class="${correct ? 'correct-tick-icon' : 'wrong-x-icon'}">${correct ? '✓' : '✗'}</span>
              ${correct ? 'Solved!' : 'Not quite...'}
            </h2>
            <p>${correct ? '' : `The answer was: ${this.currentMystery.solution.who} in the ${this.currentMystery.solution.where} - ${this.currentMystery.solution.evidence}`}</p>
            <p class="mystery-explanation">${this.currentMystery.explanation}</p>
            <button class="submit-btn" data-action="mystery-again">Another mystery</button>
            <button class="secondary-btn" data-action="back" style="margin-top: 1rem; display: block; width: 100%;">Back to games</button>
          </div>
        `;

        document.querySelector('.mystery-answer').innerHTML = resultHtml;
        this.attachEventHandlers();
      });
    });
    
    // New mystery
    document.querySelectorAll('[data-action="mystery-again"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        this.currentMystery = null;
        this.mysteryAnswer = null;
        this.render();
      });
    });
    
    // Crossword input
    document.querySelectorAll('.cell-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        const value = e.target.value.toUpperCase();
        e.target.value = value;
        this.crosswordAnswers[`${row}-${col}`] = value;
        
        // Auto-advance to next cell
        if (value) {
          const inputs = Array.from(document.querySelectorAll('.cell-input'));
          const currentIdx = inputs.indexOf(e.target);
          if (currentIdx < inputs.length - 1) {
            inputs[currentIdx + 1].focus();
          }
        }
      });
    });
    
    // Check crossword
    document.querySelectorAll('[data-action="check-crossword"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const c = this.currentCrossword;
        let allCorrect = true;
        
        // Check each cell
        document.querySelectorAll('.cell-input').forEach(input => {
          const row = parseInt(input.dataset.row);
          const col = parseInt(input.dataset.col);
          const expected = c.grid[row][col];
          const actual = input.value.toUpperCase();
          
          if (actual === expected) {
            input.style.background = '#a8d5a2';
          } else {
            input.style.background = '#f0a8a8';
            allCorrect = false;
          }
        });
        
        if (allCorrect) {
          playCelebrationSound();
          await savePuzzleProgress(this.currentCrossword.id, {
            type: 'crossword',
            puzzleId: this.currentCrossword.id,
            completed: true,
            completedAt: Date.now()
          });
          await logActivity('puzzle', { type: 'crossword', puzzleId: this.currentCrossword.id });
          
          // Show completion message
          btn.outerHTML = `
            <div class="crossword-complete" style="text-align: center; margin-top: 1rem;">
              <p style="font-size: 1.2rem; color: var(--accent);">🎉 Complete!</p>
              <button class="submit-btn" data-action="crossword-again">Another crossword</button>
            </div>
          `;
          this.attachEventHandlers();
        }
      });
    });
    
    // Reveal crossword answers
    document.querySelectorAll('[data-action="reveal-crossword"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const c = this.currentCrossword;

        // Fill in all cells with correct answers
        document.querySelectorAll('.cell-input').forEach(input => {
          const row = parseInt(input.dataset.row);
          const col = parseInt(input.dataset.col);
          const answer = c.grid[row][col];
          input.value = answer;
          input.style.background = '#d4e6f7'; // Light blue to show revealed
          input.disabled = true;
        });

        // Replace buttons with completion message (but don't log as user-completed)
        btn.parentElement.innerHTML = `
          <div class="crossword-complete" style="text-align: center;">
            <p style="font-size: 1.1rem; color: var(--text-secondary);">Answers revealed</p>
            <button class="submit-btn" data-action="crossword-again" style="margin-top: 0.5rem;">Try another crossword</button>
          </div>
        `;
        this.attachEventHandlers();
      });
    });

    // New crossword
    document.querySelectorAll('[data-action="crossword-again"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentCrossword = null;
        this.crosswordAnswers = {};
        this.render();
      });
    });
    
    // Quiz answers
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', async () => {
        const answer = btn.dataset.answer;
        const q = this.currentQuiz[this.quizIndex];
        const correct = answer === q.answer;

        if (correct) {
          this.quizScore++;
          playCelebrationSound();
        } else {
          playWrongSound();
        }
        this.quizAnswers.push({ questionId: q.id, answer, correct });

        // Show feedback with animated icon
        const questionDiv = document.querySelector('.quiz-question');
        questionDiv.innerHTML = `
          <div class="quiz-feedback ${correct ? 'correct' : 'wrong'} ${!correct ? 'wrong-shake' : ''}" style="text-align: center; padding: 1rem;">
            <p class="feedback-result" style="font-size: 1.5rem; margin-bottom: 0.5rem;">
              <span class="${correct ? 'correct-tick-icon' : 'wrong-x-icon'}">${correct ? '✓' : '✗'}</span>
              ${correct ? 'Correct!' : 'Not quite!'}
            </p>
            ${!correct ? `<p style="margin-bottom: 0.5rem;">The answer was: <strong>${q.answer}</strong></p>` : ''}
            <p class="feedback-fact" style="font-style: italic; color: var(--text-soft); margin-bottom: 1rem;">${q.fact}</p>
            <button class="submit-btn" data-action="quiz-next">Next question</button>
          </div>
        `;
        this.attachEventHandlers();
      });
    });
    
    // Next quiz question
    document.querySelectorAll('[data-action="quiz-next"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.quizIndex++;
        // Play celebration sound when quiz is complete
        if (this.quizIndex >= this.currentQuiz.length) {
          playCelebrationSound();
        }
        this.render();
      });
    });
    
    // Quiz again
    document.querySelectorAll('[data-action="quiz-again"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        await saveQuizScore('britpop', this.quizScore, this.currentQuiz.length);
        await logActivity('quiz', { type: 'britpop', score: this.quizScore, total: this.currentQuiz.length });
        this.currentQuiz = null;
        await this.loadQuizAsync();
        this.render();
      });
    });

    // Word puzzle check
    document.querySelectorAll('[data-action="check-word-puzzle"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const input = document.getElementById('puzzle-answer');
        if (!input || !input.value.trim()) return;

        const answer = input.value.trim();
        const p = this.currentWordPuzzle;
        let correct = false;

        if (this.wordPuzzleType === 'anagram') {
          correct = checkAnagramAnswer(p, answer);
        } else if (this.wordPuzzleType === 'missing-letters') {
          correct = checkMissingLettersAnswer(p, answer);
        } else {
          correct = checkWordClueAnswer(p, answer);
        }

        if (correct) {
          playCelebrationSound();
          await logActivity('puzzle', { type: this.wordPuzzleType });
        } else {
          playWrongSound();
        }

        const contentDiv = document.querySelector('.word-puzzle-content');
        contentDiv.innerHTML = `
          <div class="puzzle-result ${correct ? 'correct' : 'wrong'} ${!correct ? 'wrong-shake' : ''}">
            <h2>
              <span class="${correct ? 'correct-tick-icon' : 'wrong-x-icon'}">${correct ? '✓' : '✗'}</span>
              ${correct ? 'Correct!' : 'Not quite'}
            </h2>
            <p>${correct ? 'Well done!' : `The answer was: <strong>${p.answer}</strong>`}</p>
            <div class="puzzle-actions">
              <button class="submit-btn" data-action="word-puzzle-again">Another one</button>
              <button class="secondary-btn" data-action="back" style="display: block; width: 100%;">Back to games</button>
            </div>
          </div>
        `;
        this.attachEventHandlers();
      });
    });

    // Word puzzle again
    document.querySelectorAll('[data-action="word-puzzle-again"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        this.currentWordPuzzle = null;
        await this.loadWordPuzzleAsync();
        this.render();
      });
    });

    // Word puzzle enter key
    const puzzleInput = document.getElementById('puzzle-answer');
    if (puzzleInput) {
      puzzleInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          document.querySelector('[data-action="check-word-puzzle"]')?.click();
        }
      });
    }

    // Word search check
    document.querySelectorAll('[data-action="check-word-search"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById('ws-guess');
        if (!input || !input.value.trim()) return;

        const guess = input.value.trim().toUpperCase();
        const ws = this.currentWordPuzzle;

        if (ws.words.includes(guess) && !this.wordSearchFound.includes(guess)) {
          this.wordSearchFound.push(guess);
          input.value = '';
          this.render();

          if (this.wordSearchFound.length === ws.words.length) {
            playCelebrationSound();
            logActivity('puzzle', { type: 'word-search', puzzleId: ws.id });
          }
        } else {
          input.value = '';
          input.placeholder = ws.words.includes(guess) ? 'Already found!' : 'Not in the list...';
          setTimeout(() => { input.placeholder = 'Type a word you found...'; }, 1500);
        }
      });
    });

    // Word search enter key
    const wsInput = document.getElementById('ws-guess');
    if (wsInput) {
      wsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          document.querySelector('[data-action="check-word-search"]')?.click();
        }
      });
    }

    // Word search again
    document.querySelectorAll('[data-action="word-search-again"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        this.currentWordPuzzle = null;
        await this.loadWordSearchAsync();
        this.render();
      });
    });
  }
}

// Start the app
const app = new CarerCalmApp();
app.init();
