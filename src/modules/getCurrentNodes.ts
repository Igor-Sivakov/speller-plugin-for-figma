export default function getCurrentTextNodes(item, currentTextNodes) {

	if(Array.isArray(item)) {
		item.forEach((node) => {	
			if(node.type == 'TEXT' && node.visible && !node.characters.includes('@')) {
				currentTextNodes.push(node);
				return currentTextNodes;
			} else if (node.children && node.children.length > 0) {
				getCurrentTextNodes(node.children, currentTextNodes);
			}
		});
	} else {
		if(item.type == 'TEXT'  && item.visible && !item.characters.includes('@')) {
			currentTextNodes.push(item);
			return currentTextNodes;
		} else if (item.children && item.children.length > 0) {
			getCurrentTextNodes(item.children, currentTextNodes);
		}
	};

	return currentTextNodes;
}