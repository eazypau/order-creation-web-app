import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../../components/global/Button";
import { Footer } from "../../components/global/Footer";
import { NavBar } from "../../components/global/NavBar";
import cn from "../../locales/cn";
import en from "../../locales/en";
import Modal from "../../components/global/Modal";
import { Switch } from "@headlessui/react";
import { trpc } from "../../utils/trpc";
import { Loading } from "../../components/global/Loading";
import { useLoading } from "../../hooks/useLoading";
import { InputField } from "../../components/forms/InputField";
import { ProductObj } from "../../types/Product";
import Head from "next/head";

const Products = () => {
    let router = useRouter();
    let t = router.locale === "en" ? en : cn;
    const [showModal, setShowModal] = useState(false);
    const [modalHeading, setModalHeading] = useState("Create Product");
    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, setIsLoading } = useLoading();
    const [product, setProduct] = useState({
        id: 0,
        name: "",
        // quantity: 0,
        price: 0,
        active: false,
    });
    const [action, setAction] = useState<"create" | "update" | "添加" | "更新">(
        "create"
    );
    const [openPromptModal, setOpenPromptModal] = useState(false);

    const { data: productList, refetch } = trpc.getAllProducts.useQuery(
        { limit: 50 },
        {
            staleTime: 5 * 1000,
            select: (data) => data.products,
            onError(err) {
                console.error(err);
            },
        }
    );

    const createProductMutation = trpc.createProduct.useMutation({
        onSuccess: async () => {
            refetch();
        },
        onError(error) {
            console.error(error);
        },
    });

    const updateProductMutation = trpc.updateProduct.useMutation({
        onSuccess: async () => {
            refetch();
        },
        onError(error) {
            console.error(error);
        },
    });

    const deleteProductMutation = trpc.deleteProduct.useMutation({
        onSuccess: async () => {
            refetch();
        },
        onError(error) {
            console.error(error);
        },
    });

    // const { data: productList, refetch } = trpc.useQuery([
    //     "products.findAllProducts",
    // ]);

    // const createProductMutation = trpc.useMutation(["products.createProduct"], {
    //     onSuccess: async (data, variables, context) => {
    //         // console.log("product data: ", data);
    //         await refetch();
    //     },
    // });

    // const updateProductMutation = trpc.useMutation(["products.updateProduct"], {
    //     onSuccess: async () => {
    //         await refetch();
    //     },
    // });

    // const deleteProductMutation = trpc.useMutation(["products.deleteProduct"], {
    //     onSuccess: async () => {
    //         await refetch();
    //     },
    // });

    const openModal = (
        action: "create" | "update" | "添加" | "更新",
        product?: ProductObj
    ) => {
        setAction(action);
        if (["create", "添加"].includes(action)) {
            setProduct({
                id: 0,
                name: "",
                // quantity: 0,
                price: 0,
                active: false,
            });
            setModalHeading(t.createProduct);
        } else {
            setProduct(
                product || {
                    id: 0,
                    name: "",
                    price: 0,
                    active: false,
                }
            );
            setModalHeading(t.updateProduct);
        }
        setShowModal(true);
    };

    const openPromptModalAndSetId = (product: ProductObj) => {
        setProduct({ ...product });
        setOpenPromptModal(true);
    };

    const executeDeletePromptRespond = async () => {
        try {
            setIsLoading(true);
            await deleteProductMutation.mutateAsync({
                id: product.id,
            });
            setOpenPromptModal(false);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setOpenPromptModal(false);
            setIsLoading(false);
        }
    };

    // https://stackoverflow.com/questions/68326000/cant-assign-submit-event-type
    // for function call in form element, need to include e: React.FormEvent<HTMLFormElement>
    // if is using typescript
    const executeProductAction = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!product.name) {
            alert("please provide a name");
            return;
        }
        setIsLoading(true);
        if (["create", "添加"].includes(action)) {
            // console.log("craeting");
            try {
                const data = await createProductMutation.mutateAsync({
                    name: product.name,
                    price: Number(product.price),
                    active: product.active,
                });
                // console.log(data);
                setShowModal(false);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setShowModal(false);
                setIsLoading(false);
            }
        } else if (["update", "更新"].includes(action)) {
            // console.log("updating");
            try {
                const data = await updateProductMutation.mutateAsync({
                    id: Number(product.id),
                    name: product.name,
                    price: Number(product.price),
                    active: product.active,
                });
                setShowModal(false);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setShowModal(false);
                setIsLoading(false);
            }
        }
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

    return (
        <div className="bg-slate-200">
            <Head>
                <title>Products</title>
            </Head>
            {isLoading ? <Loading /> : ""}
            <Modal
                isOpen={showModal}
                heading={modalHeading}
                closeModal={(value = false) => {
                    setShowModal(value);
                }}
            >
                <form onSubmit={executeProductAction}>
                    <table className="w-full mt-4">
                        <tbody>
                            <tr>
                                <td className="table-form-label">
                                    <label htmlFor="name" className="w-20">
                                        {t.productName}:
                                    </label>
                                </td>
                                <td className="table-form-input">
                                    <InputField
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder={t.productName}
                                        hasBorder
                                        customTextAlign="text-center text-lg"
                                        value={product.name}
                                        onChange={setDataValue}
                                        autoComplete="off"
                                        required
                                    />
                                </td>
                            </tr>
                            {/* <tr>
                                <td className="table-form-label">
                                    <label htmlFor="quantity" className="w-20">
                                        {t.quantity}:
                                    </label>
                                </td>
                                <td className="table-form-input">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        value={product.quantity}
                                        onChange={setDataValue}
                                    />
                                </td>
                            </tr> */}
                            <tr>
                                <td className="table-form-label">
                                    <label htmlFor="price" className="w-20">
                                        {t.price}:
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
                                        {t.activate}:
                                    </label>
                                </td>
                                <td className="p-2 flex items-center">
                                    <Switch
                                        checked={product.active}
                                        onChange={setIsActive}
                                        className={`${
                                            product.active
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }
                  relative inline-flex h-[29px] w-[53px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                    >
                                        <span className="sr-only">
                                            Use setting
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`${
                                                product.active
                                                    ? "translate-x-6"
                                                    : "translate-x-0"
                                            }
                    pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="pt-3 px-2 flex justify-end">
                                    <Button
                                        type="submit"
                                        customWidth="capitalize w-24 py-3"
                                    >
                                        {["create", "添加"].includes(action)
                                            ? t.create
                                            : t.update}
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
            <Modal
                isOpen={openPromptModal}
                closeModal={() => setOpenPromptModal(false)}
                heading={`${t.delete} "${product.name}"`}
            >
                <div className="mt-2">
                    <p>
                        {router.locale === "en"
                            ? "Are you sure? (This is an irreversable action)"
                            : "你确定吗?（这是不可逆的动作）"}
                    </p>
                    <div className="mt-5 space-x-2">
                        <Button
                            type="button"
                            onClick={executeDeletePromptRespond}
                            customWidth="w-20 py-2 capitalize"
                        >
                            {t.yes}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setOpenPromptModal(false)}
                            customWidth="w-20 py-2 capitalize"
                        >
                            {t.cancel === "cancel" ? "no" : t.cancel}
                        </Button>
                    </div>
                </div>
            </Modal>
            <NavBar
                hasCTAButton={true}
                toggleSidebarToCreate={() => {
                    openModal("create");
                }}
                CTAButtonText={t.createProduct}
            />
            <div className="pt-10 px-3 w-11/12 xl:w-3/4 2xl:w-7/12 mx-auto body-height">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-max md:w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {/* <th scope="col" className="py-3 px-6">
                                    ID
                                </th> */}
                                <th scope="col" className="py-3 px-6">
                                    {t.productName}
                                </th>
                                {/* <th scope="col" className="py-3 px-6">
                                    {t.quantity}
                                </th> */}
                                <th scope="col" className="py-3 px-6">
                                    {t.price}
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    {t.activate}
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 px-6 lg:w-3/12 2xl:w-2/12"
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(productList || []).map((product) => (
                                <tr
                                    className="table-row-style"
                                    key={product.id}
                                >
                                    {/* <td className="item-column-one-style row-general-style">
                                        {product.id}
                                    </td> */}
                                    <td className="row-general-style">
                                        {product.name}
                                    </td>
                                    {/* <td className="row-general-style">
                                        {product.quantity}
                                    </td> */}
                                    <td className="row-general-style">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "MYR",
                                            currencyDisplay: "narrowSymbol",
                                        }).format(product.price)}
                                    </td>
                                    <td className="row-general-style capitalize">
                                        {product.active ? t.yes : t.no}
                                    </td>
                                    <td className="row-general-style flex justify-end">
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                openModal("update", product)
                                            }
                                            customWidth="w-20 py-1.5 capitalize"
                                        >
                                            {t.update}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                openPromptModalAndSetId(product)
                                            }
                                            customWidth="w-20 py-1.5 ml-2 capitalize"
                                        >
                                            {t.delete}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
