"use client"
export interface buttonProps {
    onClick?: (e?: any) => void;
    label: string;
    className?: string;
}

export interface submitButtonProps extends buttonProps {
    type?: "submit" | "button";
    handler?: (e: any) => void;
}