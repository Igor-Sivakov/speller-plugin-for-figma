import { dispatch } from '../codeMessageHandler';
import fontsLoad from './loadFonts';

export default function clickWord(textNodes, data) {
    if (textNodes && textNodes.length > 0) {

        fontsLoad(textNodes).then(() => {
            textNodes.forEach((node) => {
                if (node.characters == data.token) {
                    node.characters = data.suggestions[0].suggestion;
                } else {
                   let startIndex = node.characters.indexOf(data.token);
                   let endIndex = startIndex + data.token.length;

                   node.deleteCharacters(startIndex, endIndex);
                   node.insertCharacters(startIndex, data.suggestions[0].suggestion, 'BEFORE');
                }
            });
        });
        
        dispatch('changeResults', data.token);
    };
}