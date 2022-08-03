import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

// need flexible width class edit
export const InputField = ({
  hasBorder,
  customWidth,
  type = "text",
  placeholder = "Enter text here",
}) => {
  const baseClassName = "w-full p-3 text-sm border-gray-200 rounded-lg";
  const width = "w-full"; // default width
  const style = clsx(hasBorder && "border", baseClassName);

  return (
    <div className={width && customWidth}>
      <label className="sr-only" htmlFor="name">
        Name
      </label>
      <input className={style} placeholder={placeholder} type={type} />
    </div>
  );
};

InputField.prototype = {
  hasBorder: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  customWidth: PropTypes.string,
};
