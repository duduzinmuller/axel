import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
}

export function Grid({
  columns = 2,
  gap = 4,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(`grid grid-cols-${columns} gap-${gap}`, className)}
      {...props}
    >
      {children}
    </div>
  );
}
