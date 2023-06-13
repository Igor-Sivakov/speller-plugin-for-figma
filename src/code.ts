import { dispatch, handleEvent } from './codeMessageHandler';
import scanning from './modules/scanning';
import getCurrentTextNodes from './modules/getCurrentNodes';
import bingResponseHandler from './modules/bingResHandler';
import clickWord from './modules/clickWordHandler';
import editStorageExceptions from './modules/editExceptions';
import checkFreeTrials from './modules/checkFreeTrials';

figma.showUI(__html__, {
	width: 320,
	height: 480
});

figma.currentPage.setRelaunchData({open: ''});

let allDocumentTextNodes = [];
let currentTextNodes = [];
let nodes = {};

handleEvent('startScanning', async (lang) => {
	let textNodes = figma.currentPage.findAll(node => 
		node.type === 'TEXT' 
		&& node.visible
		&& !node.characters.includes('@'));
	allDocumentTextNodes = textNodes;
	scanning(textNodes, lang);
});

handleEvent('startCheckModulesScan', (lang) => {
	let data = figma.currentPage.selection;
	currentTextNodes = getCurrentTextNodes(data, currentTextNodes);
	allDocumentTextNodes = currentTextNodes;
	scanning(currentTextNodes, lang);
});

handleEvent('bingResponseHandler', (data) => {
	bingResponseHandler(data, allDocumentTextNodes, nodes);
});

handleEvent('clickWord', data => {
	const textNodes = nodes[data.token];
	clickWord(textNodes, data);
});

handleEvent('onFocus', data => {
	let node = null;
	Object.keys(nodes).forEach(key => {
		
		nodes[key].forEach(n => {
			let startIndex = n.characters.indexOf(data.token);
			let endIndex = startIndex + data.token.length;
			let nextSymbol = n.characters[endIndex];
			let prevSymbol = n.characters[startIndex - 1];

			if(n.characters.includes(data.token) && n.absoluteRenderBounds) {
				let reg = /^[A-Za-z0-9А-Яа-я]+$/gi;
				if(!prevSymbol || !prevSymbol.match(reg)) {
					if(!nextSymbol || !nextSymbol.match(reg)) {
						node = n;
					}
				}
			}
		})
	})
	
	if(node) {
		figma.currentPage.selection = [node];
		figma.viewport.scrollAndZoomIntoView([node]);
	}
});

handleEvent('editStorageExceptions', async (data) => {
	editStorageExceptions(data);
});

handleEvent('rmStorageExceptions', async (data) => {
	let exceptions = await figma.clientStorage.getAsync('exceptions');
	exceptions.forEach(exception => {
		if(exception === data) {
			exceptions.splice(exceptions.indexOf(exception), 1);
			return;
		}
	});
	dispatch('exceptions', exceptions);
	await figma.clientStorage.setAsync('exceptions', exceptions);
});

handleEvent('checkCurrentModules', () => {
	figma.currentPage.selection.length > 0 ? dispatch('isCheck') : dispatch('noCheck');
});

handleEvent('getUser', () => {
	dispatch('userNameHandler', figma.currentUser.name);
});

handleEvent('getUserExceptions', async () => {
	await figma.clientStorage.getAsync('exceptions')
	.then((res) => dispatch('exceptions', res));
});

handleEvent('checkLicenseStatus', async() => {
	await figma.clientStorage.getAsync('license')
	.then((res) => {
		if(res) {
			dispatch('setLicense', res);
		} else if(!res) {
			checkFreeTrials().then((res) => dispatch('getFreeTrials', res));
		}
	});
});

handleEvent('checkMode', async() => {
	await figma.clientStorage.getAsync('license')
	.then((res) => {
		if(!res) {
			checkFreeTrials().then((res) => dispatch('getBasicTrials', res));
		}
	});
});

handleEvent('checkLicenseKey', key => figma.ui.postMessage({ type: 'checkLicenseKey', key}));

handleEvent('licenseKeyStatus', res => {
	dispatch('licenseKeyStatus', res.license);
	if(res.license.success) {
		figma.clientStorage.setAsync('license', res);
		figma.clientStorage.setAsync('freeTrials', 1);
	}
});

handleEvent('licenseStatus', res => {
	dispatch('licenseStatus', res.license);
});

handleEvent('checkLastUseDate', async () => {
	let lastUseDate = await figma.clientStorage.getAsync('lastUseDate');

	if(!lastUseDate) {
		await figma.clientStorage.setAsync('lastUseDate', new Date().getTime());
		dispatch('setFreeTrials', 1);
	} else {
		let today = new Date();
		let diff = lastUseDate - today.getTime();
		let minutes = (diff / 1000) / 60;
		let hours = Math.abs(minutes / 60);

		if(hours > 24) {
			dispatch('setFreeTrials', 1);
			dispatch('getFreeTrials', 1);
			
		} else if (hours < 24){
			dispatch('setFreeTrials', 0);
			dispatch('getFreeTrials', 0);
		}
	}
	
});


handleEvent('setUserLang', async (data) => {
	await figma.clientStorage.setAsync('userLang', data);
});

handleEvent('getUserLang', async () => {
	let userLang = await figma.clientStorage.getAsync('userLang');
	dispatch('getUserLang', userLang);
});

handleEvent('isFreeTrials', async () => {
	let trials = await figma.clientStorage.getAsync('freeTrials');
	dispatch('isFreeTrials', trials)
})

handleEvent('setLicenseOffTrial', async() => {
	await figma.clientStorage.setAsync('freeTrials', 1);
})