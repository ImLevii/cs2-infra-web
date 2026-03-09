const { spawnSync, spawn } = require("child_process");
const { resolve } = require("path");
const fs = require("fs");

const cwd = resolve("/vercel/share/v0-project");

const nuxtBin = resolve(cwd, "node_modules/.bin/nuxt");
const nuxtExists = fs.existsSync(nuxtBin);

if (!nuxtExists) {
  console.log("Installing deps via npm...");
  // Use the npm-cli.js path we discovered: /usr/lib/node_modules/npm/bin/npm-cli.js
  // But spawn it via the npm binary directly (as a string command, not process.execPath)
  const install = spawnSync("/usr/lib/node_modules/npm/bin/npm-cli.js", [
    "install",
    "--legacy-peer-deps",
  ], {
    cwd,
    stdio: "inherit",
    env: { ...process.env },
  });
  if (install.status !== 0) {
    console.error("npm install failed:", install.status, install.error);
    process.exit(install.status || 1);
  }
} else {
  console.log("node_modules already present, skipping install.");
}

console.log("Starting Nuxt dev server...");
const dev = spawn(nuxtBin, ["dev", "--host", "0.0.0.0", "--port", "3000"], {
  cwd,
  stdio: "inherit",
  env: { ...process.env, HOST: "0.0.0.0", PORT: "3000" },
});

dev.on("error", (err) => {
  console.error("Failed to start dev server:", err);
  process.exit(1);
});
