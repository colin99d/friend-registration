import { eq } from "drizzle-orm";
import { redirect, json } from "@remix-run/node";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { db } from "~/drizzle/config.server";
import { persons, homes } from "~/drizzle/schema.server";
import { validateInteger } from "~/utils/validators";
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!validateInteger(params.home)) {
    return redirect(`/food/welcome?error=100`);
  }
  const homeId = parseInt(params.home || "");
  const residents = await db
    .select({
      firstName: persons.firstName,
      lastName: persons.lastName,
      owner: persons.owner,
    })
    .from(persons)
    .where(eq(persons.home, homeId));
  const home = await db
    .select({ zipCode: homes.zipCode })
    .from(homes)
    .where(eq(homes.id, homeId));

  return json({ residents, home: home[0] });
}

export default function AddOwner() {
  const { residents, home } = useLoaderData<typeof loader>();
  let { t } = useTranslation();
  const points = (residents.length - 1) * 5 + 15;
  const owner = residents.find((item) => item.owner === true);
  return (
    <div>
      <Header title={t("completed")} description={t("completionmessage")} />
      <table className="border-black border-4 w-3/4 mx-auto">
        <tbody>
          <tr className="border-black border-2">
            <td>Name</td>
            <td>
              {owner?.firstName} {owner?.lastName}
            </td>
          </tr>
          <tr className="border-black border-2">
            <td>Zip Code</td>
            <td>{home.zipCode}</td>
          </tr>
          <tr className="border-black border-2">
            <td>Points</td>
            <td>{points}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
