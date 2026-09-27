"use client";

import { type ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-orange to-strawberry text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200",
  secondary:
    "bg-mango text-black shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200",
  outline:
    "border-2 border-orange text-orange bg-transparent hover:bg-orange hover:text-white transition-all duration-200",
  ghost:
    "bg-transparent hover:bg-mint/10 text-mint transition-all duration-200",
  danger:
    "bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-200",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
