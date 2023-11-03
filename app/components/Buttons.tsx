import { Link } from "@remix-run/react";
import clsx from "clsx";

const cssString = "font-bold py-2 px-4 rounded w-1/2 text-center";

export function Button({
  children,
  onClick,
  className,
}: {
  children: JSX.Element | string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={clsx(cssString, className)}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  children,
  className,
}: {
  to: string;
  children: JSX.Element | string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={clsx(
        "bg-grace-500 hover:bg-grace-700 text-white ",
        cssString,
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SubmitButton({
  className,
  value,
}: {
  className?: string;
  value: string;
}) {
  return (
    <input
      value={value}
      type="submit"
      className={clsx(
        "bg-grace-500 hover:bg-grace-700 text-white",
        cssString,
        className
      )}
    />
  );
}
