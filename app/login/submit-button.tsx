"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export function SubmitButton({ children, pendingText, ...props }: any) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} aria-disabled={pending} type="submit">
      {isPending ? pendingText : children}
    </Button>
  );
}
