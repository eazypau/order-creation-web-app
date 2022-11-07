import React from "react";

export const Loading = () => {
    return (
        <div className="absolute top-0 left-0 z-50 w-full h-screen flex items-center justify-center bg-slate-300 bg-opacity-50">
            <div className="dots">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
