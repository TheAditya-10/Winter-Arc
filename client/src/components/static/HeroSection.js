import React from 'react'

const HeroSection = () => {
  return (
    <div
      className='h-screen bg-cover bg-center'
      style={{ backgroundImage: "url('/hero_section_bg_image.png')" }}
    >
      <div className='flex flex-col items-center pt-[19vh]'>
        <h1 className='text-9xl '>WINTER ARC</h1>

        <div className='mt-7'>
          <p className='text-2xl text-center'>“One task a day. Thirty days. No excuses.”</p>
          <p className='text-2xl text-center'>“Commit to January. Build discipline.”</p>
        </div>

        <button className='bg-[#8ACADE] text-black py-3 px-4 mt-10 rounded-xl font-bold '>
          START THE WINTER ARC
        </button>

        <button className='bg-[rgb(217,225,227,0.53)] text-black py-2 px-8 mt-4 rounded-xl font-bold text-sm'>
          KNOW MORE!!
        </button>

        <div className='flex items-center mt-15'>
          <p className='text-3xl font-semibold'>POWERED BY  </p>
          <img className='h-15' src="/MatrixLogo.svg" />
        </div>

      </div>


    </div>
  )
}

export default HeroSection