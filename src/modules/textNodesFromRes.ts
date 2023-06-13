import editNodes from './editNodes';

export default function getResponseTextNodes(arr, allDocumentTextNodes, nodes) {
	
	allDocumentTextNodes.forEach((node) => {
		let wordFind = arr.filter(word => node.characters.includes(word.token));
		
		if(wordFind && !Array.isArray(wordFind)) {
			editNodes(node, wordFind, nodes);
		} else if (wordFind && Array.isArray(wordFind)) {
			wordFind.forEach((word) => {
				editNodes(node, word, nodes);
			});
		}
	});
}