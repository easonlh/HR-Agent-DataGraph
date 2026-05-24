# HR-Agent-DataGraph

> **Chinese HRIS Standard Reference Dictionary & Metadata Engine**
> **中国HRIS标准参考字典与元数据引擎**

[![CI](https://github.com/easonlh/HR-Agent-DataGraph/actions/workflows/ci.yml/badge.svg)](https://github.com/easonlh/HR-Agent-DataGraph/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/pypi/v/hr-agent-datagraph)](https://pypi.org/project/hr-agent-datagraph/)
[![TypeScript](https://img.shields.io/npm/v/@hr-agent/datagraph)](https://www.npmjs.com/package/@hr-agent/datagraph)

---

## What Is This?

HR-Agent-DataGraph 是一个面向 **HR AI Agent 开发者** 的学习与参考项目。它提供了中国人力资源领域的标准化数据字典和元数据框架，帮助 AI Agent 理解和处理 HR 业务逻辑。

如果你正在构建 HR 相关的 AI Agent —— 比如自动入职审核、智能离职分析、人才盘点、薪酬合规助手 —— 这个项目就是你需要的"领域知识库"。

### 适用场景

- **HR AI Agent 领域学习** — 理解中国 HR 业务的标准化数据结构，让 Agent 具备领域知识
- **企业 HR 软件集成** — 员工状态、离职原因、薪酬组件、行政区划、高校信息等标准编码
- **Agent 能力图谱** — 技能分类、行为证据（Git提交、会议记录、代码评审）到能力向量的映射
- **合规与审计** — 基于《劳动合同法》第36-50条的离职分类体系，逐条引用法律依据

> **这是一个开放的学习型项目，欢迎所有对 HR AI Agent 感兴趣的开发者一起参与建设！**

## Quick Start

### Python

```python
pip install hr-agent-datagraph
```

```python
from hr_agent_datagraph import load, query

# Load the offboarding taxonomy
taxonomy = load("offboarding/taxonomy")

# Look up a termination reason
reason = query.find_offboarding_reason("INCOMPETENCE")
print(reason["name"]["zh"])  # 不能胜任工作，经培训或调岗仍不能胜任

# Load administrative divisions
provinces = load("foundation/administrative-divisions/provinces")
beijing = query.find_province("11")
print(beijing["name"]["zh"])  # 北京市
```

### TypeScript

```bash
npm install @hr-agent/datagraph
```

```typescript
import { load, query } from "@hr-agent/datagraph";

// Load the skill graph
const skillGraph = await load("ai-agent/skill-graph");

// Look up a skill dimension
const technical = query.findSkillDimension("TECHNICAL");
console.log(technical?.name.zh); // 技术能力
```

## Data Domains

| Domain | Path | Description |
|--------|------|-------------|
| **Offboarding Taxonomy** | `data/offboarding/` | 离职类型与原因标准分类体系 — covers voluntary, involuntary, mutual separation, contract expiry, retirement. Grounded in Labor Contract Law Articles 36-50. |
| **AI Agent Skill Graph** | `data/ai-agent/` | AI Agent技能图谱与能力证据映射 — skill taxonomy, evidence types (Git, meetings, code reviews, OCR), capability vectors. |
| **Administrative Divisions** | `data/foundation/administrative-divisions/` | 行政区划标准编码 — provinces, cities, districts with GB/T 2260 codes. |
| **Higher Education** | `data/foundation/higher-education/` | 高校与学历标准 — institution lookup, degree hierarchy, 985/211/双一流 classification. |
| **Employee Lifecycle** | `data/core-hr/employee-status/` | 员工状态与用工类型 — status lifecycle, employment types, transfer reasons. |
| **Compensation** | `data/core-hr/compensation/` | 薪酬组件与法定福利 — salary components, 五险一金 structure, statutory rates. |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Consumer Apps                      │
│          (HRIS, AI Agents, Analytics)                │
├──────────────────┬──────────────────────────────────┤
│   Python SDK     │        TypeScript SDK             │
│   loader/types   │        loader/types               │
│   query/validation│       query/validation            │
├──────────────────┴──────────────────────────────────┤
│               JSON Data + JSON Schemas               │
│  data/                          schemas/             │
│  ├── offboarding/               ├── _meta/           │
│  ├── ai-agent/                  ├── offboarding-*    │
│  ├── core-hr/                   ├── skill-graph-*    │
│  └── foundation/                └── ...              │
└─────────────────────────────────────────────────────┘
```

## Project Structure

```
HR-Agent-DataGraph/
├── data/           # JSON/YAML standard reference data
├── schemas/        # JSON Schema validation files
├── sdk/
│   ├── python/     # Python SDK (hr-agent-datagraph)
│   └── typescript/ # TypeScript SDK (@hr-agent/datagraph)
├── docs/           # Documentation (domain guides, architecture)
├── README.md       # This file
├── README.zh.md    # 中文版 README
└── LICENSE         # Apache 2.0
```

## Documentation

- [Getting Started](docs/getting-started.md) — Install and first steps
- [Domain Guides](docs/domain-guides/) — Business logic behind each data domain
- [Architecture](docs/architecture.md) — System design and extension patterns
- [Contributing](docs/contributing.md) — How to add domains and data
- [Data Dictionary](docs/data-dictionary.md) — Field-level reference

## Contributing

**PR 非常欢迎！** 无论你是 HR 领域专家还是 AI Agent 开发者，都可以参与贡献：

- **补充数据** — 添加更多高校、城市、行业分类等标准数据
- **修正分类** — 完善离职原因、薪酬组件等分类体系
- **扩展 SDK** — 增加查询函数、添加新语言的 SDK
- **完善文档** — 改进领域指南、补充法律引用
- **分享案例** — 如果你用这个项目构建了 HR Agent，欢迎分享你的实践

> 即使是小的改进也非常有价值 — 修正一个错别字、补充一条法律引用、添加一个离职原因分类，都是有意义的贡献。

See [CONTRIBUTING.md](docs/contributing.md) for guidelines.

## License

[Apache License 2.0](LICENSE)
