import { eq, and } from "drizzle-orm";
import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type {
  MetaFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "~/components/Buttons";
import { Input, I18Select } from "~/components/Inputs";
import { db } from "~/drizzle/config.server";
import { persons } from "~/drizzle/schema.server";
import {
  validateName,
  validateBirthday,
  validateGender,
  validateInteger,
} from "~/utils/validators";
import Header from "~/components/Header";

interface Errors {
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: string;
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!validateInteger(params.home)) {
    return redirect(`/food/welcome?error=100`);
  }
  const homeId = parseInt(params.home || "");
  // We do not want a second owner added EVER
  const response = await db
    .select({ id: persons.id })
    .from(persons)
    .where(and(eq(persons.home, homeId), eq(persons.owner, true)));
  if (response.length > 0) {
    return redirect(`/food/dependents/${params.home}`);
  }
  return null;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const birthday = formData.get("birthdate") as string;
  const gender = formData.get("gender") as string;

  const errors: Errors = {};
  if (!validateInteger(params.home)) {
    return redirect(`/food/welcome?error=100`);
  }
  if (!validateName(firstName)) {
    errors.firstname = "invalidfirstname";
  }
  if (!validateName(lastName)) {
    errors.lastname = "invalidlastname";
  }
  if (!validateBirthday(birthday)) {
    errors.birthdate = "invalidbirthdate";
  }
  if (!validateGender(gender)) {
    errors.gender = "invalidgender";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  await db.insert(persons).values({
    firstName,
    lastName,
    birthday,
    gender,
    relationshipToOwner: "self",
    home: parseInt(params.home || ""),
    owner: true,
  });

  return redirect(`/food/dependents/${params.home}`);
}

export default function AddOwner() {
  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;
  let { t } = useTranslation();
  return (
    <div>
      <Header title={t("addowner")} />
      <div className="flex flex-col pt-12 w-full items-center">
        <Form method="post">
          <Input i18label="firstname" error={errors?.firstname} />
          <Input i18label="lastname" error={errors?.lastname} />
          <Input type="date" i18label="birthdate" error={errors?.birthdate} />
          <I18Select
            options={["male", "female"]}
            i18label="gender"
            error={errors?.gender}
          />
          <SubmitButton className="w-full mt-4" value={t("submit")} />
        </Form>
      </div>
    </div>
  );
}
