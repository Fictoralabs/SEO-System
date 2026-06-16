// Minimal config for the public static dashboards.
// To switch from demo data to your own metrics, host a CSV or JSON endpoint
// and swap the URLs here. The HTML pages fall back to embedded demo data
// if fetching fails or is not configured.

window.SEO_DASH_CONFIG = {
  // Set to true to attempt live fetch; false keeps the baked-in demo data.
  useLiveData: false,

  // Example: a published CSV ("Anyone with link") from Google Sheets.
  // Must include headers expected by dashboard.js (avg_position, geo_score, top10_keywords, clicks, ai_citations, week, gain, loss, etc.)
  liveDataUrl: "",

  // Optional: backlink CSV for links.html (fields: site, da, follow, effort, path, mention, rivals, etc.)
  backlinkDataUrl: ""
};

