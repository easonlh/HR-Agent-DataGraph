/**
 * High-level lookup helpers for common queries.
 */

import { load } from "./loader.js";
import type {
  AdministrativeDivision,
  Institution,
  TerminationType,
  SkillDimension,
  StatusTransition,
} from "./types.js";

/**
 * Find a province by code or Chinese name.
 */
export function findProvince(codeOrName: string): AdministrativeDivision | undefined {
  const data = load<{ divisions: AdministrativeDivision[] } & Record<string, unknown>>(
    "foundation/administrative-divisions/provinces"
  );
  return data.divisions.find(
    (d: AdministrativeDivision) =>
      d.code === codeOrName ||
      d.name.zh === codeOrName ||
      d.shortName?.zh === codeOrName
  );
}

/**
 * Find institutions by name.
 */
export function findInstitution(
  name: string,
  fuzzy = false
): Institution[] {
  const data = load<{ institutions: Institution[] } & Record<string, unknown>>(
    "foundation/higher-education/institutions"
  );
  return data.institutions.filter((inst: Institution) => {
    const zhName = inst.name.zh;
    return fuzzy ? zhName.includes(name) : zhName === name;
  });
}

/**
 * Find an offboarding reason by code.
 */
export function findOffboardingReason(
  reasonCode: string
): (Record<string, unknown> & { terminationType: string; subtype: string }) | undefined {
  const data = load<{ terminationTypes: TerminationType[] } & Record<string, unknown>>(
    "offboarding/taxonomy"
  );
  for (const ttype of data.terminationTypes) {
    for (const subtype of ttype.subtypes ?? []) {
      for (const reason of subtype.reasons ?? []) {
        if (reason.code === reasonCode) {
          return {
            ...reason,
            terminationType: ttype.code,
            subtype: subtype.code,
          } as Record<string, unknown> & { terminationType: string; subtype: string };
        }
      }
    }
  }
  return undefined;
}

/**
 * Find a skill dimension by code.
 */
export function findSkillDimension(
  dimensionCode: string
): SkillDimension | undefined {
  const data = load<{ skillTaxonomy: { dimensions: SkillDimension[] } } & Record<string, unknown>>(
    "ai-agent/skill-graph"
  );
  return data.skillTaxonomy.dimensions.find((d: SkillDimension) => d.code === dimensionCode);
}

/**
 * Find all valid transitions from a given status.
 */
export function findStatusTransitions(
  statusCode: string
): StatusTransition[] {
  const data = load<{ validTransitions: StatusTransition[] } & Record<string, unknown>>(
    "core-hr/employee-status/status-mapping"
  );
  return data.validTransitions.filter((t: StatusTransition) => t.from === statusCode);
}
