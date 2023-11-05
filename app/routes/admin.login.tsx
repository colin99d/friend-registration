import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { SubmitButton, Button, LinkButton } from "~/components/Buttons";
import { Input } from "~/components/Inputs";

import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    {
      name: "description",
      content: "Login to the Grace Care Center Admin Page.",
    },
  ];
};

interface Errors {
  username?: string;
  password?: string;
}
interface ActionData {
  errors?: Errors;
}

export default function Welcome() {
  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;
  return (
    <div>
      <Header title="Admin Page" />
      <div className="flex flex-col pt-4 w-full items-center">
        <Form method="post">
          <Input i18label="Username" error={errors?.username} />
          <Input i18label="Password" error={errors?.password} />
          <SubmitButton className="w-full mt-4" value="Login" />
        </Form>
      </div>
    </div>
  );
}
