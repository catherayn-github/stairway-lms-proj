import * as React from "react";
import { cn } from "@app/_utils";

interface Props extends React.ComponentProps<"input"> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div>
                <input
                    ref={ref}
                    type={type}
                    data-slot="input"
                    className={cn(
                        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex  w-full min-w-0 border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent rounded-[0.8rem] file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        error ? "border-destructive" : "border-[#BBCBD5] ",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                        "text-[#303030]",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-destructive text-[1.6rem] mt-[0.8rem]">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
