/**
 * Simple Tetris
 * 
 * Classic falling blocks game
 * Touch-friendly, relaxing, zone-out gameplay
 */

export class TetrisGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Game dimensions
    this.cols = 10;
    this.rows = 20;
    this.blockSize = Math.floor(Math.min(
      (canvas.width - 20) / this.cols,
      (canvas.height - 100) / this.rows
    ));
    
    // Center the grid
    this.offsetX = Math.floor((canvas.width - this.cols * this.blockSize) / 2);
    this.offsetY = 40;
    
    // Game state
    this.grid = this.createGrid();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.paused = false;
    
    // Current piece
    this.currentPiece = null;
    this.currentX = 0;
    this.currentY = 0;
    
    // Timing
    this.dropInterval = 1000;
    this.lastDrop = 0;
    
    // Colours - soft, calm palette
    this.colors = {
      I: '#7ecec4', // Teal
      O: '#f5d77e', // Yellow
      T: '#c4a7e7', // Lavender
      S: '#a8d5a2', // Sage
      Z: '#f0a8a8', // Soft coral
      J: '#a8c5f0', // Soft blue
      L: '#f5c89a', // Peach
      ghost: 'rgba(150, 150, 150, 0.3)',
      grid: '#e5e5e0',
      gridLine: '#d4d4cf',
      background: '#f5f5f0',
      text: '#3d3d3d'
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
    
    // Touch controls
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.setupTouchControls();
  }
  
  createGrid() {
    return Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
  }
  
  setupTouchControls() {
    let touchStartTime = 0;
    
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      touchStartTime = Date.now();
    }, { passive: false });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
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
    document.addEventListener('keydown', (e) => {
      if (this.gameOver || this.paused) return;
      
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
      }
    });
  }
  
  getRandomPiece() {
    // 7-bag randomiser - ensures all pieces appear before repeating
    if (this.bag.length === 0) {
      this.bag = Object.keys(this.pieces).sort(() => Math.random() - 0.5);
    }
    return this.bag.pop();
  }
  
  spawnPiece() {
    const type = this.getRandomPiece();
    this.currentPiece = {
      type,
      shape: this.pieces[type].map(row => [...row])
    };
    this.currentX = Math.floor((this.cols - this.currentPiece.shape[0].length) / 2);
    this.currentY = 0;
    
    // Check if spawn position is blocked (game over)
    if (this.collision(this.currentX, this.currentY, this.currentPiece.shape)) {
      this.gameOver = true;
    }
  }
  
  collision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = x + col;
          const newY = y + row;
          
          // Check bounds
          if (newX < 0 || newX >= this.cols || newY >= this.rows) {
            return true;
          }
          
          // Check grid collision (but allow pieces above the top)
          if (newY >= 0 && this.grid[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  
  move(dir) {
    if (!this.currentPiece) return;
    
    const newX = this.currentX + dir;
    if (!this.collision(newX, this.currentY, this.currentPiece.shape)) {
      this.currentX = newX;
    }
  }
  
  rotate() {
    if (!this.currentPiece) return;
    
    // Rotate 90 degrees clockwise
    const rotated = this.currentPiece.shape[0].map((_, i) =>
      this.currentPiece.shape.map(row => row[i]).reverse()
    );
    
    // Try rotation, with wall kicks
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      if (!this.collision(this.currentX + kick, this.currentY, rotated)) {
        this.currentPiece.shape = rotated;
        this.currentX += kick;
        return;
      }
    }
  }
  
  softDrop() {
    if (!this.currentPiece) return;
    
    if (!this.collision(this.currentX, this.currentY + 1, this.currentPiece.shape)) {
      this.currentY++;
      this.score += 1;
    }
  }
  
  hardDrop() {
    if (!this.currentPiece) return;
    
    let dropDistance = 0;
    while (!this.collision(this.currentX, this.currentY + 1, this.currentPiece.shape)) {
      this.currentY++;
      dropDistance++;
    }
    this.score += dropDistance * 2;
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
    
    // Add piece to grid
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
    
    // Clear lines
    this.clearLines();
    
    // Spawn new piece
    this.spawnPiece();
  }
  
  clearLines() {
    let linesCleared = 0;
    
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row].every(cell => cell !== null)) {
        // Remove the line
        this.grid.splice(row, 1);
        // Add empty line at top
        this.grid.unshift(Array(this.cols).fill(null));
        linesCleared++;
        row++; // Check same row again
      }
    }
    
    if (linesCleared > 0) {
      this.lines += linesCleared;
      
      // Scoring: 100, 300, 500, 800 for 1-4 lines
      const lineScores = [0, 100, 300, 500, 800];
      this.score += lineScores[linesCleared] * this.level;
      
      // Level up every 10 lines
      this.level = Math.floor(this.lines / 10) + 1;
      
      // Speed up
      this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
    }
  }
  
  update(timestamp) {
    if (this.gameOver || this.paused) return;
    
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
    
    // Clear
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid background
    ctx.fillStyle = this.colors.grid;
    ctx.fillRect(
      this.offsetX, 
      this.offsetY, 
      this.cols * this.blockSize, 
      this.rows * this.blockSize
    );
    
    // Draw grid lines
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
          this.drawBlock(col, row, this.colors[this.grid[row][col]]);
        }
      }
    }
    
    // Draw ghost piece
    if (this.currentPiece) {
      const ghostY = this.getGhostY();
      for (let row = 0; row < this.currentPiece.shape.length; row++) {
        for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
          if (this.currentPiece.shape[row][col]) {
            this.drawBlock(
              this.currentX + col, 
              ghostY + row, 
              this.colors.ghost
            );
          }
        }
      }
    }
    
    // Draw current piece
    if (this.currentPiece) {
      for (let row = 0; row < this.currentPiece.shape.length; row++) {
        for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
          if (this.currentPiece.shape[row][col]) {
            this.drawBlock(
              this.currentX + col, 
              this.currentY + row, 
              this.colors[this.currentPiece.type]
            );
          }
        }
      }
    }
    
    // Draw score
    ctx.fillStyle = this.colors.text;
    ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${this.score}`, 10, 25);
    ctx.textAlign = 'right';
    ctx.fillText(`Lines: ${this.lines}  Level: ${this.level}`, this.canvas.width - 10, 25);
    
    // Draw game over
    if (this.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2 - 30);
      
      ctx.font = '18px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
      ctx.fillText('Tap to play again', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
    
    // Draw controls hint
    if (!this.gameOver) {
      ctx.fillStyle = this.colors.text;
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tap: rotate  |  Swipe: move  |  Swipe down: drop', 
        this.canvas.width / 2, 
        this.canvas.height - 10
      );
    }
  }
  
  drawBlock(x, y, color) {
    const ctx = this.ctx;
    const px = this.offsetX + x * this.blockSize;
    const py = this.offsetY + y * this.blockSize;
    const size = this.blockSize - 1;
    
    ctx.fillStyle = color;
    ctx.fillRect(px, py, size, size);
    
    // Subtle highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(px, py, size, 3);
    ctx.fillRect(px, py, 3, size);
  }
  
  reset() {
    this.grid = this.createGrid();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.currentPiece = null;
    this.dropInterval = 1000;
    this.bag = [];
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
  }
}
