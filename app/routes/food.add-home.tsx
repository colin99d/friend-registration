import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import {
  redirect,
  type MetaFunction,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { SubmitButton } from "~/components/Buttons";

export const meta: MetaFunction = () => {
  return [
    { title: "Register" },
    {
      name: "description",
      content: "Register as a new friend for the Grace Care Center.",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  const email = formData.get("email");
  console.log(email);
  return redirect(`/food/add-owner/${1}`);
}

function Input({
  i18label,
  type = "text",
  placeholder,
  ...props
}: {
  i18label?: string;
  type?: "email" | "tel" | "text" | "number";
  placeholder?: string;
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
        className={clsx("border-2 border-black block")}
        {...props}
      />
    </div>
  );
}

export default function AddHome() {
  let { t } = useTranslation();
  return (
    <div>
      <h1 className="text-center my-8 text-2xl">{t("information1")}</h1>
      <div className="flex flex-col pt-12 w-full items-center">
        <Form method="post">
          <Input type="email" i18label="email" />
          <Input type="tel" i18label="telephone" />

          <Input i18label="address" placeholder={t("streetaddress")} />
          <Input placeholder={t("aptunit")} />
          <Input i18label="city" />
          <Input minLength={5} maxLength={5} type="number" i18label="zipcode" />
          <SubmitButton className="w-full mt-4" value={t("submit")} />
        </Form>
      </div>
      <div className="w-full mt-20 flex flex flex-row-reverse"></div>
    </div>
  );
}
