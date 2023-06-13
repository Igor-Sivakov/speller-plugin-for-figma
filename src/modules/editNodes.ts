export default function editNodes(node, item, nodes) {
	
	if(nodes.hasOwnProperty(`${item.token}`)) {
		nodes[`${item.token}`].push(node);
	} else {
		nodes[`${item.token}`] = [node];
	};
	
    return nodes;
}