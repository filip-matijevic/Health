import { useEffect, useState } from "react";
import LoginPage from "./components/pages/LoginPage";
import { auth } from "./services/auth";
import { HttpError } from "./lib/http";

function App() {

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await auth.me();               // will throw if token invalid/missing
        setIsAuthenticated(true);
        console.log(user);
        setName(user.name)
      } catch (e) {
        if (e instanceof HttpError) {
          console.warn("Auth check failed:", e.status, e.body);
        } else {
          console.error("Unexpected error:", e);
        }
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);


  return (
    <div className="h-screen min-h-dvh w-screen bg-gray-800 overflow-hidden">
      {loading ?? (<div className="h-screen flex items-center justify-center text-gray-50">
        Loading...
      </div>)}

      {!isAuthenticated ? (<LoginPage/>) : (<div className="text-green-500">Welcome user!!!! {name}</div>)}
    </div>
  );
}

export default App;
