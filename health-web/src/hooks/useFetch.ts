import {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { getAccessToken } from "../lib/token";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

export type UseFetchOptions = {
  immediate: boolean;
  auth?: boolean | { scheme?: "Bearer" };
};

export type UseFetchReturn<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
  url: string;
  load: () => Promise<T | null>;
  updateUrl: React.Dispatch<React.SetStateAction<string>>;
  updateOptions: React.Dispatch<React.SetStateAction<UseFetchOptions>>;
  /** Synchronous for load(): updates a ref immediately */
  updateRequestOptions: (
    next: RequestInit | ((prev: RequestInit | undefined) => RequestInit)
  ) => void;
  /** Awaitable version if you prefer */
  updateRequestOptionsAsync: (
    next: RequestInit | ((prev: RequestInit | undefined) => RequestInit)
  ) => Promise<void>;
};

function joinUrl(base: string, path: string): string {
  if (!base) return path;
  if (!path) return base;
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

function useBearerAuth(authOpt: UseFetchOptions["auth"]): boolean {
  if (!authOpt) return false;
  if (authOpt === true) return true;
  return authOpt.scheme === "Bearer";
}

export default function useFetch<T>(
  initialUrl: string,
  initialRequestOptions?: RequestInit,
  initialOptions?: UseFetchOptions
): UseFetchReturn<T> {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [options, updateOptions] = useState<UseFetchOptions>(
    initialOptions || { immediate: true }
  );
  const [url, updateUrl] = useState(initialUrl);

  // Keep state for visibility, but the ref is the source of truth for load()
  const [requestOptionsState, setRequestOptionsState] = useState<RequestInit | undefined>(
    initialRequestOptions
  );
  const requestOptionsRef = useRef<RequestInit | undefined>(initialRequestOptions);

  // Allow awaiting a state commit if desired
  const pendingResolveRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    // resolve any waiter after requestOptionsState updates
    pendingResolveRef.current?.();
    pendingResolveRef.current = null;
  }, [requestOptionsState]);

  const updateRequestOptions = useCallback((
    next: RequestInit | ((prev: RequestInit | undefined) => RequestInit)
  ) => {
    const value =
      typeof next === "function"
        ? (next as (p: RequestInit | undefined) => RequestInit)(requestOptionsRef.current)
        : next;
    // Update ref synchronously so load() right after this sees the new body
    requestOptionsRef.current = value;
    // Also update state for re-renders/devtools
    setRequestOptionsState(value);
  }, []);

  const updateRequestOptionsAsync = useCallback(async (
    next: RequestInit | ((prev: RequestInit | undefined) => RequestInit)
  ) => {
    await new Promise<void>((resolve) => {
      pendingResolveRef.current = resolve;
      updateRequestOptions(next);
    });
  }, [updateRequestOptions]);

  const abortController = useRef(new AbortController());

  const load = useCallback(async () => {
    const localUrl = url; // capture once
    const localReq = requestOptionsRef.current || {}; // <-- read from ref (fresh)

    // cancel in-flight and prepare a new controller
    abortController.current.abort();
    abortController.current = new AbortController();

    setData(null);
    if (!localUrl) {
      setError("Empty URL");
      return null;
    } else {
      setError(null);
    }
    setLoading(true);

    try {
      const requestInit: RequestInit = { ...localReq, signal: abortController.current.signal };
      const currentAbortController = abortController.current;

      const headers = new Headers(requestInit.headers || undefined);

      if (useBearerAuth(options.auth)) {
        const token = getAccessToken();
        if (!token) {
          setLoading(false);
          setError("No access token available");
          return null;
        }
        headers.set("Authorization", `Bearer ${token}`);
      }

      // If there's a body but no explicit Content-Type, default to JSON
      if (requestInit.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      requestInit.headers = headers;

      const response = await fetch(joinUrl(API_URL, localUrl), requestInit);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if (currentAbortController.signal.aborted) {
        // silently exit if this request was aborted post-response
        return null;
      }

      setData(json as T);
      return json;
    } catch (e) {
      const err = e as Error;
      if (err.name === "AbortError") {
        setData(null);
        setError(null);
      } else {
        setError(err.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, options.auth]);

  useEffect(() => {
    if (options.immediate) {
      void load();
    }
    return () => {
      abortController.current.abort();
    };
  }, [load, options.immediate]);

  return {
    url,
    loading,
    error,
    data,
    load,
    updateUrl,
    updateOptions,
    updateRequestOptions,       // sync for load()
    updateRequestOptionsAsync,  // awaitable if you want
  };
}