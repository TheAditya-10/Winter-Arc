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

    </div>
  )
}

export default page