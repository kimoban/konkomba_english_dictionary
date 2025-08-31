import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const analyticsPath = path.join(__dirname, '../../../data/analytics.json');

function readAnalytics() {
  if (!fs.existsSync(analyticsPath)) return {};
  return JSON.parse(fs.readFileSync(analyticsPath, 'utf-8'));
}

function writeAnalytics(data) {
  fs.writeFileSync(analyticsPath, JSON.stringify(data, null, 2));
}

export function trackSearch(query) {
  const analytics = readAnalytics();
  analytics.searches = analytics.searches || {};
  analytics.searches[query] = (analytics.searches[query] || 0) + 1;
  writeAnalytics(analytics);
}

export function trackWordView(word) {
  const analytics = readAnalytics();
  analytics.views = analytics.views || {};
  analytics.views[word] = (analytics.views[word] || 0) + 1;
  writeAnalytics(analytics);
}

export function getAnalytics() {
  return readAnalytics();
}
