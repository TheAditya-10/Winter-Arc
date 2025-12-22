import React from 'react'

const EventTimer = () => {
    return (
        <div
            className='h-screen bg-cover bg-center py-[180px] my-[-30px] px-[100px]'
            style={{ backgroundImage: "url('/EventTimerBg.svg')" }}
        >
            <p className='text-4xl text-[#184654]'>Event Starts In</p>
            <p className='text-[120px] text-[#0A0F1F]'>12:05:30</p>

            <div className='flex gap-30 ml-10 text-[#0A0F1F]'>
                <p>DAYS</p>
                <p>HOURS</p>
                <p>MINUTES</p>
            </div>

            <div className='mt-6'>
                <button className='ml-45 py-1 rounded-lg px-8 bg-[#8ACADE] border-2 border-[#0A0F1F] text-black font-semibold'>
                    Register
                </button>
            </div>


        </div>

    )
}

export default EventTimer