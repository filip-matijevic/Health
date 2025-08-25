import { useCallback, useEffect, useState } from "react";
import LoginPage from "./components/pages/LoginPage";
import { auth } from "./services/auth";
import { HttpError } from "./lib/http";
import HomePage from "./components/pages/HomePage";
import { clearAccessToken } from "./lib/token";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState<string>("");

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const user = await auth.me(); // will throw if token invalid/missing
      setIsAuthenticated(true);
      setName(user.name ?? null);
    } catch (e) {
      if (e instanceof HttpError) {
        console.warn("Auth check failed:", e.status, e.body);
      } else {
        console.error("Unexpected error:", e);
      }
      setIsAuthenticated(false);
      setName("");
    } finally {
      setLoading(false);
    }
  }, []);

  // run once on app start
  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  function ResetLoggedInUser(): void {
    clearAccessToken();
    setIsAuthenticated(false);
    setName("");
  }

  return (
    <div className="h-screen min-h-dvh w-screen bg-gray-800 overflow-hidden">
      {loading ?? (
        <div className="h-screen flex items-center justify-center text-gray-50">
          Loading...
        </div>
      )}

      {!isAuthenticated ? (
        <LoginPage onLogIn={checkAuth}/>
      ) : (
        <HomePage onLogOut={ResetLoggedInUser} userName={name}/>
      )}
    </div>
  );
}

export default App;
