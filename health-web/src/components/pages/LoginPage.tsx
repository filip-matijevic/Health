import { useRef, useState } from "react";
import { HttpError } from "../../lib/http";
import { setAccessToken } from "../../lib/token";
import { auth } from "../../services/auth";
import TextInput from "../inputs/TextInput";

type Props = {
    onLogIn: () => void;
  };

export default function LoginPage({onLogIn}:Props) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  async function Login(): Promise<void> {
    console.log("Hello");
    if (!userNameRef.current || !passwordRef.current){
        console.error("Refs not ready");
        return;
    }

    setInvalidCredentials(false);
    try {
      const res = await auth.login(userNameRef.current.value, passwordRef.current.value);
      console.log(res.accessToken);
      setAccessToken(res.accessToken);
      onLogIn();

      const checkName = await auth.me();
      console.log(checkName);
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e);
        setInvalidCredentials(true);
      }
    }
  }

  return (
    <div className="space-y-2 flex flex-col items-center">
      <div className="text-center inline-block">
        <p className="text-orange-600 font-bold text-5xl">HEALTH</p>
        <p className="text-gray-50 text-xs font-bold w-full tracking-normal">
          PAPER AND PEN ALSO WORK
        </p>
      </div>
      <TextInput label="user name" ref={userNameRef}/>
      <TextInput label="password" ref = {passwordRef}/>
      <button
        className="bg-orange-600 rounded-md h-11 px-3 text-gray-50"
        onClick={Login}
      >
        submit
      </button>

      {invalidCredentials &&
      (<div className="text-red-500 font-bold border-2 rounded-xl border-red-500 m-5 p-6">Invalid user name or password</div>)
      }
    </div>
  );
}
