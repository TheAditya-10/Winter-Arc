import React from 'react'

const ChangesSection = () => {
    return (
        <div>

            <p className='text-[60px] text-center '>“What changes in me if I complete this?”</p>

            <div className='grid grid-cols-2 gap-y-4 gap-x-7 w-[85%] m-auto mt-10'>
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