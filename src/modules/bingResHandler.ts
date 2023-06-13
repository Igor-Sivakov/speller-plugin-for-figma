import { dispatch } from '../codeMessageHandler';
import getResponseTextNodes from './textNodesFromRes';

export default function bingResponseHandler(data, allDocumentTextNodes, nodes) {
	
    let unique = data.filter((set => f => !set.has(f.token) && set.add(f.token))(new Set));
	let uniqueAndFull = [];

	unique.forEach((item) => {
		if(item.suggestions.length >= 1 && item.suggestions[0].suggestion !== "") {
			uniqueAndFull.push(item);
		}
	});
	unique = uniqueAndFull;

	if (unique.length > 0) {
		dispatch('uiResultsHandler', unique);
	} else {
		let message = 'We couldn’t find any mistakes for now. Keep make great design!';
		dispatch('errorEvent', message);
	};
	
	getResponseTextNodes(unique, allDocumentTextNodes, nodes);
}