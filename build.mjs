import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

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

function copyPublicFiles() {
  cpSync(indexPath, resolve(dist, "index.html"));
  cpSync(configPath, resolve(dist, "supabase-config.js"));
}

function writeBuildInfo() {
  const buildInfoPath = resolve(dist, "build-info.txt");
  writeFileSync(buildInfoPath, `Built at: ${new Date().toISOString()}\n`, "utf8");
}

ensureFile(indexPath, "index.html");
ensureFile(configPath, "supabase-config.js");

const html = readFileSync(indexPath, "utf8");
validateInlineScript(html);
prepareDist();
copyPublicFiles();
writeBuildInfo();

console.log("build successful");
