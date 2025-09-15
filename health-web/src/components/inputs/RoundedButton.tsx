import type { ButtonHTMLAttributes, ReactNode } from "react";
import { RoundedFull } from "../primitives/Rounded";

type Props = {
  label?: string;
  className?: string;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function RoundedButton({
  label,
  icon,
  className = "",
  ...rest
}: Props) {
  return (
    <RoundedFull className={`${className ?? ""}`}>
      <button
        className={`flex flex-row h-full aspect-square items-center justify-center ${(icon && label) ? "mr-2" : ""}`}
        {...rest}
      >
        {icon && <div className="flex aspect-square h-full p-2">{icon}</div>}
        {label && <div className="flex-1">{label}</div>}
      </button>
    </RoundedFull>
  );
}
