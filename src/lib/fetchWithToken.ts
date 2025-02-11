import { refresh } from '../services/authService';
import { getAuthHeader } from './getHeaders';

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

/**
 * File de traitement pour les requêtes en attente de rafraîchissement du token
 * @param token - Le nouveau token d'accès
 */
const processQueue = (token: string) => {
  refreshQueue.forEach(cb => cb(token));
  refreshQueue = [];
};

/**
 * Effectue une requête HTTP authentifiée avec gestion automatique du rafraîchissement du token
 *
 * @param url - L'URL de la requête
 * @param options - Les options de la requête fetch (headers, method, body, etc.)
 * @returns Une Promise contenant la réponse JSON de la requête
 * @throws {Error} Si l'authentification échoue ou si la requête échoue
 */
export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const makeRequest = async (accessToken: string) => {
    const headers: Record<string, string> = {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    };

    if (options.body instanceof FormData) {
      const { 'Content-Type': _, ...restHeaders } = headers;
      return fetch(url, {
        ...options,
        headers: restHeaders
      });
    }

    return fetch(url, {
      ...options,
      headers
    });
  };

  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error('Non authentifié');
    }

    let response = await makeRequest(authHeader);

    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newTokens = await refresh();
          localStorage.setItem('token', newTokens.data.token);
          localStorage.setItem('refreshToken', newTokens.data.refreshToken);

          const newAuthHeader = `Bearer ${newTokens.data.token}`;
          processQueue(newAuthHeader);

          response = await makeRequest(newAuthHeader);
        } catch {
          refreshQueue.forEach(cb => cb(''));
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          throw new Error('Session expirée');
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          refreshQueue.push(async newToken => {
            try {
              const retryResponse = await makeRequest(newToken);
              const data = await retryResponse.json();
              resolve(data);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
