import type { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

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
  let { t } = useTranslation();
  return (
    <div className="my-4">
      {i18label && (
        <label className="block" htmlFor={i18label}>
          {t(i18label)}
        </label>
      )}
      <input
        type={type}
        name={i18label}
        id={i18label}
        placeholder={placeholder}
        className="w-full border-2 border-black block"
        {...props}
      />
      {error && <p className="text-red-500">{t(error)}</p>}
    </div>
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
    <div className="my-4">
      {i18label && (
        <label className="block" htmlFor={i18label}>
          {t(i18label)}
        </label>
      )}
      <select
        name={i18label}
        id={i18label}
        className="border-2 border-black block w-full"
        {...props}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {t(option)}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500">{t(error)}</p>}
    </div>
  );
}
