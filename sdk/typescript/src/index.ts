/**
 * HR-Agent-DataGraph: Chinese HRIS Standard Reference Dictionary & Metadata Engine.
 *
 * @packageDocumentation
 */

export { load, loadRaw, listDataFiles, clearCache } from "./loader.js";
export {
  findProvince,
  findInstitution,
  findOffboardingReason,
  findSkillDimension,
  findStatusTransitions,
} from "./query.js";
export { validate, type ValidationResult } from "./validation.js";
export type {
  BilingualString,
  Metadata,
  AdministrativeDivision,
  City,
  Institution,
  DegreeType,
  TerminationReason,
  TerminationSubtype,
  TerminationType,
  SkillDimension,
  Subdimension,
  Skill,
  EvidenceType,
  InferenceRule,
  EmployeeStatus,
  StatusTransition,
  EmploymentType,
  CompensationComponent,
  TransferType,
  DataFile,
} from "./types.js";
