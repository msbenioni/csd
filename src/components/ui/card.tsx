import React from "react";

const Card = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6" {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="mb-4" {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className="text-xl font-semibold" {...props}>
      {children}
    </h3>
  );
};

const CardContent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };

const CardDescription = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className="text-gray-600" {...props}>
      {children}
    </p>
  );
};

export { CardDescription };

const CardFooter = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="mt-4" {...props}>
      {children}
    </div>
  );
};

export { CardFooter };
