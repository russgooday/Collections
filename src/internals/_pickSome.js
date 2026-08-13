/**
 * pickSome randomly picks items from an array
 * @param {Array} arr - array to map over
 * @returns {Array} returns an array of randomly picked items
 */
export function pickSome(arr) {
    const length = arr.length;
    const picked = [];
    for (let i = 0; i < length; i++)
        if (Math.random() < 0.5)
            picked.push(arr[i]);
    return picked;
}