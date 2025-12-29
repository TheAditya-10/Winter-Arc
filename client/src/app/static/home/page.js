import React from 'react'
import HeroSection from '@/components/static/HeroSection'
import EventTimer from '@/components/static/EventTimer'
import ChangesSection from '@/components/static/ChangesSection'

const page = () => {
  return (
    <div>
        <HeroSection />

        <EventTimer />

        <ChangesSection />

    </div>
  )
}

export default page