// 数独题目库
const PUZZLES = {
    easy: [
        {
            difficulty: "easy",
            puzzle: [
                [5,3,0,0,7,0,0,0,0],
                [6,0,0,1,9,5,0,0,0],
                [0,9,8,0,0,0,0,6,0],
                [8,0,0,0,6,0,0,0,3],
                [4,0,0,8,0,3,0,0,1],
                [7,0,0,0,2,0,0,0,6],
                [0,6,0,0,0,0,2,8,0],
                [0,0,0,4,1,9,0,0,5],
                [0,0,0,0,8,0,0,7,9]
            ],
            solution: [
                [5,3,4,6,7,8,9,1,2],
                [6,7,2,1,9,5,3,4,8],
                [1,9,8,3,4,2,5,6,7],
                [8,5,9,7,6,1,4,2,3],
                [4,2,6,8,5,3,7,9,1],
                [7,1,3,9,2,4,8,5,6],
                [9,6,1,5,3,7,2,8,4],
                [2,8,7,4,1,9,6,3,5],
                [3,4,5,2,8,6,1,7,9]
            ]
        },
        {
            difficulty: "easy",
            puzzle: [
                [0,0,0,2,6,0,7,0,1],
                [6,8,0,0,7,0,0,9,0],
                [1,9,0,0,0,4,5,0,0],
                [8,2,0,1,0,0,0,4,0],
                [0,0,4,6,0,2,9,0,0],
                [0,5,0,0,0,3,0,2,8],
                [0,0,9,3,0,0,0,7,4],
                [0,4,0,0,5,0,0,3,6],
                [7,0,3,0,1,8,0,0,0]
            ],
            solution: [
                [4,3,5,2,6,9,7,8,1],
                [6,8,2,5,7,1,4,9,3],
                [1,9,7,8,3,4,5,6,2],
                [8,2,6,1,9,5,3,4,7],
                [3,7,4,6,8,2,9,1,5],
                [9,5,1,7,4,3,6,2,8],
                [5,1,9,3,2,6,8,7,4],
                [2,4,8,9,5,7,1,3,6],
                [7,6,3,4,1,8,2,5,9]
            ]
        }
    ],
    medium: [
        {
            difficulty: "medium",
            puzzle: [
                [0,0,0,0,0,0,0,1,2],
                [0,0,0,0,3,5,0,0,0],
                [0,0,0,6,0,0,0,7,0],
                [7,0,0,0,0,0,3,0,0],
                [0,0,0,4,0,0,8,0,0],
                [1,0,0,0,0,0,0,0,0],
                [0,0,0,1,2,0,0,0,0],
                [0,8,0,0,0,0,0,4,0],
                [0,5,0,0,0,0,6,0,0]
            ],
            solution: [
                [8,6,4,7,9,2,5,1,3],
                [9,2,7,8,3,5,4,6,8],
                [3,5,1,6,4,8,2,7,9],
                [7,4,8,2,1,9,3,5,6],
                [6,3,2,4,5,7,8,9,1],
                [1,9,5,3,8,6,7,2,4],
                [4,7,3,1,2,6,9,8,5],
                [2,8,6,5,7,3,1,4,0],
                [5,1,9,8,6,4,6,3,2]
            ]
        }
    ],
    hard: [
        {
            difficulty: "hard",
            puzzle: [
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,3,0,8,5],
                [0,0,1,0,2,0,0,0,0],
                [0,0,0,5,0,7,0,0,0],
                [0,0,4,0,0,0,1,0,0],
                [0,9,0,0,0,0,0,0,0],
                [5,0,0,0,0,0,0,7,3],
                [0,0,2,0,1,0,0,0,0],
                [0,0,0,0,4,0,0,0,9]
            ],
            solution: [
                [9,8,7,6,5,4,3,2,1],
                [2,4,6,1,7,3,9,8,5],
                [3,5,1,9,2,8,7,6,4],
                [1,2,8,5,3,7,6,4,9],
                [6,3,4,8,9,2,1,5,7],
                [7,9,5,4,6,1,8,3,2],
                [5,1,9,2,8,6,4,7,3],
                [4,7,2,3,1,9,5,8,6],
                [8,6,3,7,4,5,2,1,9]
            ]
        }
    ]
};

// 获取指定难度的随机题目
function getRandomPuzzle(difficulty = 'medium') {
    const puzzles = PUZZLES[difficulty];
    if (!puzzles || puzzles.length === 0) {
        throw new Error(`No puzzles found for difficulty: ${difficulty}`);
    }

    const randomIndex = Math.floor(Math.random() * puzzles.length);
    return JSON.parse(JSON.stringify(puzzles[randomIndex])); // 深拷贝
}

// 生成数独题目的函数（简单版本）
function generateSudoku(difficulty = 'medium') {
    // 这里可以使用更复杂的算法生成数独
    // 现在先返回预设题目
    return getRandomPuzzle(difficulty);
}

// 验证数独是否有效
function isValidSudoku(board) {
    // 检查行
    for (let row = 0; row < 9; row++) {
        if (!isValidGroup(board[row])) {
            return false;
        }
    }

    // 检查列
    for (let col = 0; col < 9; col++) {
        const column = [];
        for (let row = 0; row < 9; row++) {
            column.push(board[row][col]);
        }
        if (!isValidGroup(column)) {
            return false;
        }
    }

    // 检查3x3宫格
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const box = [];
            for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
                for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
                    box.push(board[row][col]);
                }
            }
            if (!isValidGroup(box)) {
                return false;
            }
        }
    }

    return true;
}

// 检查一组数字是否有效（1-9不重复）
function isValidGroup(group) {
    const numbers = group.filter(num => num !== 0);
    const uniqueNumbers = [...new Set(numbers)];
    return numbers.length === uniqueNumbers.length;
}

// 检查某个位置是否可以填入数字
function isValidMove(board, row, col, num) {
    // 检查行
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }

    // 检查列
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) {
            return false;
        }
    }

    // 检查3x3宫格
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}