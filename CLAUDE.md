# SEO System — SOP Tool

## What this is

A standard operating procedure for SEO content work, packaged as Claude Code skills.
Any client, any site, any market. Clone the repo, fill in 5 files about your brand and site,
and the skills run the full SEO workflow for you.

Built by Baisil Boban (Fictoralabs). First implementation: zena.fictoralabs.ae.

This folder is the BUILD workspace. Keep it separate from any client project.
Zena reference project: /Users/whoofey/Documents/Zena Landing Page/

---

## The 5 files every client fills in

| File | What goes in it |
|---|---|
| `COVERAGE.md` | Every page on the site — what it covers, what it doesn't |
| `OPEN-WORK.md` | Content pipeline — what's planned, what's in progress, what's published |
| `SEO-SOP.md` | The rules for this client — publish cadence, content tracks, process steps |
| `VOICE.md` | Brand voice, tone, what to say, what to never say |
| `AUDIT.md` | Latest SEO audit findings — auto-updated by /seo-audit |

That's it. Skills read these files and do the work.

---

## The 6 skills

```
/seo-start    →  Read client files. Tell me what's active and what's next.
/seo-gap      →  Pull GSC data. Find content gaps. Add them to the pipeline.
/seo-research →  Generate research prompt. Guide multi-LLM collection. Build fact sheet.
/seo-write    →  Write the content piece. Follow SOP. Enforce brand rules from VOICE.md.
/seo-publish  →  Check everything. Commit and deploy. Verify it's indexed.
/seo-audit    →  Full site audit. Update AUDIT.md with prioritised findings.
```

---

## The workflow (in order)

1. Client fills in their 5 files (or you fill them in with the client)
2. `/seo-start` — understand where you are
3. `/seo-gap` — find what to write next (GSC-backed)
4. `/seo-research` — research it properly before writing
5. `/seo-write` — write it
6. `/seo-publish` — ship it
7. Repeat. Run `/seo-audit` monthly.

---

## What makes this better than just using GSC or Screaming Frog

- Content decisions come from real search data — not guesswork
- No duplicate content — every new piece is checked against COVERAGE.md first
- Research before writing — multi-LLM fact verification, not writing from memory
- GEO baked in — every piece has answer-first intro + named sources + FAQPage schema
- Brand rules enforced automatically — VOICE.md runs on every write
- Full audit trail — fact sheets, publish history, audit files all in one place

---

## Tools used (all optional — skills work with what's available)

- GSC MCP — Google Search Console data
- DataForSEO MCP — keyword data, competitor analysis
- Screaming Frog — technical crawl

---

## Build status (2026-06-11)

Next session: build the 6 SKILL.md files and 5 template files.

Skills to build:
- [ ] skills/seo-start/SKILL.md
- [ ] skills/seo-gap/SKILL.md
- [ ] skills/seo-research/SKILL.md
- [ ] skills/seo-write/SKILL.md
- [ ] skills/seo-publish/SKILL.md
- [ ] skills/seo-audit/SKILL.md

Templates to build (starter versions clients fill in):
- [ ] templates/COVERAGE.md
- [ ] templates/OPEN-WORK.md
- [ ] templates/SEO-SOP.md
- [ ] templates/VOICE.md
- [ ] templates/AUDIT.md

Also needed:
- [ ] README.md (public-facing — what this is and how to use it)
- [ ] install.sh (copies skills to ~/.claude/skills/)
- [ ] .gitignore
