import { useEffect, useState } from "react";
import { clearAccessToken, setAccessToken } from "./lib/token";
import NavigationPage from "./components/pages/NavigationPage";
import useFetch from "./hooks/useFetch";
import LoginPage from "./components/pages/LoginPage";
import { setupServiceWorker, type ApplyUpdate } from "./sw-updater";
import UpdateBanner from "./components/UpdateBanner";
import LoadingView from "./components/views/LoadingView";

type UserCheck = { name: string; userId: string };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // 👇 Explicit type — either function or null
  const [applyUpdate, setApplyUpdate] = useState<ApplyUpdate | null>(null);

  useEffect(() => {
    setupServiceWorker(({ apply }) => {
      // IMPORTANT: setState receives an updater fn if you pass a function.
      // We want to SET a function value, so return it from the updater.
      setApplyUpdate(() => apply); // returns ApplyUpdate to state
    });
  }, []);

  const { data, loading } = useFetch<UserCheck>(
    "/api/auth/check",
    { method: "GET" },
    { immediate: true, auth: true }
  );

  useEffect(() => {
    if (data) setIsAuthenticated(true);
  }, [data]);

  function ResetLoggedInUser(): void {
    clearAccessToken();
    setIsAuthenticated(false);
  }
  function SetLoggedInUser(token: string): void {
    setAccessToken(token);
    setIsAuthenticated(true);
  }

  if (loading) {
    return (
      <LoadingView/>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col h-screen supports-[height:100dvh]:h-[100dvh] supports-[height:100svh]:h-[100svh] pb-[env(safe-area-inset-bottom)] bg-clr-surface-a0">
        <NavigationPage logOutUser={ResetLoggedInUser} />
      </div>
    );
  }

  return (
    <div className="h-screen min-h-dvh w-screen bg-surface-a0 overflow-hidden flex justify-center">
      <LoginPage onLoginSuccess={SetLoggedInUser} />
    </div>
  );
}

export default App;