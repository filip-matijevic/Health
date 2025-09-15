import type { ReactNode } from "react";
import { RoundedFull } from "../../primitives/Rounded";

type Props = {
    icon? : ReactNode;
    className? : string;
    placeholder? : string;
};

export default function InputFieldButton({icon, placeholder, className} : Props) {
  return (
    <RoundedFull className={`flex flex-row items-center bg-surface-a20 p-1 h-11 ${className ?? ""}`}>
      <input className="flex-1 w-full bg-transparent h-full rounded-full text-primary-a50 px-3" placeholder={placeholder}></input>
      <div className="
      aspect-square h-full p-2 text-surface-a10 bg-gradient-to-br from-primary-a0 to-primary-a30
      shadow-inner shadow-dark-a0/70      
      rounded-full"
      >{icon}</div>
    </RoundedFull>
  );
}
