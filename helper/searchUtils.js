export const filter = (streams, filterObject) => {
    let {network, status, from, to, textSearchType, textSearchValue} = filterObject;
    let statusCode = parseInt(status);

    let filteredStreams = streams.filter(stream => {
        let result = true;
        if (network !== "0") {
            result = result && (stream.chain === network);
        }
        if (statusCode !== -1) {
            result = result && (stream.status === statusCode);
        }

        if (textSearchValue) {
            if (stream.sender.toLowerCase().includes(textSearchValue) || stream.recipient.toLowerCase().includes(textSearchValue) ) {
                result = result && true
            }
        }
        if (from) {
            result = result && (stream.startTime >= new Date(from).getTime() / 1000);
        }

        if (to) {
            result = result && (stream.startTime <= new Date(to).getTime() / 1000);
        }

        return result;
    })
    return filteredStreams;
}