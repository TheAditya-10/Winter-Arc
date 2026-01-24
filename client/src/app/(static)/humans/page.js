import Person from '@/components/static/Person'
import React from 'react'

const page = () => {

const humans = [
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  },
  {
    img: "/pfp.jpg",
    name: "John Smith",
    position: "CEO",
    github: "https://github.com/TheVivekRajput002",
    linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
  }
]

  return (
    <div className='max-md:mt-15 mt-35 mb-10 font-poppins'>

{/* hero section  */}
      <div className='flex justify-between w-[80%] mx-auto max-md:flex-col '>

        <div className=' md:w-[60%]  pt-10'>

          <p className='text-left text-4xl font-bold text-[#8ACADE] max-md:text-3xl'>The Team Behind the Vibe</p>

          <div className='flex flex-col items-start '>
            <p className='mt-8'>Meet the students, designers, and developers turning ideas into action.</p>
            <p className=' '>Organizers, mentors, and the extended Matrix family — working together to make WINTER ARC a reality.</p>
          </div>
        </div>


        <div className='max-md:mt-8 mt-7'>
          <img className='h-50' src="/humans_hero_sec_img.svg" />
        </div>
      </div>

      {/* <div className='md:mt-30 max-md:mt-15 max-lg:grid-cols-2 max-sm:grid-cols-1  grid grid-cols-3 gap-7 w-[75%] mx-auto'>
        {
          humans.map((humans,index) => (
            <Person key={index} img={humans.img} name={humans.name} position={humans.position} github={humans.github} linkedin={humans.linkedin} info={humans.info} />
          ))
        }
      </div> */}


    </div>


  )
}

export default page