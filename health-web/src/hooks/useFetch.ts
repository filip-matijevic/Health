// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import { getAccessToken } from "../lib/token";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseFetchOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  skip?: boolean;
  asText?: boolean; // 👈 new flag: true if expecting plain text
  authToken?: string;
}

interface UseFetchResult<TResponse> {
  data: TResponse | null;
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
  cache?: RequestCache; // <-- new
}

export function useFetch<TResponse, TBody = unknown>(
  endpoint: string,
  options: UseFetchOptions<TBody> = {}
): UseFetchResult<TResponse> {
  const { method = "GET", body, headers = {}, skip = false, asText = false, authToken = getAccessToken()} = options;

  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      console.log(`${API_URL}${endpoint}`)
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = asText
        ? ((await response.text()) as TResponse) // plain string
        : ((await response.json()) as TResponse); // JSON

      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, [endpoint, method, body]);

  return { data, error, loading, refetch: fetchData };
}