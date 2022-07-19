import React from "react";

export const TextInput = () => {
	return (
		<div>
			<label className="sr-only" htmlFor="name">
				Name
			</label>
			<input
				className="w-full p-3 text-sm border-gray-200 rounded-lg"
				placeholder="Name"
				type="text"
				id="name"
			/>
		</div>
	);
};
