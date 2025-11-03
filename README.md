# 数独游戏 (Sudoku Game)

一个用Python实现的经典数独游戏项目，包含自动求解功能。

![Python](https://img.shields.io/badge/Python-3.7%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 功能特性

- 🎮 **游戏界面** - 清晰的命令行界面
- 🔢 **自动求解** - 基于回溯算法的高效求解器
- ✅ **验证功能** - 检查解答的正确性
- 🎯 **多难度级别** - 简单、中等、困难三种难度
- 📝 **提示功能** - 提供智能提示
- 💾 **保存/加载** - 支持游戏进度保存和恢复

## 🚀 快速开始

### 环境要求

- Python 3.7+

### 安装运行

```bash
# 克隆项目
git clone https://github.com/Nicolas-is-nic/soduku.git
cd soduku

# 安装依赖
pip install -r requirements.txt

# 运行游戏
python main.py
```

## 📁 项目结构

```
soduku/
├── README.md       # 项目说明文档
├── main.py         # 主程序入口
├── sudoku.py       # 数独游戏逻辑
├── solver.py       # 数独求解算法
├── utils.py        # 工具函数
└── requirements.txt # 项目依赖
```

## 🎮 游戏规则

数独是在9×9网格中填入数字1-9，使得：
- 每一行包含1-9，不重复
- 每一列包含1-9，不重复
- 每个3×3子网格包含1-9，不重复

### 操作说明

- `1-9`：填入数字
- `0` 或 `空格`：清除数字
- `h`：显示提示
- `s`：自动求解
- `n`：新游戏
- `q`：退出游戏

## 💻 使用示例

```python
from sudoku import SudokuGame
from solver import SudokuSolver

# 创建新游戏
game = SudokuGame()
game.new_game(difficulty="medium")
game.print_board()

# 自动求解
solver = SudokuSolver(game.board)
solution = solver.solve()
```

## 🧪 运行测试

```bash
python -m pytest tests/
```

## 🤝 贡献

欢迎提交 Pull Request 和 Issue！

## 📄 许可证

MIT License

## 👥 作者

[Nicolas-is-nic](https://github.com/Nicolas-is-nic)