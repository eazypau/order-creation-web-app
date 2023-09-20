import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

const productList = [
  { name: "Dou Sa Bing" },
  { name: "Xiang Bing" },
  { name: "Yue Bing" },
];

type Props = {
  customWidth?: string;
  value: string;
  onChange: (e?: any) => void;
  options: any[];
};

// need flexible width class edit

export const SelectBox = ({
  customWidth = "",
  value,
  onChange,
  options,
}: Props) => {
  const width = "w-full"; // default width
  const [selected, setSelected] = useState({ name: "" });
  const [availableOptions, setAvailableOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!value) setSelected({ name: "" });
    else {
      const productFinder = availableOptions.find(
        (item) => item.name === value
      );
      setSelected(productFinder || { name: "" });
    }
  }, [value, availableOptions]);

  useEffect(() => {
    if (options.length > 0) setAvailableOptions(options);
    else setAvailableOptions([]);
  }, [options]);

  return (
    <div className={customWidth ? customWidth : width}>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative h-full">
          <Listbox.Button className="relative w-full h-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Selec
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span> */}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionId) => {
                if (option.active) {
                  return (
                    <Listbox.Option
                      key={optionId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  );
                }
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
