"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { languageList } from "@/utils/const";
import { replaceCharacter } from "@/helpers/replaceCharacters";

type Props = {
  toggleSidebarToCreate: (e: any) => void;
  hasCTAButton: boolean;
  CTAButtonText?: string;
  labels: {
    brand: string;
    orders: string;
    products: string;
    completed: string;
  };
};

export const NavBar = ({
  toggleSidebarToCreate,
  hasCTAButton,
  labels,
  CTAButtonText = "Create Order",
}: Props) => {
  //react hooks
  let pathName = usePathname();
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleMenu = () => {
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
              <Link href={`/${pathName.slice(1, 3)}`}>{labels.brand}</Link>
            </div>
            <div className="hidden sm:flex">
              <Link
                href={`/${pathName.slice(1, 3)}`}
                className={
                  pathName == `/${pathName.slice(1, 3)}`
                    ? "active-nav-tab"
                    : "nav-tab"
                }
              >
                {labels.orders}
              </Link>
              <Link
                href={`/${pathName.slice(1, 3)}/products`}
                className={
                  pathName == `/${pathName.slice(1, 3)}/products`
                    ? "active-nav-tab"
                    : "nav-tab"
                }
              >
                {labels.products}
              </Link>
              <Link
                href={`/${pathName.slice(1, 3)}/completed`}
                className={
                  pathName == `/${pathName.slice(1, 3)}/completed`
                    ? "active-nav-tab"
                    : "nav-tab"
                }
              >
                {labels.completed}
              </Link>
            </div>
            <div className="flex items-center">
              <div className="relative w-14 md:hidden">
                <button
                  onClick={toggleLangButton}
                  className="w-full px-2 py-1 uppercase flex justify-between items-center focus:outline rounded-sm"
                >
                  {pathName.slice(1, 3)}
                  <ChevronDownIcon className="w-5" />
                </button>
                {isLangOpen ? (
                  <ul className="absolute left-0 top-0 mt-9 w-full bg-white shadow">
                    {languageList.map((locale) => (
                      <li
                        key={locale.name}
                        className="w-full text-sm font-medium uppercase text-gray-700 transition-colors duration-200 transform md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <Link
                          href={
                            pathName.length < 4
                              ? `/${locale.routeLangPath}`
                              : replaceCharacter(
                                  pathName,
                                  1,
                                  locale.routeLangPath
                                )
                          }
                          className="block w-full h-full px-2 py-2"
                          onClick={() => setIsLangOpen(false)}
                        >
                          {locale.name}
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
                  onClick={toggleMenu}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
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
                {pathName.slice(1, 3)}
                <ChevronDownIcon className="w-5" />
              </button>
              {isLangOpen ? (
                <ul className="absolute left-0 top-0 mt-9 w-full bg-white shadow">
                  {languageList.map((locale) => (
                    <li
                      key={locale.name}
                      className="w-full text-sm font-medium uppercase text-gray-700 transition-colors duration-200 transform md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      <Link
                        href={
                          pathName.length < 4
                            ? `/${locale.routeLangPath}`
                            : replaceCharacter(
                                pathName,
                                1,
                                locale.routeLangPath
                              )
                        }
                        className="block w-full h-full px-2 py-2"
                        onClick={() => setIsLangOpen(false)}
                      >
                        {locale.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col mb-2 sm:hidden">
              <Link
                href={`/${pathName.slice(1, 3)}`}
                className="font-medium capitalize py-1.5 text-sm"
              >
                {labels.orders}
              </Link>
              <Link
                href={`/${pathName.slice(1, 3)}/products`}
                className="font-medium capitalize py-1.5 text-sm"
              >
                {labels.products}
              </Link>
              <Link
                href={`/${pathName.slice(1, 3)}/completed`}
                className="font-medium capitalize py-1.5 text-sm"
              >
                {labels.completed}
              </Link>
            </div>
            <div>
              {hasCTAButton ? (
                <Button
                  customWidth="py-1 px-3"
                  onClick={
                    hasCTAButton
                      ? (e) => {
                          toggleSidebarToCreate(e);
                          // setIsSidebarOpen(true);
                          // setType("Create");
                          toggleMenu();
                        }
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
          </div>
        </div>
      </div>
    </nav>
  );
};
