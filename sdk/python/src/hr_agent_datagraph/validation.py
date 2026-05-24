"""JSON Schema validation for HR data files."""

from __future__ import annotations

from pathlib import Path
from typing import Any

try:
    import jsonschema
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False


class ValidationResult:
    """Result of a schema validation check."""

    def __init__(self, errors: list[str] | None = None):
        self.errors = errors or []

    @property
    def is_valid(self) -> bool:
        return len(self.errors) == 0

    def __repr__(self) -> str:
        if self.is_valid:
            return "ValidationResult(valid=True)"
        return f"ValidationResult(valid=False, errors={self.errors})"


def validate(data: dict[str, Any], schema_name: str) -> ValidationResult:
    """Validate data against a named schema.

    Args:
        data: The data to validate
        schema_name: Schema file name (without path), e.g. "offboarding-taxonomy"

    Returns:
        ValidationResult with any errors found.
    """
    if not HAS_JSONSCHEMA:
        return ValidationResult(["jsonschema package not installed. Install with: pip install jsonschema"])

    schema_root = Path(__file__).resolve().parent.parent.parent.parent.parent / "schemas"
    schema_path = schema_root / f"{schema_name}.schema.json"

    if not schema_path.exists():
        return ValidationResult([f"Schema not found: {schema_path}"])

    import json
    with open(schema_path, encoding="utf-8") as f:
        schema = json.load(f)

    errors = []
    try:
        jsonschema.validate(instance=data, schema=schema)
    except jsonschema.ValidationError as e:
        errors.append(f"{'.'.join(str(p) for p in e.absolute_path) or '<root>'}: {e.message}")
    except jsonschema.SchemaError as e:
        errors.append(f"Schema error: {e.message}")

    return ValidationResult(errors)
