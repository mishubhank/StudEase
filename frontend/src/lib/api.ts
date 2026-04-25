const DEFAULT_API_BASE_URL = "http://localhost:3000";

function normalizeUrl(url?: string): string | undefined {
  if (!url) {
    return undefined;
  }

  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return undefined;
  }

  return trimmedUrl.replace(/\/$/, "");
}

export const API_BASE_URL =
  normalizeUrl(import.meta.env.VITE_API_BASE_URL) ?? DEFAULT_API_BASE_URL;

export const SOCKET_URL =
  normalizeUrl(import.meta.env.VITE_SOCKET_URL) ?? API_BASE_URL;

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
