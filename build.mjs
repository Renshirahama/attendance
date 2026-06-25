import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");
const indexPath = resolve(root, "index.html");
const configPath = resolve(root, "supabase-config.js");

function ensureFile(path, label) {
  if (!existsSync(path)) {
    throw new Error(`${label} が見つかりません: ${path}`);
  }
}

function validateInlineScript(html) {
  const matches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  if (!matches.length) {
    throw new Error("index.html に inline script が見つかりません。");
  }
  new Function(matches[matches.length - 1][1]);
}

function prepareDist() {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
}

function getEnvConfigContent() {
  const url = process.env.VITE_SUPABASE_URL || "";
  const key = process.env.VITE_SUPABASE_ANON_KEY || "";

  if (!url || !key) return null;

  return `window.SUPABASE_URL = ${JSON.stringify(url)};\nwindow.SUPABASE_ANON_KEY = ${JSON.stringify(key)};\n`;
}

function getConfigContent() {
  const envConfig = getEnvConfigContent();
  if (envConfig) return envConfig;

  ensureFile(configPath, "supabase-config.js");
  return readFileSync(configPath, "utf8");
}

function copyPublicFiles(configContent) {
  cpSync(indexPath, resolve(dist, "index.html"));
  writeFileSync(resolve(dist, "supabase-config.js"), configContent, "utf8");
}

function writeBuildInfo() {
  const buildInfoPath = resolve(dist, "build-info.txt");
  writeFileSync(buildInfoPath, `Built at: ${new Date().toISOString()}\n`, "utf8");
}

ensureFile(indexPath, "index.html");

const html = readFileSync(indexPath, "utf8");
const configContent = getConfigContent();
validateInlineScript(html);
prepareDist();
copyPublicFiles(configContent);
writeBuildInfo();

console.log("build successful");
