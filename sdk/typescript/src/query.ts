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
  GlossaryTerm,
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
 * Find institutions by category (e.g. "985/211", "QS200", "大专").
 */
export function findInstitutionsByCategory(
  category: string
): Institution[] {
  const data = load<{ institutions: Institution[] } & Record<string, unknown>>(
    "foundation/higher-education/institutions"
  );
  return data.institutions.filter(
    (inst: Institution) => inst.category.zh === category
  );
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

/**
 * Find a glossary term by name.
 */
export function findGlossaryTerm(term: string): GlossaryTerm | undefined {
  const data = load<{ terms: GlossaryTerm[] } & Record<string, unknown>>(
    "core-hr/glossary"
  );
  return data.terms.find((t: GlossaryTerm) => t.term === term);
}

/**
 * Search glossary terms by keyword in term name or definition.
 */
export function searchGlossary(keyword: string): GlossaryTerm[] {
  const data = load<{ terms: GlossaryTerm[] } & Record<string, unknown>>(
    "core-hr/glossary"
  );
  return data.terms.filter(
    (t: GlossaryTerm) =>
      (t.term?.includes(keyword)) || (t.definition?.includes(keyword))
  );
}

interface ContractRule {
  employeeCategory: { zh: string; en: string };
  contractType: { zh: string; en: string };
  rule: string;
  example?: string;
  lastUpdated?: string;
  note?: { zh: string; en: string };
}

interface SigningType {
  code: string;
  name: { zh: string; en: string };
  rules: ContractRule[];
}

interface ContractRuleResult extends ContractRule {
  signingType: string;
  signingTypeName: { zh: string; en: string };
}

/**
 * Find contract end date rules by signing type and/or employee category.
 */
export function findContractRules(
  signingType?: string,
  employeeCategory?: string
): ContractRuleResult[] {
  const data = load<{ signingTypes: SigningType[] } & Record<string, unknown>>(
    "core-hr/contract-end-date-rules"
  );
  const results: ContractRuleResult[] = [];
  for (const stype of data.signingTypes) {
    if (signingType && stype.code !== signingType) continue;
    for (const rule of stype.rules) {
      if (employeeCategory && rule.employeeCategory.zh !== employeeCategory) continue;
      results.push({
        ...rule,
        signingType: stype.code,
        signingTypeName: stype.name,
      });
    }
  }
  return results;
}
