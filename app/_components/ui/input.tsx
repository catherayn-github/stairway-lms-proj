import * as React from "react";

import { cn } from "@app/_utils";

interface Props extends React.ComponentProps<"input"> {
  error?: string;
}

function Input({ className, type, error, ...props }: Props) {
  return (
    <div>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border-input flex rounded-md bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none",
          "file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {error && <p className="text-destructive mt-[.4rem] !text-sm">{error}</p>}
    </div>
  );
}

export { Input };
