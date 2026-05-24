import { describe, it, expect } from "vitest";
import { load, loadRaw, listDataFiles, clearCache } from "../src/loader.js";

describe("loader", () => {
  it("loads offboarding taxonomy", () => {
    const data = load("offboarding/taxonomy");
    expect(data).toHaveProperty("metadata");
    expect(data).toHaveProperty("terminationTypes");
    expect((data as any).metadata.version).toBe("0.1.0");
  });

  it("loads skill graph", () => {
    const data = load("ai-agent/skill-graph");
    expect(data).toHaveProperty("metadata");
    expect(data).toHaveProperty("skillTaxonomy");
    expect(data).toHaveProperty("evidenceTypes");
  });

  it("loads provinces", () => {
    const data = load("foundation/administrative-divisions/provinces");
    expect(data).toHaveProperty("divisions");
    expect((data as any).divisions).toHaveLength(34);
  });

  it("throws on missing file", () => {
    expect(() => load("nonexistent/data")).toThrow("Data file not found");
  });

  it("loads raw text", () => {
    const raw = loadRaw("offboarding/taxonomy");
    const data = JSON.parse(raw);
    expect(data).toHaveProperty("metadata");
  });

  it("lists data files", () => {
    const files = listDataFiles();
    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain("offboarding/taxonomy");
  });

  it("caches loaded data", () => {
    const data1 = load("offboarding/taxonomy");
    const data2 = load("offboarding/taxonomy");
    expect(data1).toBe(data2); // same reference
  });

  it("clears cache", () => {
    const data1 = load("offboarding/taxonomy");
    clearCache();
    const data2 = load("offboarding/taxonomy");
    expect(data1).not.toBe(data2); // different reference after cache clear
  });
});
