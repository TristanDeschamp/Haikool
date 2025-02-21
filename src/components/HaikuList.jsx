import HaikuItem from './HaikuItem';

const HaikuList = ({ haikus, toggleFavorite, deleteHaiku }) => {
	return (
		<div className="space-y-4">
			{haikus.map((haiku, index) => (
				<HaikuItem
					key={index}
					haiku={haiku}
					toggleFavorite={() => toggleFavorite(index)}
					deleteHaiku={() => deleteHaiku(index)}
				/>
			))}
		</div>
	);
};

export default HaikuList;