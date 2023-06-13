export default async function fontsLoad(textNodes) {
	let fonts = [];
	textNodes.forEach(textNode => {
		fonts.push(...textNode.getRangeAllFontNames(0, textNode.characters.length));
	});
	
	for (const font of fonts) {
		await figma.loadFontAsync(font);
	};
};