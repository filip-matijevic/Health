import { forwardRef } from "react";

type Props = {
  placeholder?: string;
};

const MaterialInput = forwardRef<HTMLInputElement, Props>(({ placeholder }, ref) => {
  return (
    <input
      className="bg-surface-a10 
      shadow-inner shadow-surface-tonal-a0
      w-full h-11 px-4 rounded-full placeholder:text-surface-a50"
      placeholder={placeholder}
      ref={ref}
    ></input>
  );
});

export default MaterialInput;
