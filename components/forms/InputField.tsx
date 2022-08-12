import clsx from "clsx";
import React from "react";

type Props = {
	hasBorder?: string | boolean,
	customWidth?: string,
	name?: string,
	value?: string | number,
	onChange?: (e?: any) => void,
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
	type = "text",
	placeholder = "Enter text here",
}: Props) => {
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
