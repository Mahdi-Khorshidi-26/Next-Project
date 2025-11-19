import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/helpers";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-black transition-colors",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
