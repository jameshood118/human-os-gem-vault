#!/usr/bin/env bash
set -euo pipefail

# Navigation: Root verification
cd "$(git rev-parse --show-toplevel)"

printf "🔍 [SYSTEM_AUDIT] Initiating Pre-Push Quality Gate...\n"

# 1. Structural Audit (TypeScript)
printf "🛠️  Verifying Type Grid (TSC)...\n"
npm run typecheck || { printf "🛑 Type Grid failure. Check for property mismatches.\n"; exit 1; }

# 2. Logic Audit (ESLint)
printf "✨ Auditing Logic Rules (Flat Config)...\n"
# Note: No --ext or --cache here; handled by the config/package scripts
npm run lint || { printf "🛑 Logic anomalies detected. Fix linting errors.\n"; exit 1; }

# 3. Geometry Audit (Prettier)
printf "🎨 Checking Syntax Geometry (Prettier)...\n"
npm run format:check || { printf "🛑 Formatting mismatch. Run 'npm run format'.\n"; exit 1; }

printf "🚀 [STATUS: VERIFIED] All systems nominal. Proceeding with push.\n"
