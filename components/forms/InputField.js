import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

const borderStyle = "border";
// need flexible width class edit

export const InputField = ({ hasBorder, type = "text", placeholder = "Enter text here" }) => {
	const baseClassName = "w-full p-3 text-sm border-gray-200 rounded-lg";
	const style = clsx(hasBorder && "border", baseClassName);
	return (
		<div>
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
};
