import React, { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";
import en from "../../locales/en";
import cn from "../../locales/cn";

type Props = {
    toggleSidebarToCreate: (e: any) => void;
    hasCTAButton: boolean;
    CTAButtonText?: string;
};

export const NavBar = ({
    toggleSidebarToCreate,
    hasCTAButton,
    CTAButtonText = "Create Order",
}: Props) => {
    let router: any = useRouter();
    let t = router.locale === "en" ? en : cn;
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const togglMenu = () => {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    };

    const toggleLangButton = () => {
        if (isLangOpen) setIsLangOpen(false);
        else setIsLangOpen(true);
    };

    return (
        <nav className="bg-white shadow dark:bg-gray-800 sticky top-0 z-40">
            <div className="container px-6 py-4 xl:px-20 mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-800 w-32 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                            <Link href="/">{t.brand}</Link>
                        </div>
                        <div className="hidden sm:flex">
                            <Link href="/">
                                <a
                                    className={
                                        router.pathname == "/"
                                            ? "active-nav-tab"
                                            : "nav-tab"
                                    }
                                >
                                    {t.orders}
                                </a>
                            </Link>
                            <Link href="/products">
                                <a
                                    className={
                                        router.pathname == "/products"
                                            ? "active-nav-tab"
                                            : "nav-tab"
                                    }
                                >
                                    {t.products}
                                </a>
                            </Link>
                            <Link href="/archive">
                                <a
                                    className={
                                        router.pathname == "/archive"
                                            ? "active-nav-tab"
                                            : "nav-tab"
                                    }
                                >
                                    {t.archiveOrder}
                                </a>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="relative w-14 md:hidden">
                                <button
                                    onClick={toggleLangButton}
                                    className="w-full px-2 py-1 uppercase flex justify-between items-center focus:outline rounded-sm"
                                >
                                    {router.locale}
                                    <ChevronDownIcon className="w-5" />
                                </button>
                                {isLangOpen ? (
                                    <ul className="absolute left-0 top-0 mt-9 w-full bg-white shadow">
                                        {router.locales.map((locale: any) => (
                                            <li
                                                key={locale}
                                                className="w-full text-sm font-medium uppercase text-gray-700 transition-colors duration-200 transform md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <Link
                                                    href={router.asPath}
                                                    locale={locale}
                                                >
                                                    <a
                                                        onClick={() =>
                                                            setIsLangOpen(false)
                                                        }
                                                        className="block w-full h-full px-2 py-2"
                                                    >
                                                        {locale}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex md:hidden">
                                <button
                                    type="button"
                                    className="px-2 text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                    aria-label="toggle menu"
                                    onClick={togglMenu}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 fill-current"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            (isOpen ? "" : "hidden") +
                            " marker:selection:flex-1 md:flex md:items-center md:justify-between mt-2 lg:mt-0"
                        }
                    >
                        <div className="relative w-14 hidden md:block mr-2">
                            <button
                                onClick={toggleLangButton}
                                className="w-full px-2 py-1 uppercase text-sm flex justify-between items-center focus:outline border rounded-md"
                            >
                                {router.locale}
                                <ChevronDownIcon className="w-5" />
                            </button>
                            {isLangOpen ? (
                                <ul className="absolute left-0 top-0 mt-9 w-full bg-white shadow">
                                    {router.locales.map((locale: any) => (
                                        <li
                                            key={locale}
                                            className="w-full text-sm font-medium uppercase text-gray-700 transition-colors duration-200 transform md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <Link
                                                href={router.asPath}
                                                locale={locale}
                                            >
                                                <a
                                                    onClick={() =>
                                                        setIsLangOpen(false)
                                                    }
                                                    className="block w-full h-full px-2 py-2"
                                                >
                                                    {locale}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex flex-col mb-2 sm:hidden">
                            <Link href="/">
                                <a className="font-medium capitalize py-1.5 text-sm">
                                    {t.orders}
                                </a>
                            </Link>
                            <Link href="/products">
                                <a className="font-medium capitalize py-1.5 text-sm">
                                    {t.products}
                                </a>
                            </Link>
                            <Link href="/archive">
                                <a className="font-medium capitalize py-1.5 text-sm">
                                    {t.archiveOrder}
                                </a>
                            </Link>
                        </div>
                        <div>
                            {hasCTAButton ? (
                                <Button
                                    customWidth="py-1 px-3"
                                    onClick={
                                        hasCTAButton
                                            ? toggleSidebarToCreate
                                            : (e) => {
                                                  console.log("do nothing");
                                              }
                                    }
                                >
                                    <span className="flex items-center gap-1">
                                        <PlusIcon className="w-4 mt-0.5" />
                                        {CTAButtonText}
                                    </span>
                                </Button>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* <div className="flex items-center mt-4 md:mt-0">
							<button
								className="hidden mx-4 text-gray-600 transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
								aria-label="show notifications"
							>
								<svg
									className="w-6 h-6"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>

							<button
								type="button"
								className="flex items-center focus:outline-none"
								aria-label="toggle profile dropdown"
							>
								<div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
									<Image
										src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
										className="object-cover w-full h-full"
										alt="avatar"
                                        width={100}
                                        height={100}
									/>
								</div>

								<h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
									Khatab wedaa
								</h3>
							</button>
						</div> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};
