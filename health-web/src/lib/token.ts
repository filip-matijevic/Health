let inMemoryToken: string | null = null;

const KEY = "auth_token";

export function setAccessToken(token: string | null) {
  inMemoryToken = token;
  if (token) localStorage.setItem(KEY, token);
  else localStorage.removeItem(KEY);
}

export function getAccessToken(): string | null {
  // prefer memory first to avoid repeated localStorage reads
  return inMemoryToken ?? localStorage.getItem(KEY);
}

export function clearAccessToken() {
  setAccessToken(null);
}