//react
import { Metadata } from "next";
//locale
import { Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-locale";
//components
import ProductsView from "@/views/products";
//headlessui

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //get locale
  const dictionary = await getDictionary(lang);

  return (
    <>
      <ProductsView dictionary={dictionary} />
    </>
  );
}
