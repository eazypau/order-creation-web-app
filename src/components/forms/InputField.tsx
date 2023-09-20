import clsx from "clsx";
import React from "react";

type Props = {
  hasBorder?: string | boolean;
  customWidth?: string;
  name?: string;
  value?: string | number;
  onChange?: (e?: any) => void;
  customTextAlign?: string;
  type?: string;
  placeholder?: string;
  min?: string;
  autoComplete?: string;
  required?: boolean;
  pattern?: string;
  id?: string;
};

// need flexible width class edit
export const InputField = ({
  hasBorder,
  customWidth,
  name,
  value,
  onChange,
  customTextAlign,
  type = "text",
  min = "1",
  placeholder = "Enter text here",
  autoComplete = "off",
  required = false,
  pattern,
  id,
}: Props) => {
  const baseClassName = "w-full p-1.5 lg:p-3 text-sm border-gray-200 rounded";
  const width = "w-full"; // default width
  const textAlign = "text-left"; // defaul alignment
  const style = clsx(
    hasBorder && "border",
    textAlign && customTextAlign,
    baseClassName
  );

  return (
    <div className={width && customWidth}>
      <label className="sr-only" htmlFor="name">
        Name
      </label>
      <input
        className={style}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        autoComplete={autoComplete}
        required={required}
        pattern={pattern}
      />
    </div>
  );
};
