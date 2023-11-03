import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log(params.home);
  return json({ ok: true });
};

export default function AddHome() {
  let { t } = useTranslation();
  return (
    <div>
      <h1 className="text-center my-8 text-2xl">{t("addowner")}</h1>
      <div className="w-full mt-20 flex flex flex-row-reverse"></div>
    </div>
  );
}
