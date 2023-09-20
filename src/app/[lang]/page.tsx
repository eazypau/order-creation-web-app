import { Metadata } from "next";
//locale
import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-locale";
//views
import OrdersView from "@/views/orders";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //get locale
  const dictionary = await getDictionary(lang);

  return <OrdersView dictionary={dictionary} />;
}
