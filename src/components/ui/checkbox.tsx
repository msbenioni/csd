import React from "react";

export const Checkbox = ({ children, ...props }: React.HTMLAttributes<HTMLInputElement> & { children: React.ReactNode }) => {
  return <input type="checkbox" {...props} />;
};
