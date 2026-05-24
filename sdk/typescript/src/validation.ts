/**
 * JSON Schema validation for HR data files.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate data against a named schema.
 * Note: For full validation, install `ajv` as a peer dependency.
 *
 * @param data - The data to validate
 * @param schemaName - Schema name (without path), e.g. "offboarding-taxonomy"
 * @returns ValidationResult with any errors found
 */
export function validate(data: unknown, schemaName: string): ValidationResult {
  const schemaRoot = resolve(__dirname, "../../../schemas");
  const schemaPath = join(schemaRoot, `${schemaName}.schema.json`);

  if (!existsSync(schemaPath)) {
    return { valid: false, errors: [`Schema not found: ${schemaPath}`] };
  }

  // Basic structural validation (full validation requires ajv)
  try {
    const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
    const errors: string[] = [];

    if (schema.required && typeof data === "object" && data !== null) {
      for (const field of schema.required) {
        if (!(field in (data as Record<string, unknown>))) {
          errors.push(`Missing required field: ${field}`);
        }
      }
    }

    return { valid: errors.length === 0, errors };
  } catch (err) {
    return {
      valid: false,
      errors: [`Validation error: ${err instanceof Error ? err.message : String(err)}`],
    };
  }
}
