"use server"

import HeroSection from '@/components/static/HeroSection'
import EventTimer from '@/components/static/EventTimer'
import ChangesSection from '@/components/static/ChangesSection'
import { isRegistered } from '@/utils/auth'
import Image from 'next/image'

const page = async () => {

  const { status } = await isRegistered()

  return (
    <div>
      <HeroSection />

      <EventTimer isRegistered={status} />

      <ChangesSection />

      {/* <Image src={'./public/winter-arc-flow.svg'} width={0} height={0} alt='event flow' className='w-full h-auto'/> */}

    </div>
  )
}

export default page