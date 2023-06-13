import { dispatch } from '../codeMessageHandler';

export default async function editStorageExceptions(data) {
    dispatch('changeResults', data);
	let exceptions = await figma.clientStorage.getAsync('exceptions');

	if(exceptions && !exceptions.includes(data)) {
		exceptions.push(data);
		await figma.clientStorage.setAsync('exceptions', exceptions);
	} else if (exceptions == undefined) {
		let newExceptions = [];
		newExceptions.push(data);
		await figma.clientStorage.setAsync('exceptions', newExceptions);
	}
}