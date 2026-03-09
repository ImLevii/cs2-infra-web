import { execSync, spawn } from "child_process";
import { resolve } from "path";

const cwd = resolve("/vercel/share/v0-project");

console.log("Installing dependencies with yarn...");
execSync("yarn install", { cwd, stdio: "inherit" });

console.log("Starting Nuxt dev server...");
const dev = spawn("yarn", ["dev"], { cwd, stdio: "inherit", shell: true });

dev.on("error", (err) => {
  console.error("Failed to start dev server:", err);
  process.exit(1);
});
