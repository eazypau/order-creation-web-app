import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
// import PropTypes from "../../node_modules/@types/prop-types/index";

// need flexible width class edit
export const InputField = ({
	hasBorder,
	customWidth,
	name,
	value,
	onChange,
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
			<input
				className={style}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

InputField.prototype = {
	hasBorder: PropTypes.bool,
	customWidth: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  	onChange: PropTypes.func,
	type: PropTypes.oneOf(["text", "number"]),
	placeholder: PropTypes.string,
};
