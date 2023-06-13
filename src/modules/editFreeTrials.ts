export default async function editFreeTrials() {
    let freeTrials = await figma.clientStorage.getAsync('freeTrials');
    if(freeTrials && freeTrials != 0) {
        freeTrials -= 1;
        figma.clientStorage.setAsync('freeTrials', freeTrials);
    } 
}