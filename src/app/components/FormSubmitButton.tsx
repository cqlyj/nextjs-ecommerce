"use client";

import React, { ComponentProps, use } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      type="submit"
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};

export default FormSubmitButton;
