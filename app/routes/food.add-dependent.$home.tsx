import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type {
  LoaderFunctionArgs,
  MetaFunction,
  ActionFunctionArgs,
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
  validateRelationship,
  validateInteger,
} from "~/utils/validators";
import Header from "~/components/Header";

interface Errors {
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: string;
  relationship?: string;
}

export const relationships = [
  "self",
  "mother",
  "father",
  "son",
  "daughter",
  "grandson",
  "granddaughter",
  "aunt",
  "uncle",
  "brother",
  "sister",
];

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
  return null;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const birthday = formData.get("birthdate") as string;
  const gender = formData.get("gender") as string;
  const relationshipToOwner = formData.get("relationship") as string;

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
  if (!validateRelationship(relationshipToOwner)) {
    errors.relationship = "invalidrelationship";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  await db.insert(persons).values({
    firstName,
    lastName,
    birthday,
    gender,
    relationshipToOwner,
    home: parseInt(params.home || ""),
    owner: false,
  });

  return redirect(`/food/dependents/${params.home}`);
}

export default function AddOwner() {
  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;
  let { t } = useTranslation();
  return (
    <div>
      <Header title={t("adddependent")} />
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
          <I18Select
            options={relationships}
            i18label="relationship"
            error={errors?.relationship}
          />
          <SubmitButton className="w-full mt-4" value={t("submit")} />
        </Form>
      </div>
    </div>
  );
}
