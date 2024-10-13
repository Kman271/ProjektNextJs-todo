"use client"
export interface buttonProps {
    onClick?: (e?: any) => void;
    label?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export interface submitButtonProps extends buttonProps {
    type?: "submit" | "button";
    handler?: (e?: any) => void;
}