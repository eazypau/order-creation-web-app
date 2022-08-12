import clsx from "clsx";
import React from "react";

type Props = {
	variant?: string,
	customColor?: string,
	customBorder?: string,
	customWidth?: string,
	onClick?: () => void,
	children: JSX.Element | string
}

export const Button = ({
	variant = "primary",
	customColor,
	customBorder,
	customWidth,
	onClick,
	children,
}: Props) => {
	const baseClassName = "inline-block text-sm font-medium focus:outline-none focus:ring";
	const width = "w-auto px-12 py-3";
	const border = "border border-indigo-600 rounded";
	const variants = {
		primary:
			"bg-indigo-600 text-white active:text-indigo-500 hover:bg-transparent hover:text-indigo-600",
		secondary: "",
		inline: "",
	};

	const style = clsx(
		customWidth || width,
		baseClassName,
		customBorder || border,
		customColor || variants[variant]
	);

	return (
		<button className={style} onClick={onClick}>
			{children}
		</button>
	);
};

// Button.prototype= {
// 	variant: PropTypes.string,
// 	customBorder: PropTypes.string,
// 	customColor: PropTypes.string,
// 	customWidth: PropTypes.string,
// 	onClick: PropTypes.func,
// }