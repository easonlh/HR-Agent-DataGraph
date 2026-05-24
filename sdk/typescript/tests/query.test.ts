import { describe, it, expect } from "vitest";
import {
  findProvince,
  findInstitution,
  findOffboardingReason,
  findSkillDimension,
  findStatusTransitions,
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
});
