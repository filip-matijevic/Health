import { useCallback, useState } from "react";
import { auth } from "../services/auth";
import { setAccessToken } from "../lib/token";
import { HttpError } from "../lib/http";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await auth.login(username, password);
      setAccessToken(res.accessToken);

      const me = await auth.me();
      const details = await auth.userDetails();

      return { me, details };
    } catch (e) {
      if (e instanceof HttpError) setError(e.message);
      else setError("Unexpected error. Please try again.");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, login };
}