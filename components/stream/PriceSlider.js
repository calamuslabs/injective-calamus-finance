import {useCallback, useEffect, useState} from "react";
import {Progress, useStyleConfig} from "@chakra-ui/react";

export default function PriceSlider({stream, releaseAmount, startTime, stopTime}) {
    const [value, setValue] = useState(0);
    const [isFirstLoading, setIsFirstLoading] = useState(true)
    const progressColumnStyle = useStyleConfig('ProgressColumn');
    const calculateUnlockAmount = useCallback((preRelease) => {
        let currentTime = Math.floor(new Date().getTime() / 1000);
        let startTimeVSNow = currentTime - startTime;
        let stopTimeVSNow = currentTime - stopTime;
        if (startTimeVSNow > 0 && stopTimeVSNow < 0) {
            setValue(
                (releaseAmount - preRelease) * Math.floor(startTimeVSNow) / Math.floor((stopTime - startTime))   + preRelease
            )
        }  else if (stopTimeVSNow >= 0) {
            setValue(releaseAmount);
        }
    }, []);

    useEffect(() => {
        if (isFirstLoading) {
            if (stream.originStatus !== 2) {
                let currentTime = Math.floor(new Date().getTime() / 1000);
                let stopTimeVSNow = currentTime - stopTime;

                if (stopTimeVSNow < 0) {
                    let preRelease = parseFloat(stream.initialRelease);
                    calculateUnlockAmount(preRelease);
                    const calculateInterval = setInterval(() => {
                        currentTime = Math.floor(new Date().getTime() / 1000);
                        let startTimeVSNow = currentTime - startTime;
                        stopTimeVSNow = currentTime - stopTime;
                        if (startTimeVSNow > 0 && stopTimeVSNow < 0) {
                            setValue(
                                (releaseAmount - preRelease) * Math.floor(startTimeVSNow) / Math.floor((stopTime - startTime)) + preRelease
                            )
                        }  else if (stopTimeVSNow >= 0) {
                            setValue(releaseAmount);
                            clearInterval(calculateInterval);
                        }
                    }, 1000);
                } else {
                    setValue(releaseAmount);
                }
            } else {
                setValue(
                    parseFloat(stream.withdrawAmount)
                );
            }

            setIsFirstLoading(false)
        }

    }, [isFirstLoading])
    return (
        <>
            <Progress value={value/releaseAmount * 100} size={'sm'} sx={progressColumnStyle}/>
            {`${value.toFixed(4)} / ${releaseAmount.toFixed(4)}`}
        </>
    )
}