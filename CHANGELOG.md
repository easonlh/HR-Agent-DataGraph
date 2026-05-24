# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-24

### Added

- Initial project structure and scaffolding.
- **Data - Offboarding Taxonomy** (`data/offboarding/taxonomy.json`): Comprehensive termination type and reason classification covering voluntary resignation, involuntary termination (with/without cause), mutual agreement, contract expiry, and retirement — grounded in Chinese Labor Contract Law (Articles 36-50).
- **Data - AI Agent Skill Graph** (`data/ai-agent/skill-graph.json`): Standardized skill taxonomy, evidence type definitions (Git commits, meeting logs, code reviews, OCR documents), inference rules, and capability vector schema for HR AI Agent automation.
- **Data - Administrative Divisions** (`data/foundation/administrative-divisions/`): Province and city lookup with GB/T 2260 standard codes.
- **Data - Higher Education** (`data/foundation/higher-education/`): Institution samples, degree type hierarchy.
- **Data - Core HR** (`data/core-hr/`): Employee status lifecycle mapping, employment types, transfer reasons, compensation components, statutory benefits structure.
- **Data - Severance Rules** (`data/offboarding/severance-rules.json`): N, N+1, 2N severance calculation rules.
- **Data - Document Parsing Spec** (`data/ai-agent/document-parsing-spec.json`): OCR document parsing input specifications.
- **JSON Schemas** (`schemas/`): Validation schemas for all data domains, with shared common definitions.
- **Python SDK** (`sdk/python/`): Data loader, TypedDict types, query helpers, schema validation wrapper.
- **TypeScript SDK** (`sdk/typescript/`): ESM-first data loader, TypeScript interfaces, query helpers, validation.
- **Documentation** (`docs/`): Getting started guide, domain guides, architecture overview, contributing guide.
- **GitHub Configuration**: CI workflow, issue templates, PR template, CODEOWNERS.
