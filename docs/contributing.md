# 贡献指南

## 如何贡献

### 修正数据

1. Fork 本仓库
2. 修改对应的 JSON 数据文件
3. 确保通过 Schema 验证
4. 提交 Pull Request，说明修正原因

### 添加新数据域

1. 提交 Issue 说明新数据域的业务背景
2. 在 `data/` 下创建新目录和数据文件
3. 在 `schemas/` 下创建对应的 JSON Schema
4. 更新 SDK 的类型定义和查询函数
5. 编写领域文档（`docs/domain-guides/`）

### 数据质量检查清单

- [ ] 所有字符串字段包含中英文
- [ ] 编码使用 `UPPER_SNAKE_CASE`
- [ ] 枚举值包含 `OTHER` 兜底选项
- [ ] 日期格式为 ISO 8601
- [ ] 法律引用准确到条款
- [ ] 通过 JSON Schema 验证

## 提交规范

- `feat(data): 添加XX数据域` — 新增数据域
- `fix(data): 修正XX数据` — 数据修正
- `feat(sdk): 添加XX查询函数` — SDK 功能
- `docs: 更新XX文档` — 文档更新
