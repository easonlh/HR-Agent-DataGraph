# HR-Agent-DataGraph

> **Chinese HRIS Standard Reference Dictionary & Metadata Engine**
> **中国HRIS标准参考字典与元数据引擎**

[![CI](https://github.com/hr-agent/datagraph/actions/workflows/ci.yml/badge.svg)](https://github.com/hr-agent/datagraph/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/pypi/v/hr-agent-datagraph)](https://pypi.org/project/hr-agent-datagraph/)
[![TypeScript](https://img.shields.io/npm/v/@hr-agent/datagraph)](https://www.npmjs.com/package/@hr-agent/datagraph)

---

## What Is This?

HR-Agent-DataGraph provides **standardized taxonomies, schemas, and lookup datasets** for Chinese HRIS/eHR development. It is designed for:

- **Enterprise HR software integration** — standard codes for employee status, offboarding reasons, compensation components, administrative divisions, and higher education institutions.
- **HR AI Agent automation** — structured skill graphs, capability evidence schemas, and document parsing specs that enable AI agents to reason about employee capabilities.
- **Compliance & audit** — offboarding taxonomies grounded in Chinese Labor Contract Law (《劳动合同法》), with article-level legal references.

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

We welcome contributions — new data domains, corrections to existing taxonomies, additional institution data, and SDK improvements. See [CONTRIBUTING.md](docs/contributing.md) for guidelines.

## License

[Apache License 2.0](LICENSE)
