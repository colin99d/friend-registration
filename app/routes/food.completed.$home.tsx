import { eq } from "drizzle-orm";
import { redirect, json } from "@remix-run/node";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { db } from "~/drizzle/config.server";
import { persons, homes } from "~/drizzle/schema.server";
import { validateInteger } from "~/utils/validators";
import { checkZipCode } from "~/utils/helpers";
import Header from "~/components/Header";
import clsx from "clsx";

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
    .select({
      zipCode: homes.zipCode,
      address: homes.address,
      city: homes.city,
    })
    .from(homes)
    .where(eq(homes.id, homeId));

  if (residents.length === 0 || home.length === 0) {
    return redirect(`/food/welcome?error=101`);
  }

  const zipColor = checkZipCode(home[0].zipCode);

  return json({ residents, home: home[0], zipColor });
}

export default function AddOwner() {
  const { residents, home, zipColor } = useLoaderData<typeof loader>();
  let { t } = useTranslation();
  const points = (residents.length - 1) * 5 + 15;
  const owner = residents.find((item) => item.owner === true);
  return (
    <div>
      <Header title={t("completed")} description={t("completionmessage")} />
      <table className="border-black border-4 w-3/4 mx-auto">
        <tbody>
          <tr className="border-black border-2">
            <td className="border-black border-2">Name</td>
            <td>
              {owner?.firstName} {owner?.lastName}
            </td>
          </tr>
          <tr className="border-black border-2">
            <td className="border-black border-2">Address</td>
            <td>{home.address}</td>
          </tr>
          <tr className="border-black border-2">
            <td className="border-black border-2">City</td>
            <td>{home.city}</td>
          </tr>
          <tr className="border-black border-2">
            <td className="border-black border-2">Zip Code</td>
            <td>
              <div className="flex">
                <div
                  className={clsx("aspect-square rounded-full h-6 mr-2", {
                    "bg-red-500": zipColor === "red",
                    "bg-yellow-500": zipColor === "yellow",
                    "bg-green-500": zipColor === "green",
                  })}
                ></div>
                {home.zipCode}
              </div>
            </td>
          </tr>
          <tr className="border-black border-2">
            <td className="border-black border-2">Points</td>
            <td>{points}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
