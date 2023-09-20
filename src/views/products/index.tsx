"use client";
//react
import Head from "next/head";
import { useEffect, useState } from "react";
//components
import { Button } from "@/components/global/Button";
import { Modal } from "@/components/global/Modal";
import { InputField } from "@/components/forms/InputField";
import { NavBar } from "@/components/global/NavBar";
import { Footer } from "@/components/global/Footer";
//store
import { useActionModalStore } from "@/store/actionModal";
import { usePromptModalStore } from "@/store/promptModal";
//types
import { ProductObj } from "@/types/Product";
//headlessui
import { Switch } from "@headlessui/react";
//firebase
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  updateProductById,
} from "@/firebase/firestoreFunctions";
import { productInitialState } from "@/utils/const";

export default function ProductsView({ dictionary }: any) {
  //const
  const navBarLabels = {
    brand: dictionary.brand,
    orders: dictionary.orders,
    products: dictionary.products,
    completed: dictionary.completed,
  };
  //store
  const {
    isActionModalOpen,
    setIsActionModalOpen,
    actionModalHeading,
    setActionModalHeading,
  } = useActionModalStore();
  const { isPromptModalOpen, setIsPromptModalOpen, promptModalHeading } =
    usePromptModalStore();

  //state
  const [product, setProduct] = useState({
    id: "",
    name: "",
    // quantity: 0,
    price: 0,
    active: false,
  });
  const [action, setAction] = useState<"create" | "update" | "添加" | "更新">(
    "create"
  );
  const [productList, setProductList] = useState<ProductObj[]>([]);

  //function
  const getProducts = async () => {
    const products: ProductObj[] = [];
    const data = await getAllProducts();
    data?.forEach((item) => products.push(item.data() as ProductObj));
    if (products.length > 0) {
      setProductList(products);
    } else {
      setProductList([]);
    }
  };
  const openModal = (
    action: "create" | "update" | "添加" | "更新",
    product?: ProductObj
  ) => {
    setAction(action);
    if (["create", "添加"].includes(action)) {
      setProduct(productInitialState);
      setActionModalHeading(dictionary.createProduct);
    } else {
      setProduct(product || productInitialState);
      setActionModalHeading(dictionary.updateProduct);
    }
    setIsActionModalOpen(true);
  };

  const openPromptModalAndSetId = (product: ProductObj) => {
    setProduct({ ...product });
    setIsPromptModalOpen(true);
  };

  const executeDeletePromptRespond = async () => {
    try {
      //   setIsLoading(true);
      await deleteProductById(product);
      setIsPromptModalOpen(false);
      await getProducts();
      //   setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsPromptModalOpen(false);
      //   setIsLoading(false);
    }
  };

  // https://stackoverflow.com/questions/68326000/cant-assign-submit-event-type
  // for function call in form element, need to include e: React.FormEvent<HTMLFormElement>
  // if is using typescript
  const executeProductAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product.name) {
      alert("please provide a name");
      return;
    }
    // setIsLoading(true);
    if (["create", "添加"].includes(action)) {
      try {
        await createProduct(product);
        setIsActionModalOpen(false);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsActionModalOpen(false);
        // setIsLoading(false);
      }
    } else if (["update", "更新"].includes(action)) {
      try {
        await updateProductById(product);
        setIsActionModalOpen(false);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsActionModalOpen(false);
        // setIsLoading(false);
      }
    }
    await getProducts();
  };

  const setDataValue = (e: any) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const setIsActive = () => {
    if (product.active) {
      setProduct((prev) => ({
        ...prev,
        active: false,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        active: true,
      }));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBar
        toggleSidebarToCreate={() => {
          openModal("create");
        }}
        hasCTAButton={true}
        CTAButtonText="Create Product"
        labels={navBarLabels}
      />
      <Head>
        <title>Products</title>
      </Head>
      <Modal
        isOpen={isActionModalOpen}
        heading={actionModalHeading}
        closeModal={(value = false) => {
          setIsActionModalOpen(value);
        }}
      >
        <form onSubmit={executeProductAction}>
          <table className="w-full mt-4">
            <tbody>
              <tr>
                <td className="table-form-label">
                  <label htmlFor="name" className="w-20">
                    {dictionary.productName}:
                  </label>
                </td>
                <td className="table-form-input">
                  <InputField
                    type="text"
                    name="name"
                    id="name"
                    placeholder={dictionary.productName}
                    hasBorder
                    customTextAlign="text-center text-lg"
                    value={product.name}
                    onChange={setDataValue}
                    autoComplete="off"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="table-form-label">
                  <label htmlFor="price" className="w-20">
                    {dictionary.price}:
                  </label>
                </td>
                <td className="table-form-input">
                  {/* https://stackoverflow.com/questions/34057595/allow-2-decimal-places-in-input-type-number */}
                  <InputField
                    type="text"
                    name="price"
                    id="price"
                    placeholder="5.50"
                    hasBorder
                    customTextAlign="text-center text-lg"
                    value={product.price}
                    pattern="^\d*(\.\d{0,2})?$"
                    onChange={setDataValue}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="table-form-label">
                  <label htmlFor="" className="w-20">
                    {dictionary.activate}:
                  </label>
                </td>
                <td className="p-2 flex items-center">
                  <Switch
                    checked={product.active}
                    onChange={setIsActive}
                    className={`${
                      product.active ? "bg-green-500" : "bg-red-500"
                    }
                  relative inline-flex h-[29px] w-[53px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        product.active ? "translate-x-6" : "translate-x-0"
                      }
                    pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="pt-3 px-2 flex justify-end">
                  <Button type="submit" customWidth="capitalize w-24 py-3">
                    {["create", "添加"].includes(action)
                      ? dictionary.create
                      : dictionary.update}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
      <Modal
        isOpen={isPromptModalOpen}
        closeModal={() => setIsPromptModalOpen(false)}
        heading={promptModalHeading}
      >
        <div className="mt-2">
          <p>{dictionary.deletePrompt}</p>
          <div className="mt-5 space-x-2">
            <Button
              type="button"
              onClick={executeDeletePromptRespond}
              customWidth="w-20 py-2 capitalize"
            >
              {dictionary.yes}
            </Button>
            <Button
              type="button"
              onClick={() => setIsPromptModalOpen(false)}
              customWidth="w-20 py-2 capitalize"
            >
              {dictionary.cancel === "cancel" ? "no" : dictionary.cancel}
            </Button>
          </div>
        </div>
      </Modal>
      <div className="pt-10 px-3 w-11/12 xl:w-1/2 2xl:w-7/12 mx-auto body-height">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-max md:w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  {dictionary.productName}
                </th>
                <th scope="col" className="py-3 px-6">
                  {dictionary.price}
                </th>
                <th scope="col" className="py-3 px-6">
                  {dictionary.activate}
                </th>
                <th scope="col" className="py-3 px-6 lg:w-3/12 2xl:w-2/12"></th>
              </tr>
            </thead>
            <tbody>
              {(productList || []).map((product) => (
                <tr className="table-row-style" key={product.id}>
                  <td className="row-general-style">{product.name}</td>
                  <td className="row-general-style">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "MYR",
                      currencyDisplay: "narrowSymbol",
                    }).format(product.price)}
                  </td>
                  <td className="row-general-style capitalize">
                    {product.active ? dictionary.yes : dictionary.no}
                  </td>
                  <td className="row-general-style flex justify-end">
                    <Button
                      type="button"
                      onClick={() => openModal("update", product)}
                      customWidth="w-20 py-1.5 capitalize"
                    >
                      {dictionary.update}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => openPromptModalAndSetId(product)}
                      customWidth="w-20 py-1.5 ml-2 capitalize"
                    >
                      {dictionary.delete}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer
        labels={{
          allRightsReserve: dictionary.allRightsReserve,
          brand: dictionary.brand,
        }}
      />
    </>
  );
}
