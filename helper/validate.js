
export const validateStartTime = (startTime) => {
    let startNumber = new Date(parseInt(startTime)).getTime();
    if (startNumber < Date.now()) {
        return "Start time must be in the future";
    }
    return "";
};

export const validateStopTime = (startTime, stopTime) => {
    let startNumber = new Date(parseInt(startTime)).getTime();
    let stopNumber = new Date(parseInt(stopTime)).getTime();
    if (stopNumber < startNumber) {
        return "Stop time must be greater than start time";
    }
    return "";
};

export const validateReleaseFrequency = (
    releaseValue,
    releaseType,
    startTime,
    stopTime
    ) => {
    let startNumber = parseInt(startTime)/ 1000;
    let stopNumber = parseInt(stopTime) / 1000;
    let frequencyInSeconds = releaseValue;

    if (releaseType == "1") {
        frequencyInSeconds = frequencyInSeconds * 60;
    } else if (releaseType == "2") {
        frequencyInSeconds = frequencyInSeconds * 3600;
    } else if (releaseType == "3") {
        frequencyInSeconds = frequencyInSeconds * 3600 * 24;
    } else if (releaseType == "4") {
        frequencyInSeconds = frequencyInSeconds * 3600 * 24 * 7;
    } else if (releaseType == "5") {
        frequencyInSeconds = frequencyInSeconds * 3600 * 24 * 30;
    } else if (releaseType == "6") {
        frequencyInSeconds = frequencyInSeconds * 3600 * 24 * 365;
    }
    if (frequencyInSeconds > (stopNumber - startNumber)) {
        return "Release frequency must not exceed stream time";
    }
    if (frequencyInSeconds <= 0) {
        return "Release time must be greater than 0."
    }
    return "";
};

export const validateRecipientAmount = (value) => {
    if (value <= 0) {
        return "Recipient amount must be greater than 0"
    }
    return "";
};

// export const validateInititalRelease = (value: number) => {
//     if (value < 0) {
//         return "Initial release must be greater or equal than 0%"
//     } else if (value >= 100) {
//         return "Initial release must be less than 100%"
//     }
//     return "";
// };

export const validateAddress = (value, sender) => {
    if (!value) {
        return "Recipient address is required";
    } else if (sender === value) {
        return "Recipient address must be different from sender address";
    }
    return "";
};

export const validateEmail = (value) => {
    let emailTerm = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,8}$");
    if (value === "") {
        return "";
    }
    if (!emailTerm.test(value)) {
        return "Email not valid";
    }
    return "";
};