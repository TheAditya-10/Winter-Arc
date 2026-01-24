"use server"

import HeroSection from '@/components/static/HeroSection'
import EventTimer from '@/components/static/EventTimer'
import ChangesSection from '@/components/static/ChangesSection'
import { isRegistered } from '@/utils/auth'

const page = async () => {

  const { status } = await isRegistered()

  return (
    <div>
      <HeroSection />

      <EventTimer isRegistered={status} />

      <ChangesSection />

      <div className='w-[90%] max-w-7xl mx-auto my-20 max-md:my-10'>
        <img 
          src='/winter-arc-flow.jpg' 
          alt='event flow' 
          className='w-full h-auto rounded-lg shadow-lg'
        />
      </div>

    </div>
  )
}

export default page