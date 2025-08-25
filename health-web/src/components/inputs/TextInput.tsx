import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
  }

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({label}, ref)=>{
    return (
        <div className="h-11 mx-3">
            <input 
            className="w-full h-full px-3
            border-b-1
            text-gray-300
            border-gray-300
            focus:border-gray-50
            focus:border-b-2"
            ref={ref}
            type="text"
            placeholder={label}>
            </input>
        </div>
    );
});
export default TextInput;