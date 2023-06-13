import { dispatch } from '../codeMessageHandler';
import getValidStrToCheck from './strValidation';
import chunkSubstr from './substrChunk';
import editFreeTrials from './editFreeTrials';

export default async function scanning(textNodes, lang) {
	if (textNodes.length > 0) {
		let strToCheckUnique = getValidStrToCheck(textNodes);
		let strLength = 4090;
		const userExceptions = await figma.clientStorage.getAsync('exceptions');

		if(userExceptions) {
			userExceptions.forEach((word) => strToCheckUnique = strToCheckUnique.replace(word, ''));
		};

		if(lang != 'English') strLength = 56;

		if (strToCheckUnique.length < strLength) {
			let data = {
				'string': strToCheckUnique,
				'lang': lang
			};
			figma.ui.postMessage({ type: 'networkRequest', data});
		} else {
			let data = {
				'string': chunkSubstr(strToCheckUnique, strLength),
				'lang': lang
			}
			figma.ui.postMessage({ type: 'networkRequest', data});
		};
		
	} 
	else {
		let message = 'We couldn’t find any mistakes for now. Keep make great design!';
		dispatch('errorEvent', message);
	};
	editFreeTrials();
	await figma.clientStorage.setAsync('lastUseDate', new Date().getTime());
};