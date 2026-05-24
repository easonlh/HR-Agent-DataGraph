# 快速入门

## 安装

### Python

```bash
pip install hr-agent-datagraph
```

### TypeScript

```bash
npm install @hr-agent/datagraph
```

## 基本使用

### Python

```python
from hr_agent_datagraph import load, query, validate

# 加载离职分类体系
taxonomy = load("offboarding/taxonomy")
print(taxonomy["metadata"]["description"]["zh"])
# 离职类型与原因标准分类体系

# 查询离职原因
reason = query.find_offboarding_reason("INCOMPETENCE")
print(reason["name"]["zh"])
# 不能胜任工作，经培训或调岗仍不能胜任
print(reason["legalReference"])
# 劳动合同法 第40条第2项

# 查询行政区划
beijing = query.find_province("11")
print(beijing["name"]["zh"])
# 北京市

# 查询高校
tsinghua = query.find_institution("清华大学")
print(tsinghua[0]["tier"])
# ['985', '211', '双一流']

# 查询状态转换
transitions = query.find_status_transitions("REGULAR")
for t in transitions:
    print(f"  REGULAR -> {t['to']} ({t['trigger']})")

# 验证数据
result = validate(taxonomy, "offboarding-taxonomy")
print(result.is_valid)
# True
```

### TypeScript

```typescript
import { load, findProvince, findOffboardingReason } from "@hr-agent/datagraph";

// 加载技能图谱
const skillGraph = load("ai-agent/skill-graph");
console.log(skillGraph.metadata.description?.zh);
// AI Agent技能图谱与能力证据映射

// 查询行政区划
const beijing = findProvince("11");
console.log(beijing?.name.zh);
// 北京市

// 查询离职原因
const reason = findOffboardingReason("INCOMPETENCE");
console.log(reason?.name.zh);
// 不能胜任工作，经培训或调岗仍不能胜任
```

## 数据文件列表

| 数据路径 | 说明 |
|---------|------|
| `offboarding/taxonomy` | 离职分类体系 |
| `offboarding/severance-rules` | 经济补偿金规则 |
| `ai-agent/skill-graph` | AI Agent技能图谱 |
| `ai-agent/document-parsing-spec` | OCR证件解析规范 |
| `foundation/administrative-divisions/provinces` | 省级行政区划 |
| `foundation/administrative-divisions/cities` | 地级市（样本） |
| `foundation/higher-education/institutions` | 高校（样本） |
| `foundation/higher-education/degree-types` | 学历学位层级 |
| `core-hr/employee-status/status-mapping` | 员工状态映射 |
| `core-hr/employee-status/employment-types` | 用工关系类型 |
| `core-hr/employee-status/transfer-reasons` | 异动原因分类 |
| `core-hr/compensation/components` | 薪酬组件 |
| `core-hr/compensation/statutory-components` | 法定福利结构 |

## 环境变量

| 变量 | 说明 |
|------|------|
| `HR_AGENT_DATA_PATH` | 自定义数据目录路径（覆盖默认的 `data/` 目录） |
