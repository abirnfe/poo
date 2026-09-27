"use client";

import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "pending" | "completed";
  className?: string;
}

const variantClasses = {
  pending: "bg-mango text-black",
  completed: "bg-mint text-white",
};

export function Badge({
  children,
  variant = "pending",
  className,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold
        ${variantClasses[variant]}
        ${className || ""}
      `}
    >
      {children}
    </span>
  );
}
