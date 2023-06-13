
export default function checkLicenseRequest(key) {
    let fd = new FormData();
    fd.append('product_permalink', 'speller');
    fd.append('license_key', key);
    
    let requestParse  = null;
    
    var request = new XMLHttpRequest();
    request.open('POST', 'https://api.gumroad.com/v2/licenses/verify', false);
    request.onload = () => {
        requestParse = JSON.parse(request.response);
    };

    request.send(fd);

    // if(requestParse.purchase && requestParse.purchase.variants == '(Team)' && requestParse.uses <=40) {
    //     return {
    //         'key': key,
    //         'license': requestParse
    //     };
    // } else if (requestParse.purchase && requestParse.purchase.variants == '(Business)' && requestParse.uses <= 50) {
    //     return {
    //         'key': key,
    //         'license': requestParse
    //     };
    // } else if (requestParse.purchase && requestParse.purchase.variants == '(Personal)' && requestParse.uses <= 15) {
    //     return {
    //         'key': key,
    //         'license': requestParse
    //     };
    // } else if(requestParse.success == true) {
    //     return {
    //         'key': key,
    //         'license': 'Sorry, you have reached the maximum number of connections for this license!',
    //     }
    // } else {
    //    return {
    //         'key': key,
    //         'license': requestParse
    //    }
    // }

    return {
        'key': key,
        'license': requestParse
   }

    
}