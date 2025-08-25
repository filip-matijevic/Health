import { getAccessToken } from "./token";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface HttpOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  cache?: RequestCache;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
  withAuth?: boolean;
}

export class HttpError extends Error {
    status: number;
    statusText: string;
    body?: unknown;
  
    constructor(status: number, statusText: string, body?: unknown) {
      super(`HTTP ${status} ${statusText}`);
      this.status = status;
      this.statusText = statusText;
      this.body = body;
  
      // Ensure instanceof works correctly across transpilation targets
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = "HttpError";
    }
  }

export async function http<TResp, TBody = unknown>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
    credentials,
    cache,
    signal,
    withAuth = false
  }: HttpOptions<TBody> = {}
): Promise<TResp> {
  const url = new URL(endpoint, API_URL).toString();

  const finalHeaders = new Headers(headers);

  if (withAuth) {
    const token = getAccessToken();               // 👈 import from token.ts
    if (token && !finalHeaders.has("Authorization")) {
      finalHeaders.set("Authorization", `Bearer ${token}`);
    }
  }
  
  if (body !== undefined && !finalHeaders.has("Content-Type")) {
    finalHeaders.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials,
    cache: cache ?? (import.meta.env.DEV ? "no-store" : "default"),
    signal,
  });

  console.log(url);

  if (res.status === 304) {
    throw new HttpError(304, "Not Modified"); // or handle differently
  }
  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text().catch(() => undefined);
    }
    throw new HttpError(res.status, res.statusText, detail);
  }
  return (await res.json()) as TResp;
}
