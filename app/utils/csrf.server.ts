// app/utils/csrf.server.ts
import { CSRF } from "remix-utils/csrf/server";
import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const cookie = createCookie("csrf", {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  secrets: ["s3cr3t"],
});

export const csrf = new CSRF({
  cookie,
  formDataKey: "csrf",
  secret: "s3cr3t",
});
