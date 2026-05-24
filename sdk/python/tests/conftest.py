"""Pytest configuration and fixtures."""

from __future__ import annotations

import sys
from pathlib import Path

# Add src to path for imports
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))


import pytest


@pytest.fixture
def sample_taxonomy() -> dict:
    """Load the offboarding taxonomy data."""
    from hr_agent_datagraph.loader import load
    return load("offboarding/taxonomy")


@pytest.fixture
def sample_skill_graph() -> dict:
    """Load the skill graph data."""
    from hr_agent_datagraph.loader import load
    return load("ai-agent/skill-graph")
