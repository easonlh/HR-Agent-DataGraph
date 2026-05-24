"""Data file loader with lazy caching and path resolution."""

from __future__ import annotations

import json
import os
from functools import lru_cache
from pathlib import Path
from typing import Any

_DATA_ROOT: Path | None = None


def _get_data_root() -> Path:
    """Resolve the data directory root.

    Resolution order:
    1. HR_AGENT_DATA_PATH environment variable
    2. <package_root>/../../data/ (relative to this file)
    """
    global _DATA_ROOT
    if _DATA_ROOT is not None:
        return _DATA_ROOT

    env_path = os.environ.get("HR_AGENT_DATA_PATH")
    if env_path:
        _DATA_ROOT = Path(env_path).resolve()
        return _DATA_ROOT

    _DATA_ROOT = (Path(__file__).resolve().parent.parent.parent.parent.parent / "data").resolve()
    return _DATA_ROOT


def _resolve_path(name: str) -> Path:
    """Resolve a dotted name to a data file path.

    Examples:
        "offboarding/taxonomy" -> data/offboarding/taxonomy.json
        "foundation/administrative-divisions/provinces" -> data/foundation/administrative-divisions/provinces.json
    """
    root = _get_data_root()
    if not name.endswith(".json"):
        name = f"{name}.json"
    path = root / name
    if not path.exists():
        raise FileNotFoundError(f"Data file not found: {path}")
    return path


@lru_cache(maxsize=64)
def load(name: str) -> dict[str, Any]:
    """Load and cache a data file by dotted name.

    Args:
        name: Dotted path relative to data/, e.g. "offboarding/taxonomy"

    Returns:
        Parsed JSON data as a dictionary.
    """
    path = _resolve_path(name)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def load_raw(name: str) -> str:
    """Load a data file as raw text.

    Args:
        name: Dotted path relative to data/

    Returns:
        Raw file content as string.
    """
    path = _resolve_path(name)
    return path.read_text(encoding="utf-8")


def list_data_files(directory: str = "") -> list[str]:
    """List available data files.

    Args:
        directory: Optional subdirectory to list, e.g. "offboarding"

    Returns:
        List of data file names (without .json extension).
    """
    root = _get_data_root() / directory if directory else _get_data_root()
    if not root.exists():
        return []
    return [
        str(p.relative_to(_get_data_root())).replace(".json", "")
        for p in root.rglob("*.json")
        if not p.name.startswith("_")
    ]
