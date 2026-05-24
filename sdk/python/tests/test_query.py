"""Tests for query helpers."""

from __future__ import annotations


def test_find_province_by_code():
    from hr_agent_datagraph.query import find_province

    result = find_province("11")
    assert result is not None
    assert result["name"]["zh"] == "北京市"


def test_find_province_by_name():
    from hr_agent_datagraph.query import find_province

    result = find_province("上海市")
    assert result is not None
    assert result["code"] == "31"


def test_find_province_not_found():
    from hr_agent_datagraph.query import find_province

    result = find_province("不存在")
    assert result is None


def test_find_institution_exact():
    from hr_agent_datagraph.query import find_institution

    results = find_institution("清华大学")
    assert len(results) == 1
    assert results[0]["code"] == "10003"


def test_find_institution_fuzzy():
    from hr_agent_datagraph.query import find_institution

    results = find_institution("大学", fuzzy=True)
    assert len(results) > 1


def test_find_offboarding_reason():
    from hr_agent_datagraph.query import find_offboarding_reason

    result = find_offboarding_reason("INCOMPETENCE")
    assert result is not None
    assert result["name"]["zh"] == "不能胜任工作，经培训或调岗仍不能胜任"
    assert result["terminationType"] == "INVOLUNTARY"


def test_find_offboarding_reason_not_found():
    from hr_agent_datagraph.query import find_offboarding_reason

    result = find_offboarding_reason("NONEXISTENT")
    assert result is None


def test_find_skill_dimension():
    from hr_agent_datagraph.query import find_skill_dimension

    result = find_skill_dimension("TECHNICAL")
    assert result is not None
    assert result["weight"] == 0.35


def test_find_status_transitions():
    from hr_agent_datagraph.query import find_status_transitions

    transitions = find_status_transitions("REGULAR")
    assert len(transitions) > 0
    triggers = [t["trigger"] for t in transitions]
    assert "RESIGNATION_SUBMITTED" in triggers
