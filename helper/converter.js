import { BigNumberInWei } from '@injectivelabs/utils'
export const convertStreams = async (denomClient, streams) => {
    try {
        let convertedStreams = [];

        let tokenKeyMap = new Map();
        let tokenMap = streams.map(item => item.release_amount.denom);
        let tokenSet = new Set(tokenMap);
        tokenMap = Array.from(tokenSet.values());
        let promises = [];

        if (tokenMap.length) {
            tokenMap.forEach(item => {
                promises.push(denomClient.getDenomToken(item))
            })
        }
        let tokenDetails = await Promise.all(promises);
        tokenMap.forEach((item, index) => {
            tokenKeyMap.set(item, tokenDetails[index]);
        })

        let currentTime = Math.floor(new Date().getTime() / 1000);
        
        streams.forEach(stream => {
            let startTime = parseInt(stream.start_time);
            let stopTime = parseInt(stream.stop_time);

            let startTimeVSNow = currentTime - startTime;
            let stopTimeVSNow = currentTime - stopTime;
            let statusCode = 1;
            switch (stream.status) {
                case 'initial':
                    statusCode = 1
                    break;
                case 'completed':
                    statusCode = 3
                    break;
                case 'cancelled':
                    statusCode = 2
                    break;
            }
            let originStatus = statusCode;
            if (statusCode === 1) {
                if (startTimeVSNow < 0) {
                    statusCode = 1;
                } else if (stopTimeVSNow > 0) {
                    statusCode = 3;
                } else {
                    statusCode = 4;
                }
            }
            let tokenDetail = tokenKeyMap.get(stream.release_amount.denom);
            let decimal =  tokenDetail.decimals;
            let convertedReleaseAmount = parseFloat(new BigNumberInWei(stream.release_amount.amount).toBase(decimal).toFixed());
            let convertedRemainingAmount = parseFloat(new BigNumberInWei(stream.remaining_amount).toBase(decimal).toFixed());
            let convertedVestingAmount = parseFloat(new BigNumberInWei(stream.vesting_amount).toBase(decimal).toFixed());
            let releaseRate = convertedReleaseAmount / (stopTime - startTime)
            convertedReleaseAmount += convertedVestingAmount;
            let convertedWithdrawAmount = convertedReleaseAmount - convertedRemainingAmount;
            let streamId = parseInt(stream.id);
            let releaseRateDisplay = `${releaseRate.toFixed(4)} / second`;
            let convertedStream = {
                recipient: stream.recipient,
                sender: stream.sender,
                tokenDetail: tokenDetail,
                tokenLogo:  `https://testnet.explorer.injective.network/vendor/@injectivelabs/token-metadata/${tokenDetail.logo}`,
                status: statusCode,
                originStatus: originStatus,
                startTime: startTime,
                stopTime: stopTime,
                type: "Outgoing",
                withdrawAmount: convertedWithdrawAmount.toFixed(4),
                releaseAmount: convertedReleaseAmount.toFixed(4),
                releaseRate: releaseRateDisplay,
                initialRelease: convertedVestingAmount.toFixed(4),
                streamId: streamId,
            }

            convertedStreams.push(convertedStream);
        });

        return convertedStreams.sort((streamA, streamB) => (streamB.streamId - streamA.streamId));
    } catch (e) {
        console.log(e)
        return [];
    }
}
