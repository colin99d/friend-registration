import type { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

function InputBase({
  children,
  i18label,
  error,
}: {
  children: JSX.Element;
  i18label?: string;
  error?: string;
}) {
  let { t } = useTranslation();
  return (
    <div className={clsx({ "my-2": error, "my-4": !error })}>
      {i18label && (
        <label className="block" htmlFor={i18label}>
          {t(i18label)}
        </label>
      )}
      {children}
      {error && <p className="text-red-500">{t(error)}</p>}
    </div>
  );
}

export function Input({
  i18label,
  type = "text",
  placeholder,
  error,
  ...props
}: {
  i18label?: string;
  type?: "email" | "tel" | "text" | "number" | "date";
  placeholder?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <InputBase i18label={i18label} error={error}>
      <input
        type={type}
        name={i18label}
        id={i18label}
        placeholder={placeholder}
        className={clsx("border-2 block w-full", {
          "border-black": !error,
          "border-red-500": error,
        })}
        {...props}
      />
    </InputBase>
  );
}

export function I18Select({
  options,
  i18label,
  error,
  ...props
}: {
  options: string[];
  i18label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLSelectElement>) {
  let { t } = useTranslation();
  return (
    <InputBase i18label={i18label} error={error}>
      <select
        name={i18label}
        id={i18label}
        className={clsx("border-2 block w-full", {
          "border-black": !error,
          "border-red-500": error,
        })}
        {...props}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {t(option)}
          </option>
        ))}
      </select>
    </InputBase>
  );
}
