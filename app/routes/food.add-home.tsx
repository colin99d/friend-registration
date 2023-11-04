import { Form, useActionData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import {
  redirect,
  json,
  type MetaFunction,
  type ActionFunctionArgs,
} from "@remix-run/node";
import i18next from "~/i18next.server";
import { SubmitButton } from "~/components/Buttons";
import { Input } from "~/components/Inputs";
import { db } from "~/drizzle/config.server";
import { homes } from "~/drizzle/schema.server";
import {
  validateAddress,
  validateCity,
  validateZipCode,
  validateEmail,
  validatePhone,
} from "~/utils/validators";

interface Errors {
  address?: string;
  city?: string;
  zipcode?: string;
  email?: string;
  phone?: string;
}

interface ActionData {
  errors?: Errors;
}

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
  const address = formData.get("address") as string;
  const address2 = formData.get("address2") as string;
  const city = formData.get("city") as string;
  const zipCode = formData.get("zipcode") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("telephone") as string;
  const language = await i18next.getLocale(request);

  const errors: Errors = {};

  if (!validateAddress(address)) {
    errors.address = "invalidaddress";
  }
  if (!validateCity(city)) {
    errors.city = "invalidcity";
  }
  if (!validateZipCode(zipCode)) {
    errors.zipcode = "invalidzip";
  }
  if (!validateEmail(email)) {
    errors.email = "invalidemail";
  }
  if (!validatePhone(phone)) {
    errors.phone = "invalidphone";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const response = await db
    .insert(homes)
    .values({
      address,
      address2,
      city,
      zipCode: parseInt(zipCode),
      email,
      phone,
      language,
    })
    .returning({ insertedId: homes.id });

  return redirect(`/food/add-owner/${response[0].insertedId}`);
}

export default function AddHome() {
  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;
  let { t } = useTranslation();
  return (
    <div>
      <h1 className="text-center my-8 text-2xl">{t("information1")}</h1>
      <div className="flex flex-col pt-12 w-full items-center">
        <Form method="post">
          <Input
            type="email"
            i18label="email"
            error={errors?.email}
            placeholder="example@gmail.com"
          />
          <Input
            type="tel"
            i18label="telephone"
            error={errors?.phone}
            placeholder="111-111-1111"
          />
          <Input
            i18label="address"
            placeholder={t("streetaddress")}
            error={errors?.address}
          />
          <Input placeholder={t("aptunit")} />
          <Input i18label="city" error={errors?.city} />
          <Input
            minLength={5}
            maxLength={5}
            type="number"
            i18label="zipcode"
            error={errors?.zipcode}
            placeholder="12345"
          />
          <SubmitButton className="w-full mt-4" value={t("submit")} />
        </Form>
      </div>
      <div className="w-full mt-20 flex flex flex-row-reverse"></div>
    </div>
  );
}
