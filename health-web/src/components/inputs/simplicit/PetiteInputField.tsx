import * as React from "react";

export type PetiteInputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const PetiteInputField = React.forwardRef<HTMLInputElement, PetiteInputFieldProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        className="placeholder-surface-a30 
          h-11
          border-b-2 
          border-surface-a50 
          text-center 
          text-surface-a50
          focus:outline-none
          focus:border-light-a0
          focus:text-light-a0
          transition-colors
          duration-200"
        {...props}
      />
    );
  }
);

PetiteInputField.displayName = "PetiteInputField";

export default PetiteInputField;