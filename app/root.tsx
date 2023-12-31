import {
  type LinksFunction,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import styles from "./tailwind.css";
import { csrf } from "~/utils/csrf.server";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  let [token, cookieHeader] = await csrf.commitToken();
  let locale = await i18next.getLocale(request);
  return json({ locale, token }, { headers: { "set-cookie": cookieHeader } });
}

export let handle = { i18n: "common" };

export default function App() {
  let { locale, token } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();
  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthenticityTokenProvider token={token}>
          <Outlet />
        </AuthenticityTokenProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
