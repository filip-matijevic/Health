import type { HTMLAttributes, ReactNode } from "react";

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