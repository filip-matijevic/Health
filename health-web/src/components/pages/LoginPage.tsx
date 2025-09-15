import { useRef } from "react";
import useFetch from "../../hooks/useFetch";
import type { LoginResponse } from "../../services/auth";
import MaterialInput from "../inputs/MaterialInput";
import MaterialRoundedButton from "../inputs/MaterialRoundedButton";
import InputFieldButton from "../inputs/inputFields/InputFieldButton";
import PetiteInputField from "../inputs/simplicit/PetiteInputField";
import LoadingView from "../views/LoadingView";

type Props = {
  onLoginSuccess: (token: string) => void;
};

export default function LoginPage({ onLoginSuccess }: Props) {
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
    if (response) {
      onLoginSuccess(response.accessToken);
    }
  }
  return (
    <div className="pt-20 w-full mx-4 space-y-2">
      {loading ?? <LoadingView />}
      <div className="flex flex-col px-20 space-y-2">
        <PetiteInputField placeholder="username" ref={userNameRef} />
        <PetiteInputField placeholder="password" ref={passwordRef} />
      </div>
      <div className="flex flex-col items-center space-y-2 pt-5">
        <MaterialRoundedButton label="Sign in" onClick={submit} />
      </div>
    </div>
  );
}
