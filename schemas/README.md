# JSON Schema 文件说明

本目录包含所有数据文件的 JSON Schema 验证定义。

## 共享定义

`_meta/common.schema.json` 定义了所有 Schema 共用的类型：

| 类型 | 说明 |
|------|------|
| `BilingualString` | `{ zh, en }` 双语字符串 |
| `ISODate` | ISO 8601 日期（`YYYY-MM-DD`） |
| `AdminDivisionCode` | 行政区划代码（GB/T 2260） |
| `UpperCaseCode` | 标准编码（大写字母+数字+下划线） |
| `Metadata` | 数据文件通用元数据块（版本、更新日期、描述） |
| `ConfidenceScore` | 0-1 置信度得分 |

## Schema 列表

| Schema 文件 | 验证目标 |
|-------------|---------|
| `offboarding-taxonomy.schema.json` | `data/offboarding/taxonomy.json` |
| `skill-graph.schema.json` | `data/ai-agent/skill-graph.json` |
| `administrative-division.schema.json` | `data/foundation/administrative-divisions/*.json` |
| `employee-status.schema.json` | `data/core-hr/employee-status/*.json` |
| `compensation.schema.json` | `data/core-hr/compensation/*.json` |

## 版本兼容

- Schema 使用 JSON Schema Draft 2020-12
- 数据文件通过 `$schema` 字段引用对应的 Schema
- Schema 变更遵循语义化版本：新增可选字段为 minor 变更，修改或移弃字段为 major 变更
