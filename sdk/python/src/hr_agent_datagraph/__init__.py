"""HR-Agent-DataGraph: Chinese HRIS Standard Reference Dictionary & Metadata Engine."""

from hr_agent_datagraph.loader import load, load_raw
from hr_agent_datagraph.query import (
    find_contract_rules,
    find_glossary_term,
    find_institution,
    find_offboarding_reason,
    find_province,
    find_skill_dimension,
    find_status_transitions,
    search_glossary,
)
from hr_agent_datagraph.validation import validate

__all__ = [
    "load",
    "load_raw",
    "validate",
    "find_province",
    "find_institution",
    "find_offboarding_reason",
    "find_skill_dimension",
    "find_status_transitions",
    "find_glossary_term",
    "search_glossary",
    "find_contract_rules",
]
