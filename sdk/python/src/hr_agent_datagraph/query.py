"""High-level lookup helpers for common queries."""

from __future__ import annotations

from typing import Any

from hr_agent_datagraph.loader import load


def find_province(code_or_name: str) -> dict[str, Any] | None:
    """Find a province by code or Chinese name.

    Args:
        code_or_name: Province code (e.g. "11") or name (e.g. "北京市")

    Returns:
        Province data dict, or None if not found.
    """
    data = load("foundation/administrative-divisions/provinces")
    for div in data.get("divisions", []):
        if div["code"] == code_or_name:
            return div
        if div.get("name", {}).get("zh") == code_or_name:
            return div
        if div.get("shortName", {}).get("zh") == code_or_name:
            return div
    return None


def find_institution(name: str, fuzzy: bool = False) -> list[dict[str, Any]]:
    """Find institutions by name.

    Args:
        name: Institution name (Chinese)
        fuzzy: If True, match partial names

    Returns:
        List of matching institution dicts.
    """
    data = load("foundation/higher-education/institutions")
    results = []
    for inst in data.get("institutions", []):
        zh_name = inst.get("name", {}).get("zh", "")
        if (fuzzy and name in zh_name) or zh_name == name:
            results.append(inst)
    return results


def find_offboarding_reason(reason_code: str) -> dict[str, Any] | None:
    """Find an offboarding reason by code across all termination types.

    Args:
        reason_code: Reason code (e.g. "INCOMPETENCE")

    Returns:
        Reason data dict with parent context, or None if not found.
    """
    data = load("offboarding/taxonomy")
    for ttype in data.get("terminationTypes", []):
        for subtype in ttype.get("subtypes", []):
            for reason in subtype.get("reasons", []):
                if reason["code"] == reason_code:
                    return {
                        **reason,
                        "terminationType": ttype["code"],
                        "subtype": subtype["code"],
                    }
    return None


def find_skill_dimension(dimension_code: str) -> dict[str, Any] | None:
    """Find a skill dimension by code.

    Args:
        dimension_code: Dimension code (e.g. "TECHNICAL")

    Returns:
        Dimension data dict, or None if not found.
    """
    data = load("ai-agent/skill-graph")
    for dim in data.get("skillTaxonomy", {}).get("dimensions", []):
        if dim["code"] == dimension_code:
            return dim
    return None


def find_status_transitions(status_code: str) -> list[dict[str, Any]]:
    """Find all valid transitions from a given status.

    Args:
        status_code: Status code (e.g. "REGULAR")

    Returns:
        List of transition dicts with 'to' and 'trigger' keys.
    """
    data = load("core-hr/employee-status/status-mapping")
    return [
        t for t in data.get("validTransitions", [])
        if t["from"] == status_code
    ]
