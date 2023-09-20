import { Metadata } from "next";
//locale
import { Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-locale";
//views
import CompletedOrdersView from "@/views/completed";

export const metadata: Metadata = {
  title: "Completed Orders",
};

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //get locale
  const dictionary = await getDictionary(lang);

  return <CompletedOrdersView dictionary={dictionary} />;
}
