import { useState } from "react";

const HaikuForm = ({ addHaiku }) => {
	const [haikuText, setHaikuText] = useState("");

	const handleChange = (e) => {
		setHaikuText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (haikuText.trim()) {
			addHaiku(haikuText);
			setHaikuText("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 p-4">
			<textarea
				value={haikuText}
				onChange={handleChange}
				placeholder="Entrez votre haïku..."
				className="w-full p-4 border-2 border-gray-300 rounded-md"
				rows="4"
			/>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
			>
				Ajouter
			</button>
		</form>
	);
}

export default HaikuForm;