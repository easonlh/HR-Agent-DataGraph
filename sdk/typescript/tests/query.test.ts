import { describe, it, expect } from "vitest";
import {
  findProvince,
  findInstitution,
  findOffboardingReason,
  findSkillDimension,
  findStatusTransitions,
  findGlossaryTerm,
  searchGlossary,
  findContractRules,
} from "../src/query.js";

describe("query", () => {
  it("finds province by code", () => {
    const result = findProvince("11");
    expect(result).toBeDefined();
    expect(result!.name.zh).toBe("北京市");
  });

  it("finds province by name", () => {
    const result = findProvince("上海市");
    expect(result).toBeDefined();
    expect(result!.code).toBe("31");
  });

  it("returns undefined for unknown province", () => {
    const result = findProvince("不存在");
    expect(result).toBeUndefined();
  });

  it("finds institution exact", () => {
    const results = findInstitution("清华大学");
    expect(results).toHaveLength(1);
    expect(results[0].code).toBe("10003");
  });

  it("finds institution fuzzy", () => {
    const results = findInstitution("大学", true);
    expect(results.length).toBeGreaterThan(1);
  });

  it("finds offboarding reason", () => {
    const result = findOffboardingReason("INCOMPETENCE");
    expect(result).toBeDefined();
    expect(result!.name.zh).toBe("不能胜任工作，经培训或调岗仍不能胜任");
    expect(result!.terminationType).toBe("INVOLUNTARY");
  });

  it("returns undefined for unknown reason", () => {
    const result = findOffboardingReason("NONEXISTENT");
    expect(result).toBeUndefined();
  });

  it("finds skill dimension", () => {
    const result = findSkillDimension("TECHNICAL");
    expect(result).toBeDefined();
    expect(result!.weight).toBe(0.35);
  });

  it("finds status transitions", () => {
    const transitions = findStatusTransitions("REGULAR");
    expect(transitions.length).toBeGreaterThan(0);
    const triggers = transitions.map((t) => t.trigger);
    expect(triggers).toContain("RESIGNATION_SUBMITTED");
  });

  it("finds glossary term", () => {
    const result = findGlossaryTerm("CR值");
    expect(result).toBeDefined();
    expect(result!.definition).toContain("Compensation Ratio");
  });

  it("returns undefined for unknown glossary term", () => {
    const result = findGlossaryTerm("不存在的术语");
    expect(result).toBeUndefined();
  });

  it("searches glossary by keyword", () => {
    const results = searchGlossary("司龄");
    expect(results.length).toBeGreaterThan(0);
    const terms = results.map((r) => r.term);
    expect(terms).toContain("员工司龄");
  });

  it("finds contract rules by signing type", () => {
    const results = findContractRules("NEW_SIGNING");
    expect(results.length).toBeGreaterThan(0);
    const categories = results.map((r) => r.employeeCategory.zh);
    expect(categories).toContain("正式员工");
    expect(categories).toContain("劳务派遣");
  });

  it("finds contract rules by employee category", () => {
    const results = findContractRules(undefined, "正式员工");
    expect(results.length).toBeGreaterThanOrEqual(3);
    const signingTypes = results.map((r) => r.signingType);
    expect(signingTypes).toContain("NEW_SIGNING");
    expect(signingTypes).toContain("FIRST_RENEWAL");
    expect(signingTypes).toContain("SECOND_RENEWAL");
  });

  it("finds contract rules combined filter", () => {
    const results = findContractRules("SECOND_RENEWAL", "正式员工");
    expect(results).toHaveLength(1);
    expect(results[0].rule).toContain("2099-12-31");
  });
});
