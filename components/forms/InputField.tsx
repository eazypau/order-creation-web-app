import clsx from "clsx";
import React from "react";

type Props = {
	hasBorder?: string | boolean,
	customWidth?: string,
	name?: string,
	value?: string | number,
	onChange?: (e?: any) => void,
	customTextAlign?: string,
	type?: "text" | "number",
	placeholder?: string
}

// need flexible width class edit
export const InputField = ({
	hasBorder,
	customWidth,
	name,
	value,
	onChange,
	customTextAlign,
	type = "text",
	placeholder = "Enter text here",
}: Props) => {
	const baseClassName = "w-full p-1.5 lg:p-3 text-sm border-gray-200 rounded-lg";
	const width = "w-full"; // default width
	const textAlign = "text-left" // defaul alignment
	const style = clsx(hasBorder && "border", textAlign && customTextAlign, baseClassName);

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
