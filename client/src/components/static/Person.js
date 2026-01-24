import React from 'react'
import Link from 'next/link'

const Person = ({img, name, position, github, linkedin, info}) => {
  return (
    <div className='pt-6 pb-6 px-6 bg-[#FFFFFF] rounded-4xl' >
        <div className='flex justify-between'>
        <div>
            <img className='h-30 rounded-full' src={img}/>
        </div>

        <div className='flex flex-col justify-between'>
            <div className='flex gap-2'>
                <Link href={linkedin} ><img className='h-6' src="/red_linkedin.svg" /></Link>
                <Link href={github} ><img className='h-6' src="/red_github.svg" /></Link>
                
            </div>
            <div>
                <p className='text-black font-semibold'>{name}</p>
                <p className='text-black'>{position}</p>
            </div>
        </div>

        </div>

        <br/>

        <p className='text-black'>{info}</p>


    </div>
  )
}

export default Person