import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='absolute w-full top-4'>

      <div className='flex justify-around items-center'>

        <Link href="/">
          <img className='h-12' src="/MatrixLogo.svg" />
        </Link>

        <div className='flex justify-between w-[50%]'>
          <Link href="/">Home</Link>
          <Link href="/">Sponsors</Link>
          <Link href="/">Humans</Link>
          <Link href="/">Rules & Rewards</Link>
          <Link href="/">FAQs</Link>
          <Link href="/">Contact Us</Link>
          <Link href="/">Gallery</Link>
        </div>

        <button>
          Register
        </button>

      </div>
    </div>
  )
}

export default Header