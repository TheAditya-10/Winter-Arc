import React from 'react'

const ChangesSection = () => {
    return (
        <div className='font-syne'>

            <p className='text-[60px] text-center max-md:text-2xl '>“What changes in me if I complete this?”</p>

            <div className='grid grid-cols-2 gap-y-4 gap-x-7 w-[85%] m-auto mt-10 max-md:grid-cols-1'>
                <div>
                    <img src="/ChangesBox1.svg" />
                </div>
                <div>
                    <img src="/ChangesBox2.svg" />
                </div>
                <div>
                    <img src="/ChangesBox3.svg" />
                </div>
                <div>
                    <img src="/ChangesBox4.svg" />
                </div>
               

            </div>


        </div>
    )
}

export default ChangesSection