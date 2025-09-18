import type { HTMLAttributes, ReactNode } from "react";
import React, { forwardRef } from "react";

type Props = {
    children? : ReactNode;
    className? : string;
} & HTMLAttributes<HTMLDivElement>;

export function RoundedBase({children, className, ...rest} : Props){
    return (
    <div className={`rounded-xl border-1 border-surface-a0 shadow-inner shadow-dark-a0/70 ${className ?? ""}`} {...rest}>
        {children}
    </div>)
}

export function RoundedFull({children, className, ...rest} : Props){
    return (
    <div className={`rounded-full border-1 border-surface-a10 shadow-inner shadow-dark-a0/70 ${className ?? ""}`} {...rest}>
        {children}
    </div>)
}


type GlassSurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Tailwind background tint, e.g. "bg-white/10" */
  tint?: string;
};

export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ className = "", tint = "bg-white/0", children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          // base glass look
          "backdrop-blur-md shadow-inner shadow-white/20",
          tint,
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

GlassSurface.displayName = "GlassSurface";