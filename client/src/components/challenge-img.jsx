'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ChallengeImage({id}) {
  const [error, setError] = useState(false)

  return (
    <Image
      src={error ? '/sidebar/challenge.svg' : `/challenge-card-img/${id}.png`}
      alt="challenge image"
      width={40}
      height={40}
      onError={() => setError(true)}
      className=""
    />
  )
}
