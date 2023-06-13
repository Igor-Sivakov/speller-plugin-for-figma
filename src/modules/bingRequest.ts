import languages from "./languages";

export default function sendRequest(item, lang) {
    let queryParam = 'proof&mkt=en-US';

    if (lang !== 'English US') {
        let langCode = languages.find((item) => item.lang == lang).code;
        queryParam = `spell&mkt=${langCode}`;
    }; 

    let requestParse = null;
    const key = 'c852206b5c8845ffb495ed8951353ae9';
    
    var request = new XMLHttpRequest();
    request.open('POST', `https://api.bing.microsoft.com/v7.0/spellcheck?mode=${queryParam}`, false);
    request.setRequestHeader('Ocp-Apim-Subscription-Key', key);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Pragma", "no-cache");
    request.onload = () => {
        requestParse = JSON.parse(request.response);
    };

    request.send(`text=${item}`);
    return requestParse;
}