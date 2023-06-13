import getTextValues from './getTextValues';

export default function getValidStrToCheck(textNodes) {
	let strToCheck = getTextValues(textNodes).join(' ');

	return strToCheck.split(' ').filter(function(word, i , arr){
		return !~arr.indexOf(word, i+1)
	}).join(' ');
};