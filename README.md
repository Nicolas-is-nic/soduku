# 数独游戏 (Sudoku Game)

一个用Python实现的数独游戏项目。

## 项目简介

这是一个经典的数独游戏实现，提供了完整的数独求解和游戏功能。

## 功能特性

- 🎮 数独游戏界面
- 🔢 自动求解功能
- ✅ 验证解答正确性
- 🎯 难度级别选择

## 如何运行

### 环境要求

- Python 3.7+

### 安装依赖

```bash
pip install -r requirements.txt
```

### 运行游戏

```bash
python main.py
```

## 项目结构

```
soduku/
├── README.md          # 项目说明文档
├── CLAUDE.md          # Claude Code 指导文件
├── main.py            # 主程序入口
├── sudoku.py          # 数独游戏逻辑
├── solver.py          # 数独求解算法
└── requirements.txt   # 项目依赖
```

## 游戏规则

数独是一种经典的逻辑填数游戏，目标是在9×9的网格中填入数字1-9，使得：

- 每一行都包含1-9的数字，不重复
- 每一列都包含1-9的数字，不重复
- 每个3×3的子网格都包含1-9的数字，不重复

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License

## 作者

[Nicolas-is-nic](https://github.com/Nicolas-is-nic)