import React from 'react'

const page = () => {
    return (
        <div>
            <div className='flex flex-col items-center'>
                <p className='mt-35 text-[#8ACADE] text-6xl font-bold max-md:text-3xl max-md:mt-25'>RULES and regulations </p>
                <p className='mt-8 font-semibold text-xl w-[80%] max-md:w-[70%] text-center max-md:text-sm'>Please read carefully. Participation in Winter Arc implies full acceptance of the rules below.</p>
            </div>

            <div className='flex items-center justify-center mt-15 gap-5 max-md:mt-10 max-md:mx-2 max-md:flex-col'>

                <img className='h-205 max-md:h-112 max-md:mx-auto' src="/RulesRegulationsBox1.svg" alt="" />

                <div className='flex flex-col gap-5'>
                    <img className='h-92 max-md:h-90' src="/RulesRegulationsBox2.svg" alt="" />
                    <img className='h-107 max-md:h-105' src="/RulesRegulationsBox3.svg" alt="" />
                </div>

            </div>

            <p className='mt-25 text-[#7689C9] text-5xl font-bold max-md:text-4xl text-center max-md:mt-15'>PRIZES AND REWARDS</p>

            <div className='flex mt-20 gap-5 items-center justify-center max-md:flex-col max-md:mt-10'>
                <img className='h-80 max-md:mx-auto max-md:h-60 max-md:pl-4' src="/PrizesBox.svg" alt="" />
                <img className='h-80 max-md:h-60' src="/WeaklyFirePlaceBox.svg" alt="" />
            </div>
            <img className='h-60 mx-auto mt-10 max-md:h-21 max-md:mt-5' src="/placesBox.svg" alt="" />


            <p className='mt-20 mx-auto text-xl w-[80%] max-md:w-[70%] max-md:text-sm text-center max-md:mt-10'>Winter Arc rewards consistency, honesty, and effort.</p>
            <p className=' mx-auto text-xl w-[80%] max-md:w-[70%] max-md:text-sm text-center max-md:mb-10'>By participating, you agree to respect the process, the community, and the spirit of learning.</p>

        </div>
    )
}

export default page