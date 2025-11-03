// 数独游戏核心逻辑类
class SudokuGame {
    constructor() {
        this.board = [];
        this.solution = [];
        this.selectedCell = null;
        this.history = [];
        this.isNotesMode = false;
        this.difficulty = 'medium';
        this.moves = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.isGameComplete = false;

        this.initializeGame();
    }

    // 初始化游戏
    initializeGame() {
        this.createEmptyBoard();
        this.loadSettings();
        this.startNewGame();
    }

    // 创建空的9x9游戏板
    createEmptyBoard() {
        this.board = [];
        for (let row = 0; row < 9; row++) {
            this.board[row] = [];
            for (let col = 0; col < 9; col++) {
                this.board[row][col] = {
                    value: 0,
                    isFixed: false,
                    notes: [],
                    isError: false
                };
            }
        }
    }

    // 开始新游戏
    startNewGame(difficulty = null) {
        if (difficulty) {
            this.difficulty = difficulty;
        }

        // 获取新题目
        const puzzle = generateSudoku(this.difficulty);
        this.loadPuzzle(puzzle);

        // 重置游戏状态
        this.history = [];
        this.moves = 0;
        this.isGameComplete = false;
        this.selectedCell = null;
        this.startTimer();

        // 触发UI更新
        this.onGameUpdate();
    }

    // 加载数独题目
    loadPuzzle(puzzleData) {
        this.createEmptyBoard();
        this.solution = puzzleData.solution;

        // 填入题目
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = puzzleData.puzzle[row][col];
                if (value !== 0) {
                    this.board[row][col] = {
                        value: value,
                        isFixed: true,
                        notes: [],
                        isError: false
                    };
                }
            }
        }
    }

    // 选择格子
    selectCell(row, col) {
        if (this.isGameComplete) {
            return;
        }

        this.selectedCell = { row, col };
        this.onCellSelect(row, col);
    }

    // 填入数字
    enterNumber(num) {
        if (!this.selectedCell || this.isGameComplete) {
            return;
        }

        const { row, col } = this.selectedCell;
        const cell = this.board[row][col];

        if (cell.isFixed) {
            return;
        }

        // 保存历史记录
        this.saveHistory();

        if (this.isNotesMode) {
            this.toggleNote(row, col, num);
        } else {
            this.setCellValue(row, col, num);
        }

        this.moves++;
        this.onGameUpdate();
    }

    // 设置格子值
    setCellValue(row, col, value) {
        const cell = this.board[row][col];
        const oldValue = cell.value;

        cell.value = value;
        cell.notes = [];
        cell.isError = false;

        // 检查错误
        if (value !== 0) {
            const conflicts = this.findConflicts(row, col, value);
            cell.isError = conflicts.length > 0;

            // 自动删除相关格子的候选数
            this.removeRelatedNotes(row, col, value);
        }

        // 检查游戏是否完成
        if (this.checkCompletion()) {
            this.completeGame();
        }
    }

    // 切换候选数
    toggleNote(row, col, num) {
        const cell = this.board[row][col];

        if (cell.value !== 0) {
            return; // 已有值的格子不能添加候选数
        }

        const noteIndex = cell.notes.indexOf(num);
        if (noteIndex === -1) {
            cell.notes.push(num);
            cell.notes.sort(); // 保持候选数排序
        } else {
            cell.notes.splice(noteIndex, 1);
        }

        cell.isError = false;
    }

    // 删除相关格子的候选数
    removeRelatedNotes(row, col, num) {
        const related = getRelatedCells(row, col);

        // 从同行、同列、同宫格中移除该候选数
        [...related.sameRow, ...related.sameCol, ...related.sameBox].forEach(({ row: r, col: c }) => {
            const noteIndex = this.board[r][c].notes.indexOf(num);
            if (noteIndex !== -1) {
                this.board[r][c].notes.splice(noteIndex, 1);
            }
        });
    }

    // 清除格子
    clearCell() {
        if (!this.selectedCell || this.isGameComplete) {
            return;
        }

        const { row, col } = this.selectedCell;
        const cell = this.board[row][col];

        if (cell.isFixed) {
            return;
        }

        this.saveHistory();
        cell.value = 0;
        cell.notes = [];
        cell.isError = false;

        this.moves++;
        this.onGameUpdate();
    }

    // 填入所有候选数
    fillAllNotes() {
        if (this.isGameComplete) {
            return;
        }

        this.saveHistory();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board[row][col];
                if (cell.value === 0 && !cell.isFixed) {
                    cell.notes = calculateCandidates(this.board, row, col);
                }
            }
        }

        this.moves++;
        this.onGameUpdate();
    }

    // 填写唯一候选数
    fillUniqueCandidates() {
        if (this.isGameComplete) {
            return;
        }

        this.saveHistory();

        let filledCount = 0;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board[row][col];
                if (cell.value === 0 && !cell.isFixed) {
                    // 如果候选数为空，先计算候选数
                    if (cell.notes.length === 0) {
                        cell.notes = calculateCandidates(this.board, row, col);
                    }

                    // 如果只有一个候选数，则自动填入
                    if (cell.notes.length === 1) {
                        const uniqueValue = cell.notes[0];
                        this.setCellValue(row, col, uniqueValue);
                        filledCount++;
                    }
                }
            }
        }

        if (filledCount > 0) {
            this.moves++;
            this.onGameUpdate();

            // 如果有格子被填入，递归检查是否有新的唯一候选数
            setTimeout(() => {
                this.fillUniqueCandidates();
            }, 100);
        }
    }

    // 切换候选数模式
    toggleNotesMode() {
        this.isNotesMode = !this.isNotesMode;
        this.onGameUpdate();
    }

    // 撤销操作
    undo() {
        if (this.history.length === 0 || this.isGameComplete) {
            return;
        }

        const previousState = this.history.pop();
        this.board = deepClone2DArray(previousState.board);
        this.selectedCell = previousState.selectedCell;
        this.moves = previousState.moves;

        this.onGameUpdate();
    }

    // 保存历史记录
    saveHistory() {
        const state = {
            board: deepClone2DArray(this.board),
            selectedCell: this.selectedCell,
            moves: this.moves
        };

        this.history.push(state);

        // 限制历史记录数量
        if (this.history.length > 50) {
            this.history.shift();
        }
    }

    // 检查错误
    checkErrors() {
        let hasErrors = false;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = this.board[row][col];
                if (cell.value !== 0) {
                    const conflicts = this.findConflicts(row, col, cell.value);
                    cell.isError = conflicts.length > 0;
                    if (cell.isError) {
                        hasErrors = true;
                    }
                }
            }
        }

        this.onGameUpdate();
        return hasErrors;
    }

    
    // 检查游戏是否完成
    checkCompletion() {
        // 检查所有格子是否都有值
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col].value === 0) {
                    return false;
                }
            }
        }

        // 检查是否有错误
        return !this.checkErrors();
    }

    // 游戏完成
    completeGame() {
        this.isGameComplete = true;
        this.stopTimer();
        this.onGameComplete();
    }

    // 查找冲突
    findConflicts(row, col, num) {
        return findConflicts(this.board, row, col, num);
    }

    // 获取相同数字的格子
    getSameNumberCells(num) {
        const cells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col].value === num) {
                    cells.push({ row, col });
                }
            }
        }
        return cells;
    }

    // 获取包含特定候选数的格子
    getCellsWithNote(num) {
        const cells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col].notes.includes(num)) {
                    cells.push({ row, col });
                }
            }
        }
        return cells;
    }

    // 开始计时
    startTimer() {
        this.stopTimer();
        this.startTime = Date.now();

        this.timerInterval = setInterval(() => {
            if (!this.isGameComplete) {
                this.onTimerUpdate();
            }
        }, 1000);
    }

    // 停止计时
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // 获取游戏时间
    getElapsedTime() {
        if (!this.startTime) {
            return 0;
        }
        return Math.floor((Date.now() - this.startTime) / 1000);
    }

    // 加载设置
    loadSettings() {
        const settings = Storage.loadSettings();
        this.difficulty = settings.difficulty || 'medium';
        this.isNotesMode = settings.notes || false;
    }

    // 保存设置
    saveSettings() {
        const settings = {
            difficulty: this.difficulty,
            notes: this.isNotesMode
        };
        Storage.saveSettings(settings);
    }

    // 保存游戏状态
    saveGame() {
        const gameState = {
            board: this.board,
            solution: this.solution,
            difficulty: this.difficulty,
            moves: this.moves,
            startTime: this.startTime,
            isNotesMode: this.isNotesMode
        };
        Storage.saveGame(gameState);
    }

    // 加载游戏状态
    loadGame() {
        const gameState = Storage.loadGame();
        if (gameState) {
            this.board = gameState.board;
            this.solution = gameState.solution;
            this.difficulty = gameState.difficulty;
            this.moves = gameState.moves;
            this.startTime = gameState.startTime;
            this.isNotesMode = gameState.isNotesMode;
            this.isGameComplete = false;

            // 清除所有候选数，确保新开始的游戏是干净的
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (!this.board[row][col].isFixed) {
                        this.board[row][col].notes = [];
                    }
                }
            }

            this.startTimer();
            this.onGameUpdate();
        }
    }

    // 事件回调函数（由UI类重写）
    onGameUpdate() {}
    onCellSelect(row, col) {}
    onGameComplete() {}
    onTimerUpdate() {}
}