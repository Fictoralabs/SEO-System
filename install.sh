#!/bin/bash
set -e

SKILLS_DIR="${HOME}/.claude/skills"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Installing seo-system skills to $SKILLS_DIR..."

for skill in seo-start seo-gap seo-research seo-write seo-publish seo-audit; do
  if [ -f "$SCRIPT_DIR/skills/$skill/SKILL.md" ]; then
    mkdir -p "$SKILLS_DIR/$skill"
    cp "$SCRIPT_DIR/skills/$skill/SKILL.md" "$SKILLS_DIR/$skill/SKILL.md"
    echo "  installed: $skill"
  else
    echo "  skipped (not built yet): $skill"
  fi
done

echo ""
echo "Done. Restart Claude Code, then use:"
echo "  /seo-start      Read client files, identify active piece"
echo "  /seo-gap        Find content gaps from GSC data"
echo "  /seo-research   Build fact sheet via multi-LLM research"
echo "  /seo-write      Write SOP-compliant content"
echo "  /seo-publish    Pre-publish checklist + deploy + verify"
echo "  /seo-audit      Full site audit, update AUDIT.md"
