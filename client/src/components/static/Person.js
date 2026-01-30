import React from 'react'
import Link from 'next/link'

const Person = ({ img, name, position, github, linkedin, info }) => {
    return (
        <div className='pt-3 pb-3 px-3 bg-gradient-to-br from-[#1a1d35] to-[#0f1020] border-2 border-[#7689C9]/50 rounded-4xl shadow-xl' >
            <div className='flex justify-between'>
                <div className='w-28 h-28 overflow-hidden rounded-full border-2 border-[#7689C9]/30'>
                    <img className='w-full h-full object-cover' src={img} />
                </div>

                <div className='flex flex-col justify-between '>
                    <div className='flex gap-2 justify-end'>
                        { !!linkedin && <Link href={linkedin} ><img className='h-6' src="/red_linkedin.svg" /></Link>}
                        { !!github && <Link href={github} ><img className='h-6' src="/red_github.svg" /></Link>}
                    </div>
                    <div className='text-right max-w-40'>
                        <p className='text-white font-semibold'>{name}</p>
                        {!!position && <p className='text-[#8ACADE] text-sm'>{position}</p>}
                    </div>
                </div>

            </div>

            <br />

            <p className='text-gray-300 text-sm leading-relaxed'>{info}</p>


        </div>
    )
}

export default Person