/** Type definitions for all HR data domains. */

export interface BilingualString {
  zh: string;
  en: string;
}

export interface Metadata {
  version: string;
  lastUpdated: string;
  description?: BilingualString;
  source?: string;
  deprecated?: boolean;
}

export interface AdministrativeDivision {
  code: string;
  name: BilingualString;
  shortName?: BilingualString;
  type: string;
}

export interface City {
  code: string;
  provinceCode: string;
  name: BilingualString;
  type: string;
}

export interface Institution {
  code: string;
  name: BilingualString;
  province: string;
  city?: string;
  tier?: string[];
  type?: string;
}

export interface DegreeType {
  code: string;
  name: BilingualString;
  level: number;
  category: string;
  description?: BilingualString;
  durationYears?: number;
  academicDegree?: string;
}

export interface TerminationReason {
  code: string;
  name: BilingualString;
  category: string;
  legalReference?: string;
  documentationRequired?: string[];
  exitInterviewRecommended?: boolean;
  retentionRiskFlag?: boolean;
}

export interface TerminationSubtype {
  code: string;
  name: BilingualString;
  noticePeriodDays?: number;
  requiresApproval?: boolean;
  severanceApplicable?: boolean;
  severanceFormula?: string;
  legalReference?: string;
  approvalChain?: string[];
  reasons?: TerminationReason[];
}

export interface TerminationType {
  code: string;
  name: BilingualString;
  description?: BilingualString;
  legalReference?: string;
  subtypes?: TerminationSubtype[];
}

export interface SkillDimension {
  code: string;
  name: BilingualString;
  weight: number;
  subdimensions?: Subdimension[];
}

export interface Subdimension {
  code: string;
  name: BilingualString;
  skills?: Skill[];
}

export interface Skill {
  code: string;
  name: BilingualString;
  category?: string;
}

export interface EvidenceType {
  code: string;
  name: BilingualString;
  confidenceWeight: number;
  dataSchema?: Record<string, unknown>;
  inferenceRules?: InferenceRule[];
}

export interface InferenceRule {
  rule: string;
  description?: BilingualString;
  mappings?: Record<string, unknown>[];
  keywords?: Record<string, unknown>[];
}

export interface EmployeeStatus {
  code: string;
  name: BilingualString;
  category: "PRE_ACTIVE" | "ACTIVE" | "INACTIVE" | "TRANSITION" | "TERMINAL";
  isActive: boolean;
}

export interface StatusTransition {
  from: string;
  to: string;
  trigger: string;
}

export interface EmploymentType {
  code: string;
  name: BilingualString;
  laborContractType?: string;
  socialInsuranceRequired?: boolean;
  description?: BilingualString;
  legalReference?: string;
}

export interface CompensationComponent {
  code: string;
  name: BilingualString;
  category: "FIXED" | "VARIABLE" | "OTHER";
  payFrequency?: string;
  description?: BilingualString;
  legalReference?: string;
}

export interface TransferType {
  code: string;
  name: BilingualString;
  category: string;
  reasons?: Array<{ code: string; name: BilingualString }>;
}

export interface GlossaryTerm {
  term: string;
  definition?: string;
  roundingRule?: string;
  example?: string;
  dataDefinition?: string;
  dataRule?: string;
  rehireRule?: string;
}

/** Generic data file wrapper. */
export type DataFile<T extends Record<string, unknown> = Record<string, unknown>> = {
  metadata: Metadata;
} & T;
