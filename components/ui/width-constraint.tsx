import { WidthConstraintProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function WidthConstraint({
  className,
  children,
}: WidthConstraintProps) {
  return (
    <div
      className={cn("w-11/12 sm:w-5/6 md:w-4/5 max-w-8xl mx-auto", className)}
    >
      {children}
    </div>
  );
}
