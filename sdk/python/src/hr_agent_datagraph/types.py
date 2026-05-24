"""TypedDict definitions for all HR data domains."""

from __future__ import annotations

from typing import TypedDict


class BilingualString(TypedDict):
    """双语字符串。"""
    zh: str
    en: str


class Metadata(TypedDict, total=False):
    """数据文件通用元数据。"""
    version: str
    lastUpdated: str
    description: BilingualString
    source: str
    deprecated: bool


class AdministrativeDivision(TypedDict):
    """行政区划条目。"""
    code: str
    name: BilingualString
    shortName: BilingualString
    type: str


class City(TypedDict):
    """地级行政区划条目。"""
    code: str
    provinceCode: str
    name: BilingualString
    type: str


class Institution(TypedDict):
    """高校条目。"""
    code: str
    name: BilingualString
    province: str
    city: str
    tier: list[str]
    type: str


class DegreeType(TypedDict):
    """学历学位层级。"""
    code: str
    name: BilingualString
    level: int
    category: str
    description: BilingualString
    durationYears: float
    academicDegree: str


class TerminationReason(TypedDict, total=False):
    """离职原因。"""
    code: str
    name: BilingualString
    category: str
    legalReference: str
    documentationRequired: list[str]
    exitInterviewRecommended: bool
    retentionRiskFlag: bool


class TerminationSubtype(TypedDict, total=False):
    """离职子类型。"""
    code: str
    name: BilingualString
    noticePeriodDays: int
    requiresApproval: bool
    severanceApplicable: bool
    severanceFormula: str
    legalReference: str
    approvalChain: list[str]
    reasons: list[TerminationReason]


class TerminationType(TypedDict):
    """离职主类型。"""
    code: str
    name: BilingualString
    description: BilingualString
    legalReference: str
    subtypes: list[TerminationSubtype]


class SkillDimension(TypedDict):
    """技能维度。"""
    code: str
    name: BilingualString
    weight: float


class CapabilityVector(TypedDict):
    """员工能力向量。"""
    employeeId: str
    snapshotDate: str
    vector: dict[str, float]
    skillScores: list[dict[str, Any]]
    evidenceTrail: list[dict[str, Any]]


class EmployeeStatus(TypedDict):
    """员工状态。"""
    code: str
    name: BilingualString
    category: str
    isActive: bool


class StatusTransition(TypedDict):
    """状态转换规则。"""
    from_: str
    to: str
    trigger: str


class EmploymentType(TypedDict, total=False):
    """用工关系类型。"""
    code: str
    name: BilingualString
    laborContractType: str
    socialInsuranceRequired: bool
    description: BilingualString
    legalReference: str


class CompensationComponent(TypedDict, total=False):
    """薪酬组件。"""
    code: str
    name: BilingualString
    category: str
    payFrequency: str
    description: BilingualString
    legalReference: str


class GlossaryTerm(TypedDict, total=False):
    """名词解释条目。"""
    term: str
    definition: str
    roundingRule: str
    example: str
    dataDefinition: str
    dataRule: str
    rehireRule: str


# Re-export Any for downstream use
from typing import Any  # noqa: E402
