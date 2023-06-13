export default async function checkFreeTrials() {
    let freeTrials;
    await figma.clientStorage.getAsync('freeTrials')
    .then((results) => {
        if(!results && results != 0) {
            freeTrials = 20;
            figma.clientStorage.setAsync('freeTrials', freeTrials);
        } else if (results || results == 0){
            freeTrials = results;
        }
    });
    return freeTrials;
}