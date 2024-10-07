"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/Button";

export function Submit({className, children} : {className: string, children: React.ReactElement}) {
  const status = useFormStatus();
  
  return <Button pending={status.pending} className={className}>
    {children}
  </Button>
}
