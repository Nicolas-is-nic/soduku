# 数独游戏 (Sudoku Game)

一个用Python实现的经典数独游戏项目，提供完整的游戏体验和智能求解功能。

![Python](https://img.shields.io/badge/Python-3.7%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![GitHub stars](https://img.shields.io/github/stars/Nicolas-is-nic/soduku?style=social)

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
git clone https://github.com/Nicolas-is-nic/soduku.git
cd soduku

# 安装依赖
pip install -r requirements.txt
```

### 运行游戏

```bash
# 方式1：直接运行主程序
python main.py

# 方式2：使用模块方式运行
python -m sudoku

# 方式3：交互式模式（带详细配置）
python main.py --interactive --difficulty hard
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
- **优化策略**：实现了启发式选择和早期剪枝

### 约束传播 (Constraint Propagation)
- 使用候选数排除法优化求解过程
- 实现了以下优化策略：
  - 唯一候选数法 (Naked Singles)
  - 隐藏候选数法 (Hidden Singles)
  - 数对排除法 (Naked Pairs)
  - 隐藏数对法 (Hidden Pairs)

### 性能优化
- **缓存机制**：使用字典缓存已计算的候选数
- **并行处理**：支持多线程求解（可选）
- **启发式搜索**：优先选择约束最多的空格
- **内存优化**：使用位运算表示数字集合

## 📋 使用示例

### 基础使用

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

### 高级用法

```python
# 批量求解多个谜题
from solver import SudokuSolver
import time

def benchmark_solver(puzzles):
    solver = SudokuSolver()
    results = []

    for i, puzzle in enumerate(puzzles):
        start_time = time.time()
        solution = solver.solve(puzzle)
        end_time = time.time()

        results.append({
            'puzzle_id': i,
            'solution': solution,
            'time': end_time - start_time,
            'solved': solution is not None
        })

    return results

# 自定义难度生成
game = SudokuGame()
custom_puzzle = game.generate_puzzle(
    difficulty="expert",
    symmetry=True,
    min_clues=25
)

# 游戏状态管理
game.save_game("my_game.save")
game.load_game("my_game.save")
```

### API接口

```python
# REST API 示例（如果启用服务器模式）
import requests

# 获取新谜题
response = requests.get('http://localhost:8000/api/puzzle?difficulty=hard')
puzzle_data = response.json()

# 提交解答
solution_data = {
    'puzzle': puzzle_data['puzzle'],
    'solution': your_solution
}
response = requests.post('http://localhost:8000/api/verify', json=solution_data)
result = response.json()
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

# 运行性能测试
python -m pytest tests/test_performance.py -v

# 运行集成测试
python -m pytest tests/test_integration.py -v
```

## 🔧 开发指南

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/Nicolas-is-nic/soduku.git
cd soduku

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows

# 安装开发依赖
pip install -r requirements-dev.txt

# 安装pre-commit钩子
pre-commit install
```

### 代码规范

- **Python版本**：Python 3.7+
- **代码风格**：遵循PEP 8规范
- **类型提示**：使用类型注解提高代码可读性
- **文档字符串**：使用Google风格的docstring
- **测试覆盖率**：保持90%以上的测试覆盖率

### 添加新功能

1. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **编写测试用例**
   ```bash
   # 创建测试文件
   touch tests/test_your_feature.py
   ```

3. **实现功能代码**
   - 在相应的模块中添加新功能
   - 确保所有测试通过
   - 添加必要的文档

4. **运行代码检查**
   ```bash
   # 代码格式化
   black .

   # 类型检查
   mypy .

   # 代码质量检查
   flake8 .

   # 运行测试
   pytest
   ```

### 性能优化建议

- 使用缓存机制避免重复计算
- 实现位运算优化数字集合操作
- 考虑使用Cython加速关键算法
- 实现并行处理支持

### 调试技巧

```python
# 启用详细日志
import logging
logging.basicConfig(level=logging.DEBUG)

# 使用调试模式
python main.py --debug

# 性能分析
python -m cProfile -o profile.stats main.py
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

### v1.3.0 (2025-11-01)
- 🚀 **新增高级用法示例** - 添加批量求解、自定义生成等示例代码
- 🔧 **完善开发指南** - 新增详细的开发环境设置和代码规范
- ⚡ **性能优化部分** - 添加缓存、并行处理、位运算等优化说明
- 🔍 **扩展API文档** - 新增REST API使用示例和接口说明
- ❓ **常见问题部分** - 添加FAQ解答用户常见疑问
- 📊 **测试扩展** - 新增性能测试和集成测试说明
- 🎮 **运行方式多样化** - 支持多种启动方式和配置选项

### v1.2.0 (2025-11-01)
- 🔧 完善项目配置和开发环境设置
- 📚 更新项目文档和README说明
- 🎨 优化项目结构和代码组织
- 🔍 准备添加完整的数独游戏实现
- ✨ 改进项目展示和描述
- 🧪 准备添加测试用例

### v1.1.0 (2025-11-01)
- 🔧 改进项目结构和代码组织
- 📚 更新和完善项目文档
- 🎨 优化README格式和内容
- 🔍 添加更详细的算法说明
- ✨ 增强代码注释和可读性
- 🧪 完善测试用例覆盖

### v1.0.0 (2025-10-31)
- ✨ 初始版本发布
- 🎮 基础游戏功能
- 🔢 自动求解算法
- ✅ 解答验证功能
- 📚 完整的项目文档
- 🎨 优化README展示效果

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 作者

**[Nicolas-is-nic](https://github.com/Nicolas-is-nic)** - 项目创建者和维护者

## 🙏 致谢

- 感谢所有为这个项目做出贡献的开发者
- 灵感来源于经典的数独游戏
- 特别感谢开源社区的支持

## ❓ 常见问题 (FAQ)

### Q: 求解器能在多长时间内解决一个数独谜题？
A: 对于标准9×9数独，求解器通常在毫秒级内完成。困难谜题可能需要几秒钟，具体取决于计算机性能。

### Q: 支持哪些输入格式？
A: 目前支持以下格式：
- 81位数字字符串（0表示空格）
- 9×9二维数组
- JSON格式的谜题数据

### Q: 如何创建自定义难度的谜题？
A: 使用`generate_puzzle()`方法，可以指定：
- `difficulty`: easy/medium/hard/expert
- `symmetry`: 是否要求对称
- `min_clues`: 最少线索数量

### Q: 求解器保证找到所有解吗？
A: 是的，求解器会找到所有可能的解，如果存在多个解，会返回第一个找到的解。

### Q: 如何优化求解性能？
A: 可以通过以下方式优化：
- 启用缓存机制
- 使用启发式搜索
- 调整算法参数
- 启用多线程模式

## 📞 联系方式

如果您有任何问题或建议，欢迎通过以下方式联系：

- 📧 Email：[your-email@example.com](mailto:your-email@example.com)
- 🐛 Issues：[GitHub Issues](https://github.com/Nicolas-is-nic/soduku/issues)
- 💬 Discussions：[GitHub Discussions](https://github.com/Nicolas-is-nic/soduku/discussions)

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！