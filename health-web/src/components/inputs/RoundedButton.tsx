import { ButtonHTMLAttributes } from "react";

type RoundedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function RoundedButton({ label, className = "", ...props }: RoundedButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md text-white font-semibold ${className}`}
    >
      {label}
    </button>
  );
}