import subprocess
import os
import sys

cwd = "/vercel/share/v0-project"

print("Installing dependencies with npm...")
result = subprocess.run(
    ["npm", "install", "--legacy-peer-deps"],
    cwd=cwd,
    capture_output=False,
)

if result.returncode != 0:
    print(f"npm install failed with code {result.returncode}", file=sys.stderr)
    sys.exit(result.returncode)

print("Dependencies installed. Starting Nuxt dev server...")
proc = subprocess.Popen(
    ["npx", "nuxt", "dev", "--host", "0.0.0.0", "--port", "3000"],
    cwd=cwd,
    env={**os.environ},
)
proc.wait()
