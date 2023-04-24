export const autoCorrectReleaseFrequency = (value) => {
    let floatNumber = parseFloat(value);
    let intNumber = parseInt(value);
    if (floatNumber <= 0) {
        return 1;
    }
    if (value !== "e") {
        return intNumber;
    }
    return 1;
}