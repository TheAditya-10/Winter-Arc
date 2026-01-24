import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div>


      <div className='max-md:hidden w-[90%] flex justify-around items-center mt-30 mb-14 mx-auto'>

        {/* Footer logo  */}


        <div>
          <img className='h-15 max-md:h-8' src="/MatrixFooterLogo.svg" />
          <p className='text-sm font-semibold mt-3 max-md:text-xs'>© 2025 Matrix JEC, All rights are reserved.</p>
        </div>

        <div>
          <img className='h-45' src="/WinterArcSnow2.svg" alt="" />
        </div>


        {/* footer connect with us  */}
        <div>
          <p className='text-3xl'>Connect with us</p>

          <div className='flex mt-4 gap-6'>

            <a href='https://x.com/MatrixJec'>
              <img className='h-8' src="/twitter.svg" />
            </a>
            <a href='https://github.com/Matrix-JEC'>
              <img className='h-8' src="/github.svg" />
            </a>
            <a href='https://www.linkedin.com/company/matrix-jec/'>
              <img className='h-8' src="/linkedin.svg" />
            </a>
            <a href='https://www.instagram.com/matrix.jec/'>
              <img className='h-9' src="/insta.svg" />
            </a>

          </div>

        </div>
      </div>

      {/* phone view  */}
      <div className='md:hidden w-[85%] mx-auto flex items-center flex-col mt-10'>

        <div className='mt-10'>

          <img className='h-12 ' src="/MatrixFooterLogo.svg" />
          <div className='flex mt-3 justify-center gap-7'>

            <a href='https://x.com/MatrixJec'>
              <Image className='h-6' src="/twitter.svg" alt="Twitter" width={24} height={24} />
            </a>
            <a href='https://github.com/Matrix-JEC'>
              <Image className='h-6' src="/github.svg" alt="GitHub" width={24} height={24} />
            </a>
            <a href='https://www.linkedin.com/company/matrix-jec/'>
              <Image className='h-6' src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </a>
            <a href='https://www.instagram.com/matrix.jec/'>
              <Image className='h-6' src="/insta.svg" alt="Instagram" width={24} height={24} />
            </a>
          </div>

        </div>

        <p className='text-xs font-semibold mt-8 mb-6'>© 2025 Matrix JEC, All rights are reserved.</p>

      </div>

    </div>
  )
}

export default Footer