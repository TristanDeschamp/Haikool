const HaikuItem = ({ haiku, toggleFavorite, deleteHaiku }) => {
	return (
		<div className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-md">
			<div className="space-y-1">
				<p style={{ whiteSpace: "pre-line" }}>{haiku.text}</p>
			</div>
			<div className="flex items-center space-x-4">
			<button
				onClick={toggleFavorite}
				className="text-xl text-red-500 hover:text-red-700"
			>
				{haiku.favorite ? '💖' : '♡'}
			</button>
			<button
				onClick={deleteHaiku}
				className="text-xl text-gray-500 hover:text-gray-700"
			>
				[×]
			</button>
			</div>
		</div>
	);
}

export default HaikuItem;