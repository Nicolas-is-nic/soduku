# 数独游戏 (Sudoku Game)

一个用Python实现的经典数独游戏项目，提供完整的游戏体验和智能求解功能。

![Python](https://img.shields.io/badge/Python-3.7%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 项目简介

这是一个功能完整的数独游戏实现，不仅提供了友好的用户界面，还包含了强大的自动求解算法。无论您是数独爱好者还是想要学习回溯算法的开发者，这个项目都能为您提供良好的体验和学习价值。

## ✨ 功能特性

- 🎮 **直观的游戏界面** - 清晰的命令行界面，易于操作
- 🔢 **智能自动求解** - 基于回溯算法的高效求解器
- ✅ **实时验证功能** - 即时检查输入和解答的正确性
- 🎯 **多难度级别** - 简单、中等、困难三种难度选择
- 📝 **游戏提示功能** - 在遇到困难时提供智能提示
- 💾 **保存/加载游戏** - 支持游戏进度的保存和恢复
- 📊 **统计功能** - 记录完成时间和游戏统计

## 🚀 如何运行

### 环境要求

- Python 3.7+
- 操作系统：Windows、macOS、Linux

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yangming/soduku.git
cd soduku

# 安装依赖
pip install -r requirements.txt
```

### 运行游戏

```bash
python main.py
```

## 📁 项目结构

```
soduku/
├── README.md              # 项目说明文档
├── CLAUDE.md              # Claude Code 指导文件
├── main.py                # 主程序入口
├── sudoku.py              # 数独游戏逻辑
├── solver.py              # 数独求解算法
├── utils.py               # 工具函数
├── requirements.txt       # 项目依赖
└── tests/                 # 测试文件
    ├── test_sudoku.py     # 数独逻辑测试
    └── test_solver.py     # 求解器测试
```

## 🎮 游戏规则

数独是一种经典的逻辑填数游戏，目标是在9×9的网格中填入数字1-9，使得：

- 每一行都包含1-9的数字，不重复
- 每一列都包含1-9的数字，不重复
- 每个3×3的子网格都包含1-9的数字，不重复

### 游戏操作说明

- `1-9`：在选中的格子中填入数字
- `0` 或 `空格`：清除选中格子的数字
- `h`：显示提示
- `s`：自动求解当前谜题
- `n`：开始新游戏
- `q`：退出游戏

## 🧩 算法实现

本项目使用以下核心算法：

### 回溯算法 (Backtracking)
- **时间复杂度**：O(9^(n²))，其中n是网格大小（通常为9）
- **空间复杂度**：O(n²)
- **特点**：保证找到解或确定无解，是数独求解的经典算法

### 约束传播 (Constraint Propagation)
- 使用候选数排除法优化求解过程
- 实现了以下优化策略：
  - 唯一候选数法
  - 隐藏候选数法
  - 数对排除法

## 📋 使用示例

```python
from sudoku import SudokuGame
from solver import SudokuSolver

# 创建新游戏
game = SudokuGame()
game.new_game(difficulty="medium")

# 打印游戏板
game.print_board()

# 检查解答
if game.is_valid_solution():
    print("恭喜！解答正确！")

# 自动求解
solver = SudokuSolver(game.board)
solution = solver.solve()
```

## 🧪 运行测试

```bash
# 运行所有测试
python -m pytest tests/

# 运行特定测试
python -m pytest tests/test_sudoku.py
python -m pytest tests/test_solver.py

# 生成覆盖率报告
python -m pytest --cov=. tests/
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. **Fork** 本仓库
2. **创建** 您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. **提交** 您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. **推送** 到分支 (`git push origin feature/AmazingFeature`)
5. **创建** 一个 Pull Request

### 贡献类型

- 🐛 Bug修复
- ✨ 新功能开发
- 📝 文档改进
- 🧪 测试用例
- 🎨 代码优化

## 📝 更新日志

### v1.0.0 (2024-01-01)
- ✨ 初始版本发布
- 🎮 基础游戏功能
- 🔢 自动求解算法
- ✅ 解答验证功能

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 作者

**[yangming](https://github.com/yangming)** - 项目创建者和维护者

## 🙏 致谢

- 感谢所有为这个项目做出贡献的开发者
- 灵感来源于经典的数独游戏
- 特别感谢开源社区的支持

## 📞 联系方式

如果您有任何问题或建议，欢迎通过以下方式联系：

- 📧 Email：[your-email@example.com](mailto:your-email@example.com)
- 🐛 Issues：[GitHub Issues](https://github.com/yangming/soduku/issues)
- 💬 Discussions：[GitHub Discussions](https://github.com/yangming/soduku/discussions)

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！