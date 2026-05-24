# HR-Agent-DataGraph

> **中国HRIS标准参考字典与元数据引擎**

[![CI](https://github.com/hr-agent/datagraph/actions/workflows/ci.yml/badge.svg)](https://github.com/hr-agent/datagraph/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/pypi/v/hr-agent-datagraph)](https://pypi.org/project/hr-agent-datagraph/)
[![TypeScript](https://img.shields.io/npm/v/@hr-agent/datagraph)](https://www.npmjs.com/package/@hr-agent/datagraph)

---

## 项目简介

HR-Agent-DataGraph 为中国人资系统（HRIS/eHR）开发提供**标准化分类体系、数据字典与查询引擎**。适用于：

- **企业HR软件集成** — 员工状态、离职原因、薪酬组件、行政区划、高校信息等标准编码。
- **HR AI Agent自动化** — 结构化技能图谱、能力证据数据结构、证件解析规范，赋能AI Agent进行人才分析。
- **合规与审计** — 离职分类体系基于《劳动合同法》第36-50条，逐条引用法律依据。

## 快速开始

### Python

```bash
pip install hr-agent-datagraph
```

```python
from hr_agent_datagraph import load, query

# 加载离职分类体系
taxonomy = load("offboarding/taxonomy")

# 查询离职原因
reason = query.find_offboarding_reason("INCOMPETENCE")
print(reason["name"]["zh"])  # 不能胜任工作，经培训或调岗仍不能胜任
```

### TypeScript

```bash
npm install @hr-agent/datagraph
```

```typescript
import { load, query } from "@hr-agent/datagraph";

const skillGraph = await load("ai-agent/skill-graph");
const technical = query.findSkillDimension("TECHNICAL");
console.log(technical?.name.zh); // 技术能力
```

## 数据域总览

| 数据域 | 路径 | 说明 |
|--------|------|------|
| **离职分类体系** | `data/offboarding/` | 覆盖主动离职、被动离职、协商解除、合同到期、退休等全部场景，依据《劳动合同法》第36-50条。 |
| **AI Agent技能图谱** | `data/ai-agent/` | 技能分类、证据类型（Git提交、会议记录、代码评审、OCR证件）、能力向量标准。 |
| **行政区划** | `data/foundation/administrative-divisions/` | 省市区标准编码，基于GB/T 2260。 |
| **高校信息** | `data/foundation/higher-education/` | 高校查询、学历学位层级、985/211/双一流分类。 |
| **员工生命周期** | `data/core-hr/employee-status/` | 员工状态、用工关系类型、异动原因。 |
| **薪酬福利** | `data/core-hr/compensation/` | 薪酬组件、五险一金结构、法定费率。 |

## 目录结构

```
HR-Agent-DataGraph/
├── data/           # JSON/YAML 标准参考数据
├── schemas/        # JSON Schema 验证文件
├── sdk/
│   ├── python/     # Python SDK (hr-agent-datagraph)
│   └── typescript/ # TypeScript SDK (@hr-agent/datagraph)
├── docs/           # 文档（领域指南、架构设计）
└── LICENSE         # Apache 2.0
```

## 文档

- [快速开始](docs/getting-started.md)
- [领域指南](docs/domain-guides/)
- [架构设计](docs/architecture.md)
- [贡献指南](docs/contributing.md)

## 许可证

[Apache License 2.0](LICENSE)
