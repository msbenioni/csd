import React from "react";

export const Form = ({ children, ...props }: React.HTMLAttributes<HTMLFormElement> & { children: React.ReactNode }) => {
  return <form {...props}>{children}</form>;
};
