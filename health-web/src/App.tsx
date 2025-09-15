import { useEffect, useState } from "react";
import { clearAccessToken, setAccessToken } from "./lib/token";
import NavigationPage from "./components/pages/NavigationPage";
import useFetch from "./hooks/useFetch";
import LoginPage from "./components/pages/LoginPage";
import { setupServiceWorker, type ApplyUpdate } from "./sw-updater";
import UpdateBanner from "./components/UpdateBanner";

type UserCheck = { name: string; userId: string };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // 🔔 Show banner as overlay instead of replacing the whole app
  // (If you prefer your previous behavior, keep the early return)
  const updateBanner =
    applyUpdate && (
      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center">
        <UpdateBanner
          onReload={() => applyUpdate()}
          onDismiss={() => setApplyUpdate(null)}
        />
      </div>
    );

  if (loading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-top pt-22">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
        {updateBanner}
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col h-screen supports-[height:100dvh]:h-[100dvh] supports-[height:100svh]:h-[100svh] pb-[env(safe-area-inset-bottom)] bg-clr-surface-a0">
        <NavigationPage logOutUser={ResetLoggedInUser} />
        {updateBanner}
      </div>
    );
  }

  return (
    <div className="h-screen min-h-dvh w-screen bg-surface-a0 overflow-hidden flex justify-center">
      <LoginPage onLoginSuccess={SetLoggedInUser} />
      {updateBanner}
    </div>
  );
}

export default App;