import { cn } from "@/lib/utils/helpers";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "new" | "soldOut";
  className?: string;
}

const variantStyles = {
  default: "bg-gray-100 text-gray-800",
  sale: "bg-red-500 text-white",
  new: "bg-blue-500 text-white",
  soldOut: "bg-gray-300 text-gray-600",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-semibold rounded",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
