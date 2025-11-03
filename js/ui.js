// 数独游戏UI交互类
class SudokuUI {
    constructor(game) {
        this.game = game;
        this.boardElement = document.getElementById('sudoku-board');
        this.timerElement = document.getElementById('timer');
        this.movesElement = document.getElementById('moves');
        this.victoryModal = document.getElementById('victory-modal');

        this.initializeBoard();
        this.attachEventListeners();
        this.setupGameCallbacks();
    }

    // 初始化游戏板UI
    initializeBoard() {
        this.boardElement.innerHTML = '';

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                // 创建数值显示区域
                const valueElement = document.createElement('div');
                valueElement.className = 'cell-value';
                cell.appendChild(valueElement);

                // 创建候选数显示区域
                const notesElement = document.createElement('div');
                notesElement.className = 'cell-notes';
                for (let i = 1; i <= 9; i++) {
                    const note = document.createElement('div');
                    note.className = 'note';
                    note.dataset.note = i;
                    notesElement.appendChild(note);
                }
                cell.appendChild(notesElement);

                this.boardElement.appendChild(cell);
            }
        }
    }

    // 设置游戏事件回调
    setupGameCallbacks() {
        this.game.onGameUpdate = () => this.updateUI();
        this.game.onCellSelect = (row, col) => this.highlightRelatedCells(row, col);
        this.game.onGameComplete = () => this.showVictoryModal();
        this.game.onTimerUpdate = () => this.updateTimer();
    }

    // 添加事件监听器
    attachEventListeners() {
        // 格子点击事件
        this.boardElement.addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.game.selectCell(row, col);
            }
        });

        // 数字按钮事件
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const number = parseInt(btn.dataset.number);
                this.game.enterNumber(number);
            });
        });

        // 操作按钮事件
        document.getElementById('clear-cell').addEventListener('click', () => {
            this.game.clearCell();
        });

        document.getElementById('fill-notes').addEventListener('click', () => {
            this.game.fillAllNotes();
        });

        document.getElementById('undo').addEventListener('click', () => {
            this.game.undo();
        });

        document.getElementById('check-errors').addEventListener('click', () => {
            this.game.checkErrors();
        });

        document.getElementById('fill-unique-candidates').addEventListener('click', () => {
            this.game.fillUniqueCandidates();
        });

        // 新游戏按钮
        document.getElementById('new-game').addEventListener('click', () => {
            const difficulty = document.getElementById('difficulty').value;
            this.game.startNewGame(difficulty);
        });

        // 难度选择
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.game.difficulty = e.target.value;
            this.game.saveSettings();
        });

        // 模态框关闭按钮
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideVictoryModal();
        });

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // 键盘释放事件（主要用于处理空格键松开）
        document.addEventListener('keyup', (e) => {
            if (e.key === ' ') {
                e.preventDefault();
                if (this.game.isNotesMode) {
                    this.game.isNotesMode = false;
                    this.updateButtons();
                }
            }
        });

        // 页面关闭前保存游戏
        window.addEventListener('beforeunload', () => {
            this.game.saveGame();
        });

        // 页面加载时尝试恢复游戏
        window.addEventListener('load', () => {
            this.game.loadGame();
        });
    }

    // 处理键盘输入
    handleKeyPress(e) {
        if (this.game.isGameComplete) {
            return;
        }

        // 数字键
        if (e.key >= '1' && e.key <= '9') {
            const number = parseInt(e.key);
            this.game.enterNumber(number);
        }

        // 删除键
        if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            this.game.clearCell();
        }

        // 空格键按下时切换到候选数模式
        if (e.key === ' ') {
            e.preventDefault();
            if (!this.game.isNotesMode) {
                this.game.isNotesMode = true;
                this.updateButtons();
            }
        }

        // 方向键移动选中格子
        if (this.game.selectedCell) {
            let { row, col } = this.game.selectedCell;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (row > 0) this.game.selectCell(row - 1, col);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (row < 8) this.game.selectCell(row + 1, col);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (col > 0) this.game.selectCell(row, col - 1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (col < 8) this.game.selectCell(row, col + 1);
                    break;
            }
        }

        // 撤销
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            this.game.undo();
        }

        // 新游戏
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            this.game.startNewGame();
        }
    }

    // 更新UI
    updateUI() {
        this.updateBoard();
        this.updateMoves();
        this.updateButtons();
    }

    // 更新游戏板显示
    updateBoard() {
        const cells = this.boardElement.querySelectorAll('.cell');

        cells.forEach((cell) => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const gameCell = this.game.board[row][col];

            // 更新格子类名
            cell.className = 'cell';
            if (gameCell.isFixed) {
                cell.classList.add('fixed');
            }
            if (gameCell.isError) {
                cell.classList.add('error');
            }
            if (this.game.selectedCell &&
                this.game.selectedCell.row === row &&
                this.game.selectedCell.col === col) {
                cell.classList.add('selected');
            }

            // 更新数值
            const valueElement = cell.querySelector('.cell-value');
            if (gameCell.value !== 0) {
                valueElement.textContent = gameCell.value;
                valueElement.style.display = 'block';
            } else {
                valueElement.textContent = '';
                valueElement.style.display = 'none';
            }

            // 更新候选数
            const notesElement = cell.querySelector('.cell-notes');
            const noteElements = notesElement.querySelectorAll('.note');

            noteElements.forEach((noteElement, index) => {
                const noteValue = index + 1;

                if (gameCell.notes.includes(noteValue)) {
                    noteElement.textContent = noteValue;
                    noteElement.style.display = 'flex';
                    // 为调试添加位置信息（可选）
                    // noteElement.title = `数字${noteValue}应该在位置：行${Math.floor((noteValue-1)/3)+1}, 列${((noteValue-1)%3)+1}`;
                } else {
                    noteElement.textContent = '';
                    noteElement.style.display = 'none';
                }
            });

            // 显示/隐藏候选数容器
            notesElement.style.display = gameCell.value === 0 && gameCell.notes.length > 0 ? 'grid' : 'none';
        });
    }

    // 高亮相关格子
    highlightRelatedCells(row, col) {
        const cells = this.boardElement.querySelectorAll('.cell');

        // 清除所有高亮和背景色
        cells.forEach(cell => {
            cell.classList.remove('highlighted', 'highlighted-notes', 'highlight-related', 'highlight-related-rowcol');
            cell.style.backgroundColor = '';
            // 清除候选数的高亮
            const noteElements = cell.querySelectorAll('.note');
            noteElements.forEach(noteElement => {
                noteElement.classList.remove('highlighted');
            });
        });

        const gameCell = this.game.board[row][col];

        // 首先高亮当前格子的同行、同列、同宫格
        const relatedCells = getRelatedCells(row, col);

        // 高亮同宫格
        relatedCells.sameBox.forEach(({ row: r, col: c }) => {
            const cellElement = this.getCellElement(r, c);
            if (cellElement) {
                cellElement.classList.add('highlight-related');
            }
        });

        // 高亮同行和同列（不同的颜色）
        [...relatedCells.sameRow, ...relatedCells.sameCol].forEach(({ row: r, col: c }) => {
            const cellElement = this.getCellElement(r, c);
            if (cellElement && !cellElement.classList.contains('highlight-related')) {
                cellElement.classList.add('highlight-related-rowcol');
            }
        });

        // 如果格子有数字，高亮所有相同数字的格子
        if (gameCell.value !== 0) {
            const sameNumberCells = this.game.getSameNumberCells(gameCell.value);
            sameNumberCells.forEach(({ row: r, col: c }) => {
                const cellElement = this.getCellElement(r, c);
                if (cellElement) {
                    cellElement.classList.remove('highlight-related', 'highlight-related-rowcol');
                    cellElement.classList.add('highlighted');
                }
            });

            // 同时高亮包含该数字作为候选数的格子和候选数
            const cellsWithNote = this.game.getCellsWithNote(gameCell.value);
            cellsWithNote.forEach(({ row: r, col: c }) => {
                const cellElement = this.getCellElement(r, c);
                if (cellElement) {
                    cellElement.classList.remove('highlight-related', 'highlight-related-rowcol');
                    cellElement.classList.add('highlighted-notes');
                    // 高亮具体的候选数
                    const noteElement = cellElement.querySelector(`.note[data-note="${gameCell.value}"]`);
                    if (noteElement) {
                        noteElement.classList.add('highlighted');
                    }
                }
            });
        }

        // 如果格子是空的且有候选数，不进行数字和候选数高亮，只保留行列宫高亮
        // 这样用户可以清楚地看到当前格子的相关位置，而不会被其他信息干扰
        // (移除了候选数高亮逻辑)
    }

    // 获取格子元素
    getCellElement(row, col) {
        return this.boardElement.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    }

    // 更新步数显示
    updateMoves() {
        this.movesElement.textContent = this.game.moves;
    }

    // 更新计时器
    updateTimer() {
        const elapsedSeconds = this.game.getElapsedTime();
        this.timerElement.textContent = formatTime(elapsedSeconds);
    }

    // 更新按钮状态
    updateButtons() {
        const undoBtn = document.getElementById('undo');

        // 更新撤销按钮状态
        undoBtn.disabled = this.game.history.length === 0;
        undoBtn.style.opacity = undoBtn.disabled ? '0.5' : '1';
    }

    // 显示胜利模态框
    showVictoryModal() {
        const finalTime = this.game.getElapsedTime();
        const finalMoves = this.game.moves;

        document.getElementById('final-time').textContent = formatTime(finalTime);
        document.getElementById('final-moves').textContent = finalMoves;

        this.victoryModal.classList.add('show');
    }

    // 隐藏胜利模态框
    hideVictoryModal() {
        this.victoryModal.classList.remove('show');
        this.game.startNewGame();
    }

    // 显示加载动画
    showLoading() {
        this.boardElement.style.opacity = '0.5';
        this.boardElement.style.pointerEvents = 'none';
    }

    // 隐藏加载动画
    hideLoading() {
        this.boardElement.style.opacity = '1';
        this.boardElement.style.pointerEvents = 'auto';
    }
}

// 初始化游戏
let game;
let ui;

document.addEventListener('DOMContentLoaded', () => {
    game = new SudokuGame();
    ui = new SudokuUI(game);

    // 如果有保存的游戏，尝试恢复
    const savedGame = Storage.loadGame();
    if (!savedGame) {
        // 没有保存的游戏，开始新游戏
        game.startNewGame();
    }
});