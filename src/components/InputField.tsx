import React, { useState } from "react";

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  type?: string;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  type = "text",
  variant = "outlined",
  size = "md",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : "input";

  const sizeClasses: Record<string, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses: Record<string, string> = {
    outlined: "border border-gray-500 bg-white dark:bg-gray-800",
    filled: "bg-gray-200 dark:bg-gray-700 border border-gray-400",
    ghost: "bg-transparent border border-gray-400",
  };

  // space on the right so clear + toggle can sit inside the input
  const rightPaddingForActions =
    type === "password" ? "pr-24" : "pr-14"; // room for two or one actions

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 text-sm font-semibold text-gray-20"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          aria-busy={loading || undefined}
          aria-describedby={
            invalid && errorMessage
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={`w-full rounded-md focus:outline-none focus:ring-2 ${rightPaddingForActions}
            ${sizeClasses[size]} ${variantClasses[variant]}
            ${invalid ? "border-red-500 focus:ring-red-400 animate-shake" : "focus:ring-blue-600"}
            ${disabled ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400"}
          `}
        />

        {/* PRIORITY: loading > invalid > actions */}
        {/* Loading spinner */}
        {loading && (
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-gray-500 dark:text-gray-400"
            role="status"
            aria-live="polite"
          >
            <span className="animate-spin border-2 border-t-transparent rounded-full w-4 h-4" />
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {/* Invalid icon */}
        {!loading && invalid && (
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-lg"
            role="img"
            aria-label="Invalid input"
          >
            ❌
          </span>
        )}

        {/* Action buttons (clear + password toggle) */}
        {!loading && !invalid && (
          <div className="absolute inset-y-0 right-2 flex items-center gap-2">
            {/* Clear button only when there is value and not disabled */}
            {!!value && !disabled && (
              <button
                type="button"
                aria-label="Clear"
                className="px-1 text-gray-500 dark:text-gray-300 bg-transparent border-none outline-none cursor-pointer"
                onClick={() => {
                  // fire a synthetic onChange with empty value for controlled usage
                  onChange?.({ target: { value: "" } } as any);
                }}
              >
                ×
              </button>
            )}

            {/* Password toggle (blends with input; no background) */}
            {type === "password" && (
              <button
                type="button"
                className="px-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-transparent border-none outline-none cursor-pointer"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper / Error text */}
      {helperText && !invalid && (
        <span
          id={`${inputId}-helper`}
          className="text-xs text-gray-500 dark:text-gray-400 mt-1"
        >
          {helperText}
        </span>
      )}
      {invalid && errorMessage && (
        <span id={`${inputId}-error`} className="text-xs text-red-500 mt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
