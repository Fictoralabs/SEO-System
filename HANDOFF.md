# SEO + GEO Command Center — Handoff

This document summarizes the current state, design tokens, assets, and next steps so you can continue implementation and deploy to Azure.

## Design (Fictora Labs)
- Colors: `#152B4B` (bg), `#3AA0B7`, `#1a6a85`, `#0d3a5c`, `#051D43`, `#E7FF00` (accent), `#d8ecd1`, `#52b4d4`, `#3376b0`, `#F0F0F0`.
- Gradient: `radial-gradient(ellipse at 15% 5%, #3AA0B7 0%, #1a6a85 22%, #0d3a5c 52%, #051D43 100%)`.
- Typography: Barlow Condensed 700–900 (ALL CAPS for headlines/labels), DM Sans 300/400/500 for body.
- SVG marks: yellow spark icon + diagonal bars (see DESIGN.md).
- Reference: `DESIGN.md` for full tokens and usage.

## Site structure (in `/site`)
- Landing page: `site/index.html` (Fictora-themed) with anchors:
  - `#site-structure` (EP01) — downloads: `SEO-Site-Structure-Zena.pdf`, `SEO Research Kit Sheet  - EP01 — Site Structure.csv`.
  - `#page-structure` (EP02) — downloads: `Page-Structure-Guide-Zena.pdf`, `site/assets/ep02-page-structure.csv`.
  - `#serp-analysis` (EP03) — downloads: `SERP-Analysis-Guide-EP03.pdf`, `site/assets/ep03-serp-tracker.csv`.
  - `#keyword-research` (EP04 placeholder).
- Demo links: `dashboard.html`, `backlinks-setup-guide.html`, `links.html`.
- New assets: CSV templates in `site/assets/ep02-page-structure.csv` and `site/assets/ep03-serp-tracker.csv`.

## Pending features to implement
1) "Use my data" modal on dashboards:
   - Input: published CSV URL; client-side fetch/parse; fallback to demo data.
   - Define required headers per view when wiring.
2) Local checklist per episode (EP01–EP04) stored in localStorage (status toggles + a few text fields).
3) Optional gated downloads:
   - Modal collecting name (opt), email (req), phone (req?), consent line.
   - Azure Function to store records (Table Storage) and optionally email links via SendGrid/Mailjet. (Not built yet.)

## Deployment (Azure Static Web Apps)
- Resource group already created: `rg-seo-geo`.
- After pushing repo to GitHub (branch `main`), create SWA:

```
az staticwebapp create \
  --name seo-geo-command \
  --resource-group rg-seo-geo \
  --location centralus \
  --source https://github.com/<your-user>/seo-system \
  --branch main \
  --app-location site \
  --output-location ""
```

- Custom domain: add CNAME for chosen subdomain (e.g., `seo.digitlnomad.com`) in SWA → TLS auto-provisions.

## Reels & CTA mapping
- EP01 Site Structure: Build sitemap from top competitors. CTA: Site Structure Kit (PDF + CSV).
- EP02 Page Structure: Map homepage sections; CTA: Page Structure Kit (PDF + CSV).
- EP03 SERP Analysis: Identify dominant result types/intent; CTA: SERP Analysis Kit (PDF + CSV).
- EP04 Keyword Research (3-part scripts provided):
  - Part 1 (DataForSEO + GSC harvest). CTA: starter CSV + API templates.
  - Part 2 (GPT clustering and mapping to pages). CTA: prompt + mapper sheet.
  - Part 3 (Prioritize and backlog). CTA: scoring sheet + demo link.

## Keyword research technical approach (for later)
- DataForSEO seeds: main keyword, competitors, GSC striking-distance (pos 8–20).
- Keep columns: `keyword, search_volume, cpc, competition, serp_features, source`.
- GPT clustering prompt: group by what a single page can rank for; return JSON `{cluster_name, intent, keywords}`.
- Intent: informational / commercial / transactional / local.
- Priority score: volume × intent_weight (info 0.8, commercial 1.1, transactional 1.2, local 1.0) × (1 + 0.3 if striking-distance).
- Output CSV for dashboard: `cluster_name, keyword, intent, search_volume, mapped_page, priority_score, status`.

## Files added/updated
- `DESIGN.md` (tokens).
- `site/index.html` (new landing, Fictora theme).
- `site/assets/ep02-page-structure.csv` and `site/assets/ep03-serp-tracker.csv` (templates).

## Needed to finish gating/hosting
- Consent text for email/phone capture.
- Choice of email sender (SendGrid/Mailjet/etc.).
- GitHub repo URL/username (for SWA command).
- Subdomain to bind (e.g., `seo.digitlnomad.com`).

## Quick reel scripts (Keyword Research, 3-part)
- Part 1 (Harvest): seeds from main KW + competitors + GSC striking-distance; pull DataForSEO Related/Suggestions; dedup to ~1.5k rows. CTA: starter CSV/API templates.
- Part 2 (Cluster/Map): batch ~200 terms into GPT-4o-mini; JSON clusters with intent; map clusters to pages (commercial → service/comparison, informational → blog/FAQ, transactional/local → location/product). CTA: prompt + mapper sheet.
- Part 3 (Prioritize/Ship): score = volume × intent_weight × (1 + striking_distance_flag); sort top 10 as immediate briefs; status planned/writing/live; optional dashboard import. CTA: scoring sheet + demo link.

---

Use this handoff with Claude/other tooling to continue: wire the "Use my data" flow, local checklist, optional gating + Azure Function, and run the SWA create command after pushing to GitHub.

