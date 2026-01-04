#!/usr/bin/env bash
set -euo pipefail

# Régénère dist/ puis commit + push.
# Usage:
#   ./TOOLS/push-dist.sh
#   ./TOOLS/push-dist.sh "chore(dist): update assets"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erreur: ce dossier n'est pas un repo git: $ROOT" >&2
  exit 1
fi

mkdir -p dist

python3 - <<'PY'
import re
from pathlib import Path

root = Path(".")
src_path = root / "body.js"
out_path = root / "dist" / "rtec-bullet.js"

src = src_path.read_text(encoding="utf-8").strip()

# Supporte body.js qui contient soit:
# - un <script>...</script> complet
# - ou juste du JS.
src = re.sub(r"^\s*<script[^>]*>\s*\n?", "", src, flags=re.I)
src = re.sub(r"\n?\s*</script>\s*$", "", src, flags=re.I)

out_path.write_text(src + "\n", encoding="utf-8")
print(f"Wrote {out_path}")
PY

cp -f combined.css dist/rtec-bullet.css

git add dist/rtec-bullet.js dist/rtec-bullet.css

if git diff --cached --quiet; then
  echo "Aucun changement dans dist/. Rien à push."
  exit 0
fi

MSG="${1:-chore(dist): update Bullet assets}"
git commit -m "$MSG"
git push

# -------------------------
# jsDelivr cache purge
# -------------------------
origin_url="$(git remote get-url origin || true)"
owner_repo=""

# https://github.com/OWNER/REPO(.git)
if [[ "$origin_url" =~ github\.com[:/]+([^/]+)/([^/.]+)(\.git)?$ ]]; then
  owner_repo="${BASH_REMATCH[1]}/${BASH_REMATCH[2]}"
fi

if [[ -n "$owner_repo" ]]; then
  echo "Purge jsDelivr (best-effort)…"
  for path in dist/rtec-bullet.js dist/rtec-bullet.css; do
    curl -fsS "https://purge.jsdelivr.net/gh/${owner_repo}@main/${path}" >/dev/null || true
  done

  sha="$(git rev-parse --short HEAD)"
  echo
  echo "URLs Bullet (main):"
  echo "  https://cdn.jsdelivr.net/gh/${owner_repo}@main/dist/rtec-bullet.css"
  echo "  https://cdn.jsdelivr.net/gh/${owner_repo}@main/dist/rtec-bullet.js"
  echo
  echo "URLs Bullet (pin sur commit pour éviter le cache):"
  echo "  https://cdn.jsdelivr.net/gh/${owner_repo}@${sha}/dist/rtec-bullet.css"
  echo "  https://cdn.jsdelivr.net/gh/${owner_repo}@${sha}/dist/rtec-bullet.js"
fi

