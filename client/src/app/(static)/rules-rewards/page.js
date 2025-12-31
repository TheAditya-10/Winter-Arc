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

            {/* Prize Announcement Section */}
            <div className='flex flex-col items-center justify-center mt-20 max-md:mt-10'>
                <div className='relative w-[80%] max-md:w-[90%] mx-auto'>
                    {/* Decorative background */}
                    <div className='absolute inset-0 bg-gradient-to-r from-[#7689C9]/20 via-[#8ACADE]/20 to-[#7689C9]/20 rounded-2xl blur-xl'></div>
                    
                    {/* Main content */}
                    <div className='relative bg-gradient-to-br from-[#1a1d35] to-[#0f1020] border-2 border-[#7689C9]/50 rounded-2xl p-12 max-md:p-8 text-center shadow-2xl'>
                        {/* Icon/Emoji */}
                        <div className='text-6xl max-md:text-4xl mb-6 animate-bounce'>
                            🎁
                        </div>
                        
                        {/* Main heading */}
                        <h3 className='text-4xl max-md:text-2xl font-bold bg-gradient-to-r from-[#8ACADE] via-[#7689C9] to-[#8ACADE] bg-clip-text text-transparent mb-4'>
                            Exciting Prizes Coming Soon!
                        </h3>
                        
                        {/* Description */}
                        <p className='text-lg max-md:text-base text-gray-300 mb-6 leading-relaxed'>
                            Amazing rewards await the most dedicated participants. <br className='max-md:hidden'/>
                            Cash prizes, gadgets, merchandise, and exclusive certificates are on the way!
                        </p>
                        
                        {/* CTA text */}
                        <div className='inline-block px-8 py-3 bg-gradient-to-r from-[#7689C9] to-[#8ACADE] rounded-full text-white font-semibold text-sm max-md:text-xs shadow-lg'>
                            Stay Tuned • Announcements Soon
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='flex mt-20 gap-5 items-center justify-center max-md:flex-col max-md:mt-10'>
                <img className='h-80 max-md:mx-auto max-md:h-60 max-md:pl-4' src="/PrizesBox.svg" alt="" />
                <img className='h-80 max-md:h-60' src="/WeaklyFirePlaceBox.svg" alt="" />
            </div>
            <img className='h-60 mx-auto mt-10 max-md:h-21 max-md:mt-5' src="/placesBox.svg" alt="" /> */}


            <p className='mt-20 mx-auto text-xl w-[80%] max-md:w-[70%] max-md:text-sm text-center max-md:mt-10'>Winter Arc rewards consistency, honesty, and effort.</p>
            <p className=' mx-auto text-xl w-[80%] max-md:w-[70%] max-md:text-sm text-center max-md:mb-10'>By participating, you agree to respect the process, the community, and the spirit of learning.</p>

        </div>
    )
}

export default page