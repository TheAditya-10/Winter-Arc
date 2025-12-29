"use client"

import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function Timer({ timestamp }) {

    const {
        seconds,
        minutes,
        hours,
        days,
        restart
    } = useTimer({ expiryTimestamp: new Date(), autoStart: false });

    useEffect(() => { 
        if(!timestamp) return 
        restart(new Date(timestamp), true)
     }, [timestamp, restart])

    const clock = (days > 0)
        ? { labels: ["DAYS", "HOURS", "MIN", "SEC"], values: [days, hours, minutes, seconds] }
        : { labels: ["HOURS", "MIN", "SEC"], values: [hours, minutes, seconds] }

    return (
        <div className='w-fit flex flex-col items-center mt-2 ms:mb-8 mb-4'>
            <div className='ml:text-8xl ms:text-6xl text-4xl w-fit mb-4'>
                {
                    clock.values.map((value, index) => {
                        return (<span key={index} className='w-12 ms:w-22 ml:w-28 inline-block text-center mx-1'>{(value) < 10 ? "0" : ""}{value}</span>)
                    })
                }
            </div>
            <div className='text-[0.6rem] flex justify-between w-full'>
                {
                    clock.labels.map((label, index) => {
                        return (<span key={index} className='w-12 ms:w-22 ml:w-28 text-center'>{label}</span>)
                    })
                }
            </div>
        </div>
    );
}

export { Timer }

