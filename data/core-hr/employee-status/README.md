# 员工状态与用工类型

## 员工生命周期

员工状态遵循有限状态机模型，从入职到离职的完整生命周期：

```
入职申请 → 待入职 → 在职 → (异动) → 离职中 → 已离职
              ↓        ↓
           已取消    停薪留职/长期休假
```

## 数据文件

| 文件 | 说明 |
|------|------|
| `status-mapping.json` | 员工全生命周期状态定义与合法转换规则 |
| `employment-types.json` | 用工关系类型（正式/实习/劳务/外包/退休返聘等） |
| `transfer-reasons.json` | 异动类型与原因（调动/晋升/降职/借调/轮岗） |

## 与 eHR 系统的映射

- `on_job` 字段（1/0）映射到状态机的"在职"/"非在职"
- `labor_rel_type_code` 映射到 `employment-types.json` 中的编码
- `action_name`/`action_type_name` 映射到 `transfer-reasons.json` 中的编码
