import React from "react";

export const Input = ({ children, ...props }: React.HTMLAttributes<HTMLInputElement> & { children: React.ReactNode }) => {
  return <input {...props} />;
};
