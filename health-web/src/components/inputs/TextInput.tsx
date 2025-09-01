import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    typpe?: string;
  }

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({label, type="text"}, ref)=>{
    return (
        <div className="h-11">
            <input 
            className="w-full h-full px-3
            border-1
            rounded-xl
            text-blue-500
            border-blue-500
            focus:border-blue-500
            placeholder:text-blue-400
            focus:border-b-2"
            ref={ref}
            type={type}
            placeholder={label}>
            </input>
        </div>
    );
});
export default TextInput;