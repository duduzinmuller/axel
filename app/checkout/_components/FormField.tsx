import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  optional?: boolean;
}

export function FormField({ label, children, optional }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-muted-foreground text-xs">(opcional)</span>
        )}
      </Label>
      {children}
    </div>
  );
}
