import { useTranslation } from "react-i18next";
import { type MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";

import { Button, LinkButton } from "~/components/Buttons";
import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Register" },
    {
      name: "description",
      content: "Register as a new friend for the Grace Care Center.",
    },
  ];
};

function LangButton({ language, code }: { language: string; code: string }) {
  let { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language, (error) => {});
  };
  return (
    <Button
      className="my-4 border-black border-4"
      onClick={() => changeLanguage(code)}
    >
      {language}
    </Button>
  );
}

function ErrorBlock({ error }: { error?: null | string }) {
  let { t } = useTranslation();
  if (error === undefined || error === null) return null;
  return (
    <div className="bg-red-200 w-3/4 mx-auto">
      <p className="text-center">{t("unexpectederror")}</p>
      <p className="text-center">Error code: {error}</p>
    </div>
  );
}

export default function Welcome() {
  let { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get("error");
  return (
    <div>
      <Header title={t("welcome") + " Grace"} />
      <ErrorBlock error={error} />
      <div className="flex flex-col pt-4 w-full items-center">
        <h2 className="text-xl pb-6">{t("langselect")}</h2>
        <LangButton language="English" code="en" />
        <LangButton language="Español" code="es" />
        <LangButton language="Русский" code="ru" />
        <LangButton language="Türkçe" code="tr" />
      </div>
      <div className="w-full mt-20 flex flex flex-row-reverse">
        <LinkButton to="/food/add-home" className="w-1/3 mr-4">
          {t("next")}
        </LinkButton>
      </div>
    </div>
  );
}
