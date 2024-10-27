import React from "react";

export const Label = ({ children, ...props }: React.HTMLAttributes<HTMLLabelElement> & { children: React.ReactNode }) => {
  return <label {...props}>{children}</label>;
};
