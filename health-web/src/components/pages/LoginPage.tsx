import { useRef } from "react";
import useFetch from "../../hooks/useFetch";
import type { LoginResponse } from "../../services/auth";
import MaterialInput from "../inputs/MaterialInput";
import MaterialRoundedButton from "../inputs/MaterialRoundedButton";

type Props = {
    onLoginSuccess: (token: string) => void;
  };

export default function LoginPage({onLoginSuccess} : Props) {
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { load, updateRequestOptions, loading } = useFetch<LoginResponse>(
      "api/auth/login",
      { method: "POST", headers: { "Content-Type": "application/json" } },
      { immediate: false }
    );

    async function submit() {
        if (!userNameRef.current || !passwordRef.current) return;
    
        updateRequestOptions({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userNameRef.current?.value,
            password: passwordRef.current?.value,
          }),
        });
        console.log("load begin");
        const response = await load();
        if (response){
            onLoginSuccess(response.accessToken);
        }
      }

      if (loading){
        return (
            <div className="flex-col gap-4 w-full flex items-center justify-top pt-22">
              <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
              >
                <div
                  className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
              </div>
            </div>
            )
      }
  return (
    <div className="pt-20 w-full mx-4 space-y-2">
      <MaterialInput placeholder="user name" ref={userNameRef}/>
      <MaterialInput placeholder="password" ref={passwordRef}/>
      <div className="flex flex-col items-end space-y-2 -my-1">
        <p className="text-surface-a50 text-xs pr-3">Forgor password?</p>
        <MaterialRoundedButton label="Sign in" onClick={submit}/>
      </div>
    </div>
  );
}
