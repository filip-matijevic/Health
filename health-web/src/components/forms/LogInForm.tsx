import { useRef } from "react";
import RoundedButton from "../inputs/RoundedButton";
import TextInput from "../inputs/TextInput";
import { useLogin } from "../../hooks/useLogin";

type Props = {
    onLoginSuccess: () => void;
  };

export default function LogInForm({onLoginSuccess} : Props) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {loading, error, login} = useLogin();

  const onSubmit = async () => {
    if (!userNameRef.current || !passwordRef.current) return;
    try {
      await login(userNameRef.current.value, passwordRef.current.value);
      // TODO: navigate / emit success callback here if needed
      onLoginSuccess();
    } catch {
      // error state already handled in hook
      console.error(error);
    }
  };

  return (
    <div className="relative min-w-20 min-h-20 h-fit border-2 border-dashed rounded-2xl border-blue-500 p-0.5 space-y-2">
      <TextInput ref={userNameRef} label="user name" />
      <TextInput ref={passwordRef} label="password" type="password" />
      <div className="h-1"></div>
      <RoundedButton label="confirm" filled={true} onClick={onSubmit} />
      {loading && (
        <div className="absolute inset-0 backdrop-blur-sm rounded-2xl flex justify-center items-center font-extrabold text-blue-500 bg-white/50">
          LOADING
        </div>
      )}
    </div>
  );
}
