const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const siteDir = path.join(root, 'site');
const htmlFiles = fs
  .readdirSync(siteDir)
  .filter((file) => file.endsWith('.html'))
  .sort()
  .map((file) => path.join(siteDir, file));

const errors = [];
const appScripts = [];

function fail(file, message) {
  errors.push(`${path.relative(root, file)}: ${message}`);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function isExternalReference(value) {
  return /^(https?:)?\/\//i.test(value) ||
    /^(mailto|tel|sms):/i.test(value) ||
    value.startsWith('#') ||
    value.startsWith('javascript:');
}

function normalizeReference(value) {
  return String(value || '')
    .split('#')[0]
    .split('?')[0]
    .trim();
}

function validateLocalReference(file, value, attr) {
  const clean = normalizeReference(value);
  if (!clean || isExternalReference(clean)) return;

  const resolved = path.resolve(path.dirname(file), clean);
  if (!resolved.startsWith(siteDir)) {
    fail(file, `${attr} points outside site/: ${value}`);
    return;
  }

  if (!fs.existsSync(resolved)) {
    fail(file, `${attr} target missing: ${value}`);
  }
}

function compileScript(file, source, label) {
  try {
    new vm.Script(source, { filename: `${path.relative(root, file)}:${label}` });
  } catch (error) {
    fail(file, `${label} does not parse: ${error.message}`);
  }
}

function extractAppScripts(file, html) {
  const regex = /const\s+([A-Za-z0-9_]+AppsScript)\s*=\s*String\.raw`([\s\S]*?)`;/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    appScripts.push({
      file,
      name: match[1],
      source: match[2],
    });
  }
}

for (const file of htmlFiles) {
  const html = read(file);

  if (!html.includes('<!DOCTYPE html>')) {
    fail(file, 'missing <!DOCTYPE html>');
  }

  if (!html.includes('</html>')) {
    fail(file, 'missing closing </html>');
  }

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    validateLocalReference(file, match[1], match[0].trim().split('=')[0]);
  }

  let inlineIndex = 0;
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    compileScript(file, match[1], `inline-script-${inlineIndex}`);
    inlineIndex += 1;
  }

  extractAppScripts(file, html);
}

for (const appScript of appScripts) {
  compileScript(appScript.file, appScript.source, appScript.name);
}

if (appScripts.length > 1) {
  compileScript(
    path.join(siteDir, 'combined-apps-script.js'),
    appScripts.map((appScript) => appScript.source).join('\n'),
    'combined Apps Script'
  );
}

if (errors.length) {
  console.error('Static site validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Static site validation passed for ${htmlFiles.length} HTML files and ${appScripts.length} Apps Script blocks.`);
