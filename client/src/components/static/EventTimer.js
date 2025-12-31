"use client"
import { useEffect } from "react"
import Link from "next/link"
import { useTimer } from "react-timer-hook"

const EventTimer = ({ isRegistered }) => {

    const {days, hours, minutes, seconds, restart} = useTimer({expiryTimestamp: new Date(), autoStart: false })

    useEffect(() => {  
            restart(new Date("2026-01-01T00:00:00"), true)
         }, [restart])

    return (
        <div className='max-md:h-[40%] font-syne'>
            <div
                className='flex flex-col justify-center h-screen bg-cover bg-center py-[180px] bg-no-repeat my-[-30px] px-[100px] max-md:h-[150%] max-md:bg-cover max-md:px-0 max-md:py-0 max-md:my-5'
                style={{ backgroundImage: "url('/EventTimerBg.svg')" }}
            >
                <p className='text-4xl text-[#184654] max-md:text-lg max-md:pt-14 max-md:pl-7'>Event Starts In</p>
                <p className='text-[120px] text-[#0A0F1F] max-md:text-5xl max-md:pl-9'>{days*24 + hours}:{minutes}:{seconds}</p>

                {/* <div className='flex gap-30 ml-10 text-[#0A0F1F] max-md:m-0 max-md:gap-6 max-md:text-xs max-md:pl-12'>
                    <p>HOURS</p>
                    <p>MINUTES</p>
                    <p>SEC</p>
                </div> */}
                {/* <div className='mt-6 font-inter'>
                    <Link href={isRegistered ? "/dashboard/me" : "/auth/register"}>
                        <button className='ml-45 py-1 rounded-lg px-8 bg-[#8ACADE] border-2 border-[#0A0F1F] text-black font-semibold max-md:mx-auto  max-md:scale-70'>
                            {isRegistered ? "Dashboard" : "Register"}
                        </button>
                    </Link>
                </div> */}


            </div>
        </div>

    )
}

export default EventTimer