import {ethers} from "ethers";

export const autoCorrectRecipientAmount = (value, selectedToken) => {
    if (!value) {
        return 0;
    }
    let tokenDecimal = selectedToken?.tokenDecimal ? selectedToken.tokenDecimal : 6;
    if (value) {
        if (value.indexOf(".") !== -1) {
            if ((value.length - value.indexOf(".") - 1) > tokenDecimal) {
                value = value.slice(0, value.indexOf(".") + 1 + tokenDecimal);
            }
        } else if (value.indexOf(",") !== -1) {
            if ((value.length - value.indexOf(",") - 1) > tokenDecimal) {
                value = value.slice(0, value.indexOf(",") + 1 + tokenDecimal);
            }
        }
    }
    let releaseAmountBigNumber = ethers.utils.parseUnits(value, tokenDecimal);
    let balance = selectedToken?.balance ? selectedToken.balance : "1000000000000000";
    let bigBalance = ethers.BigNumber.from(balance);
    if (releaseAmountBigNumber.gte(bigBalance)) {
        // Need to assign decimals
        return ethers.utils.formatUnits(bigBalance, tokenDecimal);
    }
    let floatNumber = parseFloat(value);
    if (floatNumber < 0) {
        return "0";
    }

    return value;
}