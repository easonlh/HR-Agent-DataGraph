# AI Agent 技能图谱领域指南

## 概述

AI Agent 技能图谱定义了如何将员工的行为数据（代码提交、会议记录、代码评审等）转化为标准化的能力向量，供 AI Agent 进行人才分析。

## 技能分类体系

### 四大维度

| 维度 | 权重 | 说明 |
|------|------|------|
| TECHNICAL（技术能力） | 35% | 编程语言、技术领域 |
| LEADERSHIP（领导力） | 25% | 人员管理、战略思维 |
| COMMUNICATION（沟通协作） | 20% | 书面表达、人际沟通 |
| DOMAIN_EXPERTISE（业务领域） | 20% | 行业知识、产品思维 |

## 证据类型

### GIT_COMMIT（代码提交）

- 置信度权重：0.7
- 推断规则：文件后缀 → 编程语言技能
- 推断规则：提交信息关键词 → 技术领域能力

### MEETING_LOG（会议记录）

- 置信度权重：0.5
- 推断规则：组织者角色 → 领导力/协调能力
- 推断规则：会议主题关键词 → 领域专长

### CODE_REVIEW（代码评审）

- 置信度权重：0.8
- 推断规则：评审活跃度 → 技术深度

### OCR_DOCUMENT（证件解析）

- 置信度权重：0.95
- 用途：入职证件的自动识别与校验
- 关联数据：高校名称校验、离职类型映射

## 能力向量格式

```json
{
  "employeeId": "EMP001",
  "snapshotDate": "2026-05-24",
  "vector": {
    "TECHNICAL": 0.85,
    "LEADERSHIP": 0.60,
    "COMMUNICATION": 0.70,
    "DOMAIN_EXPERTISE": 0.55
  },
  "skillScores": [
    {
      "skillCode": "PYTHON",
      "score": 0.90,
      "confidence": 0.85,
      "evidenceCount": 42,
      "trend": "IMPROVING"
    }
  ]
}
```

## 数据流水线

```
INGEST → EXTRACT → AGGREGATE → OUTPUT
```

1. **INGEST**：从 Git、会议系统、代码评审平台采集原始数据
2. **EXTRACT**：应用推理规则，从原始数据中提取技能信号
3. **AGGREGATE**：多源信号加权聚合，计算置信度
4. **OUTPUT**：生成标准化能力向量
