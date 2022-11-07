import clsx from "clsx";
import React from "react";

type Props = {
    variant?: "primary" | "secondary" | "inline";
    type?: "button" | "submit";
    customColor?: string;
    customBorder?: string;
    customWidth?: string;
    onClick: (e: any) => void;
    children: JSX.Element | string;
};

export const Button = ({
    variant = "primary",
    type = "button",
    customColor,
    customBorder,
    customWidth,
    onClick,
    children,
}: Props) => {
    const baseClassName =
        "inline-block text-sm font-medium focus:outline-none focus:ring";
    const width = "w-auto px-7 lg:px-12 py-1.5 lg:py-3";
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
        <button type={type} className={style} onClick={onClick}>
            {children}
        </button>
    );
};
