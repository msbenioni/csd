import React from "react";

export const Dialog = ({ children, ...props }: React.HTMLAttributes<HTMLDialogElement> & { children: React.ReactNode }) => {
  return <dialog {...props}>{children}</dialog>;
};
