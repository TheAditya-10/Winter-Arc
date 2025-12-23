import React from 'react'

const Footer = () => {
  return (
    <div>



      <div className='max-md:hidden w-[90%] flex justify-between mt-30 mb-14 mx-auto'>

        {/* Footer logo  */}

        <div>
          <img className='h-15 max-md:h-8' src="/MatrixFooterLogo.svg" />
          <p className='text-sm font-semibold mt-3 max-md:text-xs'>© 2025 Matrix JEC, All rights are reserved.</p>
        </div>

        {/* footer links */}

        <div className='grid grid-cols-2 gap-20'>
          <div>
            <p className='font-bold text-[rgb(255,255,255,0.8)] text-lg'>Community</p>
            <div className='flex flex-col gap-2 mt-4'>

              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>About</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Guidelines</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Events</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Blogs</p>

            </div>
          </div>

          <div>
            <p className='font-bold text-[rgb(255,255,255,0.8)] text-lg'>Resources</p>
            <div className='flex flex-col gap-2 mt-4'>

              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Documentation</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Learning Center</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>API Reference</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Support</p>

            </div>
          </div>


        </div>

        {/* footer connect with us  */}
        <div>
          <p className='text-3xl'>Connect with us</p>

          <div className='flex mt-4 gap-6'>
            <img className='h-8' src="/twitter.svg" />
            <img className='h-8' src="/github.svg" />
            <img className='h-8' src="/linkedin.svg" />
            <img className='h-8' src="/discord.svg" />
          </div>

        </div>
      </div>

      {/* phone view  */}
      <div className='md:hidden w-[85%] mx-auto flex items-center flex-col mt-10'>
        <div className='flex justify-around w-[100%]'>
          <div>
            <p className='font-bold text-[rgb(255,255,255,0.8)] text-lg'>Community</p>
            <div className='flex flex-col gap-2 mt-4'>

              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>About</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Guidelines</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Events</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Blogs</p>

            </div>
          </div>

          <div>
            <p className='font-bold text-[rgb(255,255,255,0.8)] text-lg'>Resources</p>
            <div className='flex flex-col gap-2 mt-4'>

              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Documentation</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Learning Center</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>API Reference</p>
              <p className='font-semibold text-sm text-[rgb(255,255,255,0.8)]'>Support</p>

            </div>
          </div>


        </div>

        <div className='mt-10'>

          <img className='h-12 ' src="/MatrixFooterLogo.svg" />
          <div className='flex mt-1 gap-7'>
            <img className='h-6' src="/twitter.svg" />
            <img className='h-6' src="/github.svg" />
            <img className='h-6' src="/linkedin.svg" />
            <img className='h-6' src="/discord.svg" />
            <img className='h-6' src="/instagram.svg" />

          </div>

        </div>

        <p className='text-xs font-semibold mt-8 mb-6'>© 2025 Matrix JEC, All rights are reserved.</p>

      </div>

    </div>
  )
}

export default Footer