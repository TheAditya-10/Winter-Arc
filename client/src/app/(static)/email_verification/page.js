import React from 'react'

const page = () => {
    return (
        <div>
            <p className='mt-24 font-semibold text-2xl ml-20'>Verify Your Email</p>

            <div className='flex mt-6 items-center gap-3'>
                <div className='h-10 bg-white w-6'></div>
                <img src="/Matrix_circle_logo.svg" />
                <div>
                    <p className='text-[#D0C7C7]'>Winter Arc &lt;team.matrix.jec@gmail.com&gt; </p>
                    <p className='text-[#5E5E5E] mt-[-2]'>to me</p>
                </div>
            </div>

            <div className='flex mt-4 flex-col items-center gap-6 w-[30%] mx-auto'>
                <img src="/Matrix_snow_logo.svg" />
                <p className='mt-2 text-[#929191] text-2xl font-semibold'>Verify Your Email</p>
                <p className='text-[#929191] w-[90%] text-center text-md font-light'>Thanks for helping us keep your account secure! Click the button below to finish verifying your email address.</p>
                <button className='bg-blue-400 px-6 py-2 font-semibold rounded-md'>Confirm Email</button>
                <p className='font-light text-center mt-3 text-[#929191] w-[90%]'>Didn&#39;t create an account? <a className='text-blue-400'>Click here</a> to remove this email address.</p>
            </div>
            
            <div className='mt-25 flex justify-between w-[50%] mx-auto'>
                <a className='text-blue-400 text-xl'>Jabalpur Engineering College </a>
                <div className='flex gap-3'>
                    <img className='h-10' src="/instagram.svg" />
                    <img src="/twitter.svg" />
                    <img src="/facebook.svg" />
                </div>
            </div>
        </div>
    )
}

export default page