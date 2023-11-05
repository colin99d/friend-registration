import { eq, and } from "drizzle-orm";
import { redirect, json } from "@remix-run/node";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { db } from "~/drizzle/config.server";
import { persons } from "~/drizzle/schema.server";
import { validateInteger } from "~/utils/validators";
import { LinkButton } from "~/components/Buttons";
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
  // We do not want a second owner added EVER
  const response = await db
    .select({ firstName: persons.firstName, lastName: persons.lastName })
    .from(persons)
    .where(and(eq(persons.home, homeId), eq(persons.owner, false)));

  return json({ dependents: response, homeId });
}

export default function AddOwner() {
  const { dependents, homeId } = useLoaderData<typeof loader>();
  let { t } = useTranslation();
  return (
    <div>
      <Header title={t("dependents")} description={t("dependentexplanation")} />
      <div className="w-3/4 mx-auto">
        <LinkButton to={`/food/add-dependent/${homeId}`} className="w-1/2">
          {t("anotherdependent")}
        </LinkButton>
        <table className="border-black border-4 w-full mt-4">
          <tbody>
            {dependents.map((item, i) => {
              let fullName = `${item.firstName} ${item.lastName}`;
              if (fullName.length > 27) {
                fullName = `${fullName.slice(0, 27)}...`;
              }
              return (
                <tr key={i} className="border-black border-2">
                  <td>{fullName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full mt-20 flex flex flex-row-reverse">
        <LinkButton to={`/food/completed/${homeId}`} className="w-1/3 mr-4">
          {t("next")}
        </LinkButton>
      </div>
    </div>
  );
}
