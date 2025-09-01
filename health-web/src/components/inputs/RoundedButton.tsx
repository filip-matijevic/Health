import type { ButtonHTMLAttributes } from "react";

type RoundedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  filled: boolean;
};

export default function RoundedButton({
  label,
  filled,
  className = "",
  ...props
}: RoundedButtonProps) {
    const textColor = filled ? "text-white" : "text-blue-500"
    const bgColor = filled ? "bg-blue-500" : "bg-transparent"
  return (
    <div 
    className={`border-2 rounded-2xl border-blue-500 ${filled ? 'p-0' : 'p-0.5 border-dashed'} ${className}`}>
      <button
        {...props}
        className={`px-4 py-2 w-full h-full ${textColor} font-bold ${bgColor} rounded-[13px] uppercase `}
      >
        {label}
      </button>
    </div>
  );
}
