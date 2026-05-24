# 架构设计

## 总体架构

```
┌─────────────────────────────────────────────────────┐
│                   消费方应用                          │
│          (HRIS, AI Agent, 数据分析)                   │
├──────────────────┬──────────────────────────────────┤
│   Python SDK     │        TypeScript SDK             │
│   loader/types   │        loader/types               │
│   query/validation│       query/validation            │
├──────────────────┴──────────────────────────────────┤
│               JSON 数据 + JSON Schema                 │
│  data/                          schemas/             │
│  ├── offboarding/               ├── _meta/           │
│  ├── ai-agent/                  ├── offboarding-*    │
│  ├── core-hr/                   ├── skill-graph-*    │
│  └── foundation/                └── ...              │
└─────────────────────────────────────────────────────┘
```

## 设计原则

### 1. 数据与代码分离

所有标准参考数据以 JSON 文件存储，SDK 仅提供加载和查询能力。数据文件可以独立于 SDK 更新。

### 2. 双语优先

所有面向用户的文本字段均包含中英文（`{ zh, en }`），适配中国企业级应用场景。

### 3. Schema 驱动

每个数据文件都有对应的 JSON Schema，确保数据结构的可验证性和一致性。

### 4. 零重依赖

SDK 设计为轻量级，核心功能零运行时依赖（Python SDK 仅依赖 `jsonschema`）。

## 扩展模式

### 添加新数据域

1. 在 `data/` 下创建新目录
2. 创建 JSON 数据文件，遵循双语字符串约定
3. 在 `schemas/` 下创建对应的 JSON Schema
4. 在 SDK 的 `types.py`/`types.ts` 中添加类型定义
5. 在 SDK 的 `query.py`/`query.ts` 中添加查询函数

### 自定义数据覆盖

通过设置 `HR_AGENT_DATA_PATH` 环境变量，可以将数据目录指向自定义位置，实现：
- 企业内部数据的私有化部署
- 数据文件的增量覆盖
- 多租户场景下的数据隔离

## 数据流

```
1. SDK 初始化时定位 data/ 目录
2. 首次调用 load() 时从磁盘读取 JSON 文件
3. 数据缓存在内存中（LRU / Map）
4. query.* 函数基于缓存数据执行查找
5. validate() 函数使用 JSON Schema 校验外部数据
```
