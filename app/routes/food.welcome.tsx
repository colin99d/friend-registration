import { useTranslation } from "react-i18next";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function LangButton({ language, code }: { language: string; code: string }) {
  let { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language, (error) => {});
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 w-1/2"
      onClick={() => changeLanguage(code)}
    >
      {language}
    </button>
  );
}

export default function Index() {
  let { t } = useTranslation();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-center my-8 text-2xl">{t("welcome")} Grace</h1>
      <div className="flex flex-col pt-12 w-full items-center">
        <h2 className="text-xl pb-6">{t("langselect")}</h2>
        <LangButton language="English" code="en" />
        <LangButton language="Español" code="es" />
        <LangButton language="Русский" code="ru" />
      </div>
    </div>
  );
}
