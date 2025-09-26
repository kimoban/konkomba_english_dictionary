import Constants from 'expo-constants';

// Try to infer the host IP from the Expo dev server so device can reach the backend without manual config
const hostFromExpo = (() => {
  const uri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  if (uri && typeof uri === 'string') {
    const host = uri.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return `http://${host}:5001/api`;
    }
  }
  return undefined;
})();

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  Constants.expoConfig?.extra?.apiBaseUrl ||
  Constants.manifest?.extra?.apiBaseUrl ||
  hostFromExpo ||
  'http://localhost:5001/api';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const dictionaryService = {
  list: () => apiFetch('/words'),
  add: (data) => apiFetch('/words', { method: 'POST', body: JSON.stringify(data) }),
  update: (word, data) => apiFetch(`/words/${encodeURIComponent(word)}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (word) => apiFetch(`/words/${encodeURIComponent(word)}`, { method: 'DELETE' }),
  analytics: () => apiFetch('/analytics'),
};
