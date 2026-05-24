# 数据目录说明

本目录包含 HR-Agent-DataGraph 的所有标准参考数据文件。

## 格式约定

| 约定 | 说明 | 示例 |
|------|------|------|
| 双语字符串 | 所有面向用户的文本字段均包含中英文 | `{ "zh": "主动离职", "en": "Voluntary Resignation" }` |
| 标准编码 | 大写字母+数字+下划线，全大写 | `VOLUNTARY`, `RESIGNATION_NORMAL` |
| 日期 | ISO 8601 日期格式 | `2026-05-24` |
| 枚举兜底 | 所有枚举类型均包含 `OTHER` 选项 | `OTHER_VOLUNTARY` |
| Schema 引用 | 每个数据文件通过 `$schema` 引用验证规则 | `"$schema": "../schemas/..."` |

## 目录结构

```
data/
├── foundation/                     # 基础数据
│   ├── administrative-divisions/   # 行政区划（省市区）
│   └── higher-education/           # 高校与学历
├── core-hr/                        # 核心人力
│   ├── employee-status/            # 员工状态与用工类型
│   └── compensation/               # 薪酬福利
├── offboarding/                    # 离职生命周期
└── ai-agent/                       # AI Agent 技能图谱
```

## 数据更新流程

1. 修改数据文件
2. 运行 Schema 验证：`python -m json.tool <file>`
3. 运行 SDK 测试确保向后兼容
4. 更新 `CHANGELOG.md`
