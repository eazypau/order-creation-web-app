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

const Products = () => {
    let router = useRouter();
    let t = router.locale === "en" ? en : cn;
    const [showModal, setShowModal] = useState(false);
    const [modalHeading, setModalHeading] = useState("Create Product");
    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, setIsLoading } = useLoading();
    const [product, setProduct] = useState({
        name: "",
        // quantity: 0,
        price: 0,
        active: false,
    });
    const [action, setAction] = useState<"create" | "update" | "添加" | "更新">(
        "create"
    );

    const { data: productList, refetch } = trpc.useQuery([
        "products.findAllProducts",
    ]);

    const createProductMutation = trpc.useMutation(["products.createProduct"], {
        onSuccess: async (data, variables, context) => {
            // console.log("product data: ", data);
            await refetch();
        },
    });

    const updateProductMutation = trpc.useMutation(["products.updateProduct"], {
        onSuccess: async () => {
            await refetch();
        },
    });

    const openModal = (action: "create" | "update" | "添加" | "更新") => {
        setProduct({
            name: "",
            // quantity: 0,
            price: 0,
            active: false,
        });
        setAction(action);
        if (["create", "添加"].includes(action))
            setModalHeading("Create Product");
        else setModalHeading("Update Product");
        setShowModal(true);
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
            console.log("craeting");
            try {
                const data = await createProductMutation.mutateAsync({
                    name: product.name,
                    price: Number(product.price),
                    active: product.active,
                });
                console.log(data);
                setShowModal(false);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setShowModal(false);
                setIsLoading(false);
            }
        } else if (["update", "更新"].includes(action)) {
            console.log("updating");
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
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        maxLength={30}
                                        placeholder={t.productName}
                                        required
                                        value={product.name}
                                        onChange={setDataValue}
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
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        required
                                        pattern="^\d*(\.\d{0,2})?$"
                                        value={product.price}
                                        onChange={setDataValue}
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
                                    <Button type="submit">Create</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
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
                                    {t.active}
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
                                    <td className="row-general-style">
                                        {product.active ? "Yes" : "No"}
                                    </td>
                                    <td className="row-general-style flex justify-end">
                                        <Button
                                            type="button"
                                            onClick={() => openModal("update")}
                                            customWidth="w-16 py-1"
                                        >
                                            Edit
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
