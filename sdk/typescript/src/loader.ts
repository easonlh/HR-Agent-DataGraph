/**
 * Data file loader with lazy caching and path resolution.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { DataFile } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dataRoot: string | null = null;

function getDataRoot(): string {
  if (dataRoot !== null) return dataRoot;

  const envPath = process.env["HR_AGENT_DATA_PATH"];
  if (envPath) {
    dataRoot = resolve(envPath);
    return dataRoot;
  }

  // Relative to package root: sdk/typescript/src -> ../../data
  dataRoot = resolve(__dirname, "../../../data");
  return dataRoot;
}

function resolvePath(name: string): string {
  const root = getDataRoot();
  const fileName = name.endsWith(".json") ? name : `${name}.json`;
  const filePath = join(root, fileName);
  if (!existsSync(filePath)) {
    throw new Error(`Data file not found: ${filePath}`);
  }
  return filePath;
}

const cache = new Map<string, unknown>();

/**
 * Load and cache a data file by dotted name.
 *
 * @param name - Dotted path relative to data/, e.g. "offboarding/taxonomy"
 * @returns Parsed JSON data
 */
export function load<T = DataFile>(name: string): T {
  const cached = cache.get(name);
  if (cached !== undefined) return cached as T;

  const filePath = resolvePath(name);
  const content = readFileSync(filePath, "utf-8");
  const data = JSON.parse(content) as T;
  cache.set(name, data);
  return data;
}

/**
 * Load a data file as raw text.
 */
export function loadRaw(name: string): string {
  const filePath = resolvePath(name);
  return readFileSync(filePath, "utf-8");
}

/**
 * List available data files.
 */
export function listDataFiles(directory = ""): string[] {
  const root = directory ? join(getDataRoot(), directory) : getDataRoot();
  if (!existsSync(root)) return [];

  const files: string[] = [];

  function walk(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith(".json") && !entry.startsWith("_")) {
        const relative = fullPath.replace(getDataRoot() + "/", "").replace(".json", "");
        files.push(relative);
      }
    }
  }

  walk(root);
  return files;
}

/**
 * Clear the in-memory cache. Useful for testing.
 */
export function clearCache(): void {
  cache.clear();
  dataRoot = null;
}
