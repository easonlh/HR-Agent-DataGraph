"""Tests for the data loader."""

from __future__ import annotations

import json

import pytest


def test_load_offboarding_taxonomy():
    from hr_agent_datagraph.loader import load

    data = load("offboarding/taxonomy")
    assert "metadata" in data
    assert "terminationTypes" in data
    assert data["metadata"]["version"] == "0.1.0"


def test_load_skill_graph():
    from hr_agent_datagraph.loader import load

    data = load("ai-agent/skill-graph")
    assert "metadata" in data
    assert "skillTaxonomy" in data
    assert "evidenceTypes" in data


def test_load_provinces():
    from hr_agent_datagraph.loader import load

    data = load("foundation/administrative-divisions/provinces")
    assert "divisions" in data
    assert len(data["divisions"]) == 34


def test_load_not_found():
    from hr_agent_datagraph.loader import load

    with pytest.raises(FileNotFoundError):
        load("nonexistent/data")


def test_list_data_files():
    from hr_agent_datagraph.loader import list_data_files

    files = list_data_files()
    assert len(files) > 0
    assert "offboarding/taxonomy" in files


def test_load_raw():
    from hr_agent_datagraph.loader import load_raw

    raw = load_raw("offboarding/taxonomy")
    data = json.loads(raw)
    assert "metadata" in data
