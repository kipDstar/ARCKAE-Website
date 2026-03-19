/**
 * API Base URL configuration
 * 
 * In development: uses relative /api (vite dev proxy handles it)
 * In production on Render: uses full HTTPS backend URL
 */

export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://arckae-backend.onrender.com'
  : '';

/**
 * Helper to construct full API URLs
 */
export function getApiUrl(path: string): string {
  if (!path.startsWith('/')) path = '/' + path;
  return API_BASE_URL + path;
}
