import sendRequest from "./modules/bingRequest";
import checkLicenseRequest from './modules/checkLicenseRequest';

const eventListeners: { type: String; callback: Function }[] = [];
export const dispatch = (action: String, data?: any) => {
	parent.postMessage({ pluginMessage: { action, data } }, '*');
};
export const handleEvent = (type: String, callback: Function) => {
	eventListeners.push({ type, callback });
};
window.onmessage = event => {
	const message = event.data.pluginMessage;

	if (message) {
		for (let eventListener of eventListeners) {
			if (message.action === eventListener.type) eventListener.callback(message.data);
		}
	};

	if (message && message.type === 'networkRequest') {
		const arr = message.data.string;
		if(Array.isArray(arr)) {
			let results = [];
			(async function() {
				await arr.forEach((item) => results.push(...sendRequest(item, message.data.lang).flaggedTokens))
			})();
			dispatch('bingResponseHandler', results);
		} else {
			dispatch('bingResponseHandler', sendRequest(arr, message.data.lang).flaggedTokens);
		}
	};
	
	if (message && message.type === 'checkLicenseKey') {
		dispatch('licenseKeyStatus', checkLicenseRequest(message.key));
	};

	if (message && message.type === 'checkLicenseRequest') {
		dispatch('licenseStatus', checkLicenseRequest(message.licensekey));
	};
};
