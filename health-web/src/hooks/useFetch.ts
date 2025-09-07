// src/hooks/useFetch.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { getAccessToken } from "../lib/token";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface UseFetchOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  skip?: boolean;              // don't auto-run on mount
  asText?: boolean;            // expect plain text instead of JSON
  auth?: boolean;              // 👈 turn on Authorization header
  tokenKey?: string;           // localStorage key (default: "jwtToken")
}

export interface RefetchOverride<TBody> {
  endpoint?: string;
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  asText?: boolean;
  auth?: boolean;              // override per-call
  tokenKey?: string;           // override per-call
}

export interface UseFetchResult<TResponse, TBody> {
  data: TResponse | null;
  error: string | null;
  loading: boolean;
  refetch: (override?: RefetchOverride<TBody>) => Promise<void>;
  reset: () => void;
}

export function useFetch<TResponse, TBody = unknown>(
  endpoint: string,
  options: UseFetchOptions<TBody> = {}
): UseFetchResult<TResponse, TBody> {
  const {
    method = "GET",
    body,
    headers = {},
    skip = false,
    asText = false,
    auth = false,
    tokenKey = "jwtToken",
  } = options;

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);

  // keep latest baseline config in a ref (so refetch always uses the newest values)
  const base = useRef({
    endpoint,
    method,
    body,
    headers,
    asText,
    auth,
    tokenKey,
  });

  // abort + mounted guards
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // update base config when inputs change
  useEffect(() => {
    base.current = { endpoint, method, body, headers, asText, auth, tokenKey };
  }, [endpoint, method, body, headers, asText, auth, tokenKey]);

  const doFetch = useCallback(
    async (override?: RefetchOverride<TBody>) => {
      setLoading(true);
      setError(null);

      // cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const ep = override?.endpoint ?? base.current.endpoint;
      const mtd = override?.method ?? base.current.method;
      const bdy = override?.body ?? base.current.body;
      const hdrs = { ...base.current.headers, ...(override?.headers ?? {}) };
      const txt = override?.asText ?? base.current.asText;

      const useAuth = override?.auth ?? base.current.auth;

      const token = useAuth ? getAccessToken() : undefined;

      try {
        const response = await fetch(`${API_URL}${ep}`, {
          method: mtd,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...(useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
            ...hdrs,
          },
          // only attach body when provided (and when method allows it)
          body: bdy !== undefined && mtd !== "GET" ? JSON.stringify(bdy) : undefined,
        });

        if (!response.ok) {
          // try to include server error payload if available
          let msg = `API error: ${response.status} ${response.statusText}`;
          try {
            const text = await response.text();
            if (text) msg += ` - ${text}`;
          } catch {}
          throw new Error(msg);
        }

        const result = (txt ? await response.text() : await response.json()) as TResponse;

        if (mountedRef.current) setData(result);
      } catch (err: any) {
        if (err?.name === "AbortError") return; // ignore aborts
        if (mountedRef.current) setError((err as Error).message);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    []
  );

  // initial auto-run
  useEffect(() => {
    if (!skip) doFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, endpoint, method, asText, auth, tokenKey]); // body/headers changes won't auto-fire unless you want them to

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, error, loading, refetch: doFetch, reset };
}