import { useCallback, useEffect, useState } from "react";
import { HttpError } from "./lib/http";
import HomePage from "./components/pages/HomePage";
import { clearAccessToken } from "./lib/token";
import LogInForm from "./components/forms/LogInForm";
import RoundedButton from "./components/inputs/RoundedButton";
import Landing from "./components/static_elements/Landing";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      setIsAuthenticated(true);
    } catch (e) {
      if (e instanceof HttpError) {
        console.warn("Auth check failed:", e.status, e.body);
      } else {
        console.error("Unexpected error:", e);
      }
      setIsAuthenticated(false);
    } finally {
    }
  }, []);

  // run once on app start
  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  function ResetLoggedInUser(): void {
    clearAccessToken();
    setIsAuthenticated(false);
  }
  function SetLoggedInUser(): void {
    setIsAuthenticated(true);
  }

  if (isAuthenticated) {
    return (
      <div className="h-screen min-h-dvh w-screen bg-white overflow-hidden flex justify-center">
        <HomePage onLogOut={ResetLoggedInUser} />
      </div>
    );
  }

  return (
    <div className="h-screen min-h-dvh w-screen bg-white overflow-hidden flex justify-center">
      <div className="bg-white space-y-2 w-66">
        <Landing />
        <LogInForm onLoginSuccess={SetLoggedInUser}/>
        <RoundedButton label="Registger" color="red-500" filled={false} />
      </div>
    </div>
  );
}

export default App;
