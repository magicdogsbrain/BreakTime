/**
 * Enhanced Tetris - Full Screen Edition
 *
 * Features:
 * - Full screen gameplay with in-game back button
 * - Next piece preview
 * - Level-up fanfare with sparkles
 * - High score persistence
 * - Dark neon aesthetic
 * - Sound effects and music
 */

// Sound effects using Web Audio API
class TetrisSounds {
  constructor() {
    this.ctx = null;
    this.musicOsc = null;
    this.musicGain = null;
    this.musicPlaying = false;
    this.enabled = true;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  }

  playMove() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.type = 'square';
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playRotate() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.08);
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playDrop() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);
    osc.type = 'triangle';
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playLock() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.type = 'square';
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playClear(lines) {
    if (!this.enabled || !this.ctx) return;
    const baseFreq = lines === 4 ? 400 : 300;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(baseFreq + i * 100, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.3);
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.start(this.ctx.currentTime + i * 0.02);
      osc.stop(this.ctx.currentTime + 0.3);
    }
    if (lines === 4) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.2);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    }
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    // Fanfare - ascending arpeggio with cheer
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.1 + 0.3);
      osc.start(this.ctx.currentTime + i * 0.1);
      osc.stop(this.ctx.currentTime + i * 0.1 + 0.3);
    });

    // Add a triumphant chord at the end
    setTimeout(() => {
      if (!this.ctx) return;
      const chordNotes = [523.25, 659.25, 783.99];
      chordNotes.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      });
    }, 400);

    // Cheer sound - noise burst
    setTimeout(() => {
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.1;
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    }, 500);
  }

  playGameOver() {
    if (!this.enabled || !this.ctx) return;
    const notes = [400, 350, 300, 250];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.15);
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.15 + 0.2);
      osc.start(this.ctx.currentTime + i * 0.15);
      osc.stop(this.ctx.currentTime + i * 0.15 + 0.2);
    });
  }

  startMusic() {
    if (!this.enabled || !this.ctx || this.musicPlaying) return;
    this.musicPlaying = true;
    this.playMusicLoop();
  }

  playMusicLoop() {
    if (!this.musicPlaying || !this.ctx) return;
    const bassNotes = [130.81, 98.00, 110.00, 98.00];
    const beatDuration = 0.4;
    bassNotes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * beatDuration);
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime + i * beatDuration);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * beatDuration + beatDuration * 0.8);
      osc.start(this.ctx.currentTime + i * beatDuration);
      osc.stop(this.ctx.currentTime + i * beatDuration + beatDuration);
    });
    setTimeout(() => this.playMusicLoop(), bassNotes.length * beatDuration * 1000);
  }

  stopMusic() {
    this.musicPlaying = false;
  }

  stop() {
    this.stopMusic();
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close().catch(() => {});
    }
  }
}

// High score persistence
const HIGHSCORE_KEY = 'breaktime_tetris_highscore';

function getHighScore() {
  try {
    return parseInt(localStorage.getItem(HIGHSCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function setHighScore(score) {
  try {
    localStorage.setItem(HIGHSCORE_KEY, score.toString());
  } catch {
    // ignore
  }
}

export class TetrisGame {
  constructor(canvas, onBack) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onBack = onBack; // Callback to exit game

    // Game dimensions - FULL SCREEN
    this.cols = 10;
    this.rows = 20;

    // Calculate maximum block size to fill screen
    // Reserve space for: back button (50px top), next preview (right side), controls hint (bottom 30px)
    const availableHeight = canvas.height - 80; // Top bar + bottom hint
    const availableWidth = canvas.width - 100; // Space for next piece preview on right

    this.blockSize = Math.floor(Math.min(
      availableWidth / this.cols,
      availableHeight / this.rows
    ));

    // Center the grid (shifted left to make room for next piece)
    const gridWidth = this.cols * this.blockSize;
    const gridHeight = this.rows * this.blockSize;
    this.offsetX = Math.floor((canvas.width - gridWidth - 80) / 2);
    this.offsetY = Math.floor((canvas.height - gridHeight - 30) / 2) + 40;

    // Next piece preview position (top right)
    this.nextPreviewX = this.offsetX + gridWidth + 15;
    this.nextPreviewY = this.offsetY;

    // Game state
    this.grid = this.createGrid();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.paused = false;
    this.highScore = getHighScore();

    // Current and next piece
    this.currentPiece = null;
    this.nextPiece = null;
    this.currentX = 0;
    this.currentY = 0;

    // Timing
    this.dropInterval = 1000;
    this.lastDrop = 0;

    // Animation state
    this.clearingLines = [];
    this.clearAnimationProgress = 0;
    this.particles = [];
    this.fallingBlocks = [];

    // Level up celebration
    this.levelUpCelebration = false;
    this.levelUpProgress = 0;
    this.levelSparkles = [];

    // Back button area
    this.backButtonArea = { x: 10, y: 10, width: 70, height: 35 };

    // Dark neon colour palette
    this.colors = {
      I: '#00f5ff',
      O: '#ffee00',
      T: '#ff00ff',
      S: '#00ff66',
      Z: '#ff3366',
      J: '#3366ff',
      L: '#ff9933',
      ghost: 'rgba(255, 255, 255, 0.15)',
      grid: '#1a1a2e',
      gridLine: '#2a2a4e',
      background: '#0d0d1a',
      text: '#ffffff',
      glow: '#ff6b9d'
    };

    // Piece definitions
    this.pieces = {
      I: [[1,1,1,1]],
      O: [[1,1],[1,1]],
      T: [[0,1,0],[1,1,1]],
      S: [[0,1,1],[1,1,0]],
      Z: [[1,1,0],[0,1,1]],
      J: [[1,0,0],[1,1,1]],
      L: [[0,0,1],[1,1,1]]
    };

    // Bag of pieces (7-bag randomiser)
    this.bag = [];

    // Sound
    this.sounds = new TetrisSounds();

    // Touch controls
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.setupTouchControls();
  }

  createGrid() {
    return Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
  }

  isInBackButton(x, y) {
    const b = this.backButtonArea;
    return x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height;
  }

  setupTouchControls() {
    let touchStartTime = 0;

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();

      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);

      // Check if tapping back button
      if (this.isInBackButton(x, y)) {
        if (this.onBack) {
          this.stop();
          this.onBack();
        }
        return;
      }

      // Init audio on first touch
      if (!this.sounds.ctx) {
        this.sounds.init();
        this.sounds.startMusic();
      }

      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      touchStartTime = Date.now();
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();

      // If game over, tap to restart
      if (this.gameOver) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);

        // Don't restart if tapping back button
        if (!this.isInBackButton(x, y)) {
          this.reset();
        }
        return;
      }

      const touch = e.changedTouches[0];
      const dx = touch.clientX - this.touchStartX;
      const dy = touch.clientY - this.touchStartY;
      const dt = Date.now() - touchStartTime;

      // Tap to rotate
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30 && dt < 200) {
        this.rotate();
        return;
      }

      // Swipe left/right to move
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) {
          this.move(1);
        } else if (dx < -30) {
          this.move(-1);
        }
      }

      // Swipe down to drop
      if (dy > 50) {
        this.hardDrop();
      }
    }, { passive: false });

    // Keyboard controls
    this.keyHandler = (e) => {
      if (this.gameOver || this.paused) return;

      if (!this.sounds.ctx) {
        this.sounds.init();
        this.sounds.startMusic();
      }

      switch(e.key) {
        case 'ArrowLeft':
          this.move(-1);
          break;
        case 'ArrowRight':
          this.move(1);
          break;
        case 'ArrowDown':
          this.softDrop();
          break;
        case 'ArrowUp':
        case ' ':
          this.rotate();
          break;
        case 'Enter':
          this.hardDrop();
          break;
        case 'Escape':
          if (this.onBack) {
            this.stop();
            this.onBack();
          }
          break;
      }
    };
    document.addEventListener('keydown', this.keyHandler);
  }

  getRandomPiece() {
    if (this.bag.length === 0) {
      this.bag = Object.keys(this.pieces).sort(() => Math.random() - 0.5);
    }
    return this.bag.pop();
  }

  spawnPiece() {
    // Use next piece if available, otherwise get new one
    if (this.nextPiece) {
      this.currentPiece = this.nextPiece;
    } else {
      const type = this.getRandomPiece();
      this.currentPiece = {
        type,
        shape: this.pieces[type].map(row => [...row])
      };
    }

    // Always prepare next piece
    const nextType = this.getRandomPiece();
    this.nextPiece = {
      type: nextType,
      shape: this.pieces[nextType].map(row => [...row])
    };

    this.currentX = Math.floor((this.cols - this.currentPiece.shape[0].length) / 2);
    this.currentY = 0;

    if (this.collision(this.currentX, this.currentY, this.currentPiece.shape)) {
      this.gameOver = true;
      // Check for new high score
      if (this.score > this.highScore) {
        this.highScore = this.score;
        setHighScore(this.score);
      }
      this.sounds.playGameOver();
      this.sounds.stopMusic();
    }
  }

  collision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = x + col;
          const newY = y + row;

          if (newX < 0 || newX >= this.cols || newY >= this.rows) {
            return true;
          }

          if (newY >= 0 && this.grid[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  move(dir) {
    if (!this.currentPiece || this.clearingLines.length > 0) return;

    const newX = this.currentX + dir;
    if (!this.collision(newX, this.currentY, this.currentPiece.shape)) {
      this.currentX = newX;
      this.sounds.playMove();
    }
  }

  rotate() {
    if (!this.currentPiece || this.clearingLines.length > 0) return;

    const rotated = this.currentPiece.shape[0].map((_, i) =>
      this.currentPiece.shape.map(row => row[i]).reverse()
    );

    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      if (!this.collision(this.currentX + kick, this.currentY, rotated)) {
        this.currentPiece.shape = rotated;
        this.currentX += kick;
        this.sounds.playRotate();
        return;
      }
    }
  }

  softDrop() {
    if (!this.currentPiece || this.clearingLines.length > 0) return;

    if (!this.collision(this.currentX, this.currentY + 1, this.currentPiece.shape)) {
      this.currentY++;
      this.score += 1;
      this.sounds.playMove();
    }
  }

  hardDrop() {
    if (!this.currentPiece || this.clearingLines.length > 0) return;

    let dropDistance = 0;
    while (!this.collision(this.currentX, this.currentY + 1, this.currentPiece.shape)) {
      this.currentY++;
      dropDistance++;
    }
    this.score += dropDistance * 2;
    this.sounds.playDrop();
    this.lockPiece();
  }

  getGhostY() {
    if (!this.currentPiece) return this.currentY;

    let ghostY = this.currentY;
    while (!this.collision(this.currentX, ghostY + 1, this.currentPiece.shape)) {
      ghostY++;
    }
    return ghostY;
  }

  lockPiece() {
    if (!this.currentPiece) return;

    this.sounds.playLock();

    for (let row = 0; row < this.currentPiece.shape.length; row++) {
      for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
        if (this.currentPiece.shape[row][col]) {
          const gridY = this.currentY + row;
          const gridX = this.currentX + col;
          if (gridY >= 0) {
            this.grid[gridY][gridX] = this.currentPiece.type;
          }
        }
      }
    }

    this.checkLines();
  }

  checkLines() {
    this.clearingLines = [];
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row].every(cell => cell !== null)) {
        this.clearingLines.push(row);
      }
    }

    if (this.clearingLines.length > 0) {
      this.clearAnimationProgress = 0;
      this.sounds.playClear(this.clearingLines.length);

      // Create explosion particles
      this.clearingLines.forEach(row => {
        for (let col = 0; col < this.cols; col++) {
          const color = this.colors[this.grid[row][col]];
          for (let i = 0; i < 5; i++) {
            this.particles.push({
              x: this.offsetX + col * this.blockSize + this.blockSize / 2,
              y: this.offsetY + row * this.blockSize + this.blockSize / 2,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8 - 2,
              color: color,
              life: 1,
              size: Math.random() * 6 + 2
            });
          }
        }
      });
    } else {
      this.spawnPiece();
    }
  }

  clearLines() {
    const linesCleared = this.clearingLines.length;
    const oldLevel = this.level;

    // Store blocks that need to fall
    this.fallingBlocks = [];
    const lowestClearedRow = Math.max(...this.clearingLines);

    for (let row = lowestClearedRow - 1; row >= 0; row--) {
      if (!this.clearingLines.includes(row)) {
        for (let col = 0; col < this.cols; col++) {
          if (this.grid[row][col]) {
            const fallDistance = this.clearingLines.filter(r => r > row).length;
            if (fallDistance > 0) {
              this.fallingBlocks.push({
                col,
                fromRow: row,
                toRow: row + fallDistance,
                type: this.grid[row][col],
                progress: 0
              });
            }
          }
        }
      }
    }

    // Remove cleared lines
    this.clearingLines.sort((a, b) => b - a).forEach(row => {
      this.grid.splice(row, 1);
      this.grid.unshift(Array(this.cols).fill(null));
    });

    this.lines += linesCleared;
    const lineScores = [0, 100, 300, 500, 800];
    this.score += lineScores[linesCleared] * this.level;
    this.level = Math.floor(this.lines / 10) + 1;
    this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);

    // Check for level up!
    if (this.level > oldLevel) {
      this.triggerLevelUpCelebration();
    }

    this.clearingLines = [];

    if (this.fallingBlocks.length === 0) {
      this.spawnPiece();
    }
  }

  triggerLevelUpCelebration() {
    this.levelUpCelebration = true;
    this.levelUpProgress = 0;
    this.sounds.playLevelUp();

    // Create sparkles around the level display
    const centerX = this.canvas.width - 50;
    const centerY = 25;
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      this.levelSparkles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * (3 + Math.random() * 3),
        vy: Math.sin(angle) * (3 + Math.random() * 3),
        life: 1,
        size: Math.random() * 4 + 2,
        color: ['#ffee00', '#ff00ff', '#00f5ff', '#00ff66', '#ff6b9d'][Math.floor(Math.random() * 5)]
      });
    }
  }

  update(timestamp) {
    if (this.gameOver || this.paused) return;

    // Update particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.life -= 0.02;
      return p.life > 0;
    });

    // Update level sparkles
    this.levelSparkles = this.levelSparkles.filter(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.1;
      s.life -= 0.02;
      return s.life > 0;
    });

    // Update level up celebration
    if (this.levelUpCelebration) {
      this.levelUpProgress += 0.02;
      if (this.levelUpProgress >= 1) {
        this.levelUpCelebration = false;
      }
    }

    // Update falling blocks animation
    if (this.fallingBlocks.length > 0) {
      let allDone = true;
      this.fallingBlocks.forEach(block => {
        block.progress += 0.1;
        if (block.progress < 1) allDone = false;
      });
      if (allDone) {
        this.fallingBlocks = [];
        this.spawnPiece();
      }
      return;
    }

    // Update line clear animation
    if (this.clearingLines.length > 0) {
      this.clearAnimationProgress += 0.05;
      if (this.clearAnimationProgress >= 1) {
        this.clearLines();
      }
      return;
    }

    if (!this.currentPiece) {
      this.spawnPiece();
    }

    // Auto drop
    if (timestamp - this.lastDrop > this.dropInterval) {
      if (!this.collision(this.currentX, this.currentY + 1, this.currentPiece.shape)) {
        this.currentY++;
      } else {
        this.lockPiece();
      }
      this.lastDrop = timestamp;
    }
  }

  draw() {
    const ctx = this.ctx;

    // Dark background - full canvas
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw back button
    this.drawBackButton();

    // Grid background with subtle glow
    ctx.fillStyle = this.colors.grid;
    ctx.shadowColor = this.colors.glow;
    ctx.shadowBlur = 20;
    ctx.fillRect(
      this.offsetX - 2,
      this.offsetY - 2,
      this.cols * this.blockSize + 4,
      this.rows * this.blockSize + 4
    );
    ctx.shadowBlur = 0;

    // Grid lines
    ctx.strokeStyle = this.colors.gridLine;
    ctx.lineWidth = 1;
    for (let x = 0; x <= this.cols; x++) {
      ctx.beginPath();
      ctx.moveTo(this.offsetX + x * this.blockSize, this.offsetY);
      ctx.lineTo(this.offsetX + x * this.blockSize, this.offsetY + this.rows * this.blockSize);
      ctx.stroke();
    }
    for (let y = 0; y <= this.rows; y++) {
      ctx.beginPath();
      ctx.moveTo(this.offsetX, this.offsetY + y * this.blockSize);
      ctx.lineTo(this.offsetX + this.cols * this.blockSize, this.offsetY + y * this.blockSize);
      ctx.stroke();
    }

    // Draw placed blocks
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col]) {
          if (this.clearingLines.includes(row)) {
            const flash = Math.sin(this.clearAnimationProgress * Math.PI * 4) > 0;
            if (flash) {
              this.drawBlock(col, row, '#ffffff', true);
            } else {
              this.drawBlock(col, row, this.colors[this.grid[row][col]], true);
            }
          } else {
            this.drawBlock(col, row, this.colors[this.grid[row][col]], true);
          }
        }
      }
    }

    // Draw falling blocks animation
    this.fallingBlocks.forEach(block => {
      const currentRow = block.fromRow + (block.toRow - block.fromRow) * this.easeOutBounce(block.progress);
      this.drawBlockAt(block.col, currentRow, this.colors[block.type], true);
    });

    // Draw ghost piece
    if (this.currentPiece && this.clearingLines.length === 0) {
      const ghostY = this.getGhostY();
      for (let row = 0; row < this.currentPiece.shape.length; row++) {
        for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
          if (this.currentPiece.shape[row][col]) {
            this.drawBlock(this.currentX + col, ghostY + row, this.colors.ghost, false);
          }
        }
      }
    }

    // Draw current piece
    if (this.currentPiece && this.clearingLines.length === 0) {
      for (let row = 0; row < this.currentPiece.shape.length; row++) {
        for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
          if (this.currentPiece.shape[row][col]) {
            this.drawBlock(
              this.currentX + col,
              this.currentY + row,
              this.colors[this.currentPiece.type],
              true
            );
          }
        }
      }
    }

    // Draw next piece preview
    this.drawNextPiecePreview();

    // Draw particles
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;

    // Draw level sparkles
    this.levelSparkles.forEach(s => {
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.life;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;

    // Draw score
    ctx.fillStyle = this.colors.text;
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${this.score}`, this.offsetX, this.offsetY - 15);

    // Draw high score
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`BEST: ${this.highScore}`, this.offsetX, this.offsetY - 35);

    // Draw level with celebration effect
    ctx.textAlign = 'right';
    if (this.levelUpCelebration) {
      // Pulsing, sparkling level text
      const pulse = 1 + Math.sin(this.levelUpProgress * Math.PI * 6) * 0.3;
      const hue = (this.levelUpProgress * 360) % 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.shadowBlur = 20;
      ctx.font = `bold ${Math.floor(20 * pulse)}px -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.fillText(`LEVEL ${this.level}!`, this.canvas.width - 15, 30);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = this.colors.text;
      ctx.shadowColor = this.colors.glow;
      ctx.shadowBlur = 10;
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`LVL ${this.level}`, this.canvas.width - 15, 30);
      ctx.shadowBlur = 0;
    }

    // Draw lines count
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(`LINES: ${this.lines}`, this.canvas.width / 2, 30);

    // Game over overlay
    if (this.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.fillStyle = this.colors.glow;
      ctx.shadowColor = this.colors.glow;
      ctx.shadowBlur = 20;
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 60);

      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 - 10);

      // Show if new high score
      if (this.score >= this.highScore && this.score > 0) {
        ctx.fillStyle = '#ffee00';
        ctx.shadowColor = '#ffee00';
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('NEW HIGH SCORE!', this.canvas.width / 2, this.canvas.height / 2 + 25);
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText(`Best: ${this.highScore}`, this.canvas.width / 2, this.canvas.height / 2 + 25);
      }

      ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText('Tap to play again', this.canvas.width / 2, this.canvas.height / 2 + 65);
      ctx.shadowBlur = 0;

      // Still show back button in game over
      this.drawBackButton();
    }

    // Controls hint
    if (!this.gameOver) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tap: rotate | Swipe: move | Swipe down: drop',
        this.canvas.width / 2,
        this.canvas.height - 8
      );
    }
  }

  drawBackButton() {
    const ctx = this.ctx;
    const b = this.backButtonArea;

    // Button background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.width, b.height, 8);
    ctx.fill();
    ctx.stroke();

    // Arrow and text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('← Back', b.x + b.width / 2, b.y + b.height / 2);
    ctx.textBaseline = 'alphabetic';
  }

  drawNextPiecePreview() {
    if (!this.nextPiece) return;

    const ctx = this.ctx;
    const previewBlockSize = Math.floor(this.blockSize * 0.7);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('NEXT', this.nextPreviewX, this.nextPreviewY - 8);

    // Preview box background
    const boxWidth = previewBlockSize * 4 + 10;
    const boxHeight = previewBlockSize * 4 + 10;
    ctx.fillStyle = 'rgba(26, 26, 46, 0.8)';
    ctx.strokeStyle = this.colors.gridLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(this.nextPreviewX, this.nextPreviewY, boxWidth, boxHeight, 5);
    ctx.fill();
    ctx.stroke();

    // Draw next piece centered in preview box
    const shape = this.nextPiece.shape;
    const pieceWidth = shape[0].length * previewBlockSize;
    const pieceHeight = shape.length * previewBlockSize;
    const startX = this.nextPreviewX + (boxWidth - pieceWidth) / 2;
    const startY = this.nextPreviewY + (boxHeight - pieceHeight) / 2;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const px = startX + col * previewBlockSize;
          const py = startY + row * previewBlockSize;
          const size = previewBlockSize - 2;
          const color = this.colors[this.nextPiece.type];

          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.fillStyle = color;
          ctx.fillRect(px + 1, py + 1, size, size);
          ctx.shadowBlur = 0;

          // Highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(px + 1, py + 1, size, 2);
          ctx.fillRect(px + 1, py + 1, 2, size);

          // Shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(px + 1, py + size - 1, size, 2);
          ctx.fillRect(px + size - 1, py + 1, 2, size);
        }
      }
    }
  }

  easeOutBounce(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  }

  drawBlock(x, y, color, glow) {
    this.drawBlockAt(x, y, color, glow);
  }

  drawBlockAt(x, y, color, glow) {
    const ctx = this.ctx;
    const px = this.offsetX + x * this.blockSize;
    const py = this.offsetY + y * this.blockSize;
    const size = this.blockSize - 2;

    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
    }

    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 1, size, size);

    ctx.shadowBlur = 0;

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(px + 1, py + 1, size, 3);
    ctx.fillRect(px + 1, py + 1, 3, size);

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(px + 1, py + size - 2, size, 3);
    ctx.fillRect(px + size - 2, py + 1, 3, size);
  }

  reset() {
    this.grid = this.createGrid();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.currentPiece = null;
    this.nextPiece = null;
    this.dropInterval = 1000;
    this.bag = [];
    this.clearingLines = [];
    this.particles = [];
    this.fallingBlocks = [];
    this.levelUpCelebration = false;
    this.levelSparkles = [];
    this.highScore = getHighScore(); // Refresh high score
    if (this.sounds.ctx) {
      this.sounds.startMusic();
    }
  }

  start() {
    const gameLoop = (timestamp) => {
      this.update(timestamp);
      this.draw();
      this.animationFrame = requestAnimationFrame(gameLoop);
    };
    this.animationFrame = requestAnimationFrame(gameLoop);
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.sounds.stop();
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}
