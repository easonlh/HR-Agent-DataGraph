# HR-Agent-DataGraph

> **中国HRIS标准参考字典与元数据引擎**

[![CI](https://github.com/easonlh/HR-Agent-DataGraph/actions/workflows/ci.yml/badge.svg)](https://github.com/easonlh/HR-Agent-DataGraph/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/pypi/v/hr-agent-datagraph)](https://pypi.org/project/hr-agent-datagraph/)
[![TypeScript](https://img.shields.io/npm/v/@hr-agent/datagraph)](https://www.npmjs.com/package/@hr-agent/datagraph)

---

## 项目简介

HR-Agent-DataGraph 是一个面向 **HR AI Agent 开发者** 的学习与参考项目。它提供了中国人力资源领域的标准化数据字典和元数据框架，帮助 AI Agent 理解和处理 HR 业务逻辑。

如果你正在构建 HR 相关的 AI Agent —— 比如自动入职审核、智能离职分析、人才盘点、薪酬合规助手 —— 这个项目就是你需要的"领域知识库"。

### 适用场景

- **HR AI Agent 领域学习** — 理解中国 HR 业务的标准化数据结构，让 Agent 具备领域知识
- **企业 HR 软件集成** — 员工状态、离职原因、薪酬组件、行政区划、高校信息等标准编码
- **Agent 能力图谱** — 技能分类、行为证据（Git提交、会议记录、代码评审）到能力向量的映射
- **合规与审计** — 基于《劳动合同法》第36-50条的离职分类体系，逐条引用法律依据

> **这是一个开放的学习型项目，欢迎所有对 HR AI Agent 感兴趣的开发者一起参与建设！**

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

## 参与贡献

**PR 非常欢迎！** 无论你是 HR 领域专家还是 AI Agent 开发者，都可以参与贡献：

- **补充数据** — 添加更多高校、城市、行业分类等标准数据
- **修正分类** — 完善离职原因、薪酬组件等分类体系
- **扩展 SDK** — 增加查询函数、添加新语言的 SDK
- **完善文档** — 改进领域指南、补充法律引用
- **分享案例** — 如果你用这个项目构建了 HR Agent，欢迎分享你的实践

> 即使是小的改进也非常有价值 — 修正一个错别字、补充一条法律引用、添加一个离职原因分类，都是有意义的贡献。

## 许可证

[Apache License 2.0](LICENSE)
