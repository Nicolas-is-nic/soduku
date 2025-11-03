// 工具函数集合

// 格式化时间显示
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 深拷贝二维数组
function deepClone2DArray(array) {
    return array.map(row => [...row]);
}

// 获取指定格子的同宫、同行、同列的格子索引
function getRelatedCells(row, col) {
    const related = {
        sameRow: [],
        sameCol: [],
        sameBox: []
    };

    // 同一行
    for (let c = 0; c < 9; c++) {
        if (c !== col) {
            related.sameRow.push({ row, col: c });
        }
    }

    // 同一列
    for (let r = 0; r < 9; r++) {
        if (r !== row) {
            related.sameCol.push({ row: r, col });
        }
    }

    // 同一宫格
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (r !== row || c !== col) {
                related.sameBox.push({ row: r, col: c });
            }
        }
    }

    return related;
}

// 计算某个格子的候选数
function calculateCandidates(board, row, col) {
    if (board[row][col].value !== 0) {
        return [];
    }

    const candidates = [];
    for (let num = 1; num <= 9; num++) {
        if (isValidMoveForGame(board, row, col, num)) {
            candidates.push(num);
        }
    }

    return candidates;
}

// 检查某个位置是否可以填入数字（适配游戏board结构）
function isValidMoveForGame(board, row, col, num) {
    // 检查行
    for (let x = 0; x < 9; x++) {
        if (board[row][x].value === num) {
            return false;
        }
    }

    // 检查列
    for (let x = 0; x < 9; x++) {
        if (board[x][col].value === num) {
            return false;
        }
    }

    // 检查3x3宫格
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol].value === num) {
                return false;
            }
        }
    }

    return true;
}

// 检查数独是否完成
function isSudokuComplete(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col].value === 0) {
                return false;
            }
        }
    }
    return true;
}

// 找出所有冲突的格子
function findConflicts(board, row, col, num) {
    const conflicts = [];

    // 检查行冲突
    for (let c = 0; c < 9; c++) {
        if (c !== col && board[row][c].value === num) {
            conflicts.push({ row, col: c });
        }
    }

    // 检查列冲突
    for (let r = 0; r < 9; r++) {
        if (r !== row && board[r][col].value === num) {
            conflicts.push({ row: r, col });
        }
    }

    // 检查宫格冲突
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if ((r !== row || c !== col) && board[r][c].value === num) {
                conflicts.push({ row: r, col: c });
            }
        }
    }

    return conflicts;
}

// 生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 本地存储工具
const Storage = {
    // 保存游戏状态
    saveGame(gameState) {
        try {
            localStorage.setItem('sudokuGameState', JSON.stringify(gameState));
            return true;
        } catch (e) {
            console.error('保存游戏失败:', e);
            return false;
        }
    },

    // 加载游戏状态
    loadGame() {
        try {
            const saved = localStorage.getItem('sudokuGameState');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('加载游戏失败:', e);
            return null;
        }
    },

    // 删除游戏状态
    clearGame() {
        try {
            localStorage.removeItem('sudokuGameState');
            return true;
        } catch (e) {
            console.error('清除游戏失败:', e);
            return false;
        }
    },

    // 保存游戏设置
    saveSettings(settings) {
        try {
            localStorage.setItem('sudokuSettings', JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('保存设置失败:', e);
            return false;
        }
    },

    // 加载游戏设置
    loadSettings() {
        try {
            const saved = localStorage.getItem('sudokuSettings');
            return saved ? JSON.parse(saved) : { difficulty: 'medium', notes: false };
        } catch (e) {
            console.error('加载设置失败:', e);
            return { difficulty: 'medium', notes: false };
        }
    }
};