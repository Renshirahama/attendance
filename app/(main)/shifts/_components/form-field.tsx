import type { ReactNode } from "react";

type FormFieldProps = {
  readonly label: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly children: ReactNode;
};

export function FormField({
  label,
  error,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1 text-xs text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
