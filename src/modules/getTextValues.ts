export default function getTextValues(textNodes) {

	let textValues = textNodes.map((node) => {

		if (node.characters.length > 0) {
			let str = node.characters.replace(/[.*+?^${}()|[\]\\]/g, ' ');
			str = str.replace(/\s+/g, ' ');
			return str;
		}
	});
	
	return textValues;
};