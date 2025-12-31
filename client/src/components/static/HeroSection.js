import Link from "next/link"

const HeroSection = () => {
  return (
    <div
      className='h-screen bg-cover bg-center max-md:h-[60%]'
      style={{ backgroundImage: "url('/hero_section_bg_image.png')" }}
    >
      <div className='flex flex-col items-center pt-[19vh]'>
        <h1 className='lg:text-9xl md:text-6xl text-4xl font-goldman font-bold'>WINTER ARC</h1>

        <div className='mt-7 font-goldman'>
          <p className='text-2xl text-center max-md:text-sm'>“One task a day. Thirty days. No excuses.”</p>
          <p className='text-2xl text-center max-md:text-sm'>“Commit to January. Build discipline.”</p>
        </div>

        <button className='bg-[#8ACADE] text-black py-4 px-5 mt-10 rounded-xl font-bold max-md:scale-80'>
          START THE WINTER ARC
        </button>

        <a href="https://chat.whatsapp.com/CocJDKNXlbEIZ4RRhytkLs" target="_blank" className='bg-[#25d366] text-[#052e16] py-3 font-semibold px-6  mt-4 rounded-4xl text-sm max-md:scale-85'>
        Join the WhatsApp Circle
        </a>

        <div className='flex items-center mt-15 max-md:flex-col'>
          <p className='text-3xl font-semibold'>POWERED BY  </p>
          <img className='h-15' src="/MatrixLogo.svg" />
        </div>

      </div>


    </div>
  )
}

export default HeroSection

