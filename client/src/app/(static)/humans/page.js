import Person from '@/components/static/Person'
import React from 'react'

const page = () => {

  // const mentor = {
  //   img: "/pfp.jpg",
  //   name: "Mentor Name",
  //   position: "Project Mentor",
  //   github: " ",
  //   linkedin: " .",
  //   info: "Guiding the team with wisdom and technical expertise to bring Winter Arc to life."
  // };

  const committee = [
    {
      img: "/pfp.jpg",
      name: "ADITYA PRATAP SINGH TOMAR",
      position: "Event Coordinator",
      github: "https://github.com/TheAditya-10",
      linkedin: "https://www.linkedin.com/in/aditya-pratap-singh-tomar-693444204/",
      info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
    },
    {
      img: "/teams/vt.jpeg",
      name: "Vivek Tomar",
      position: "Co-Coordinator",
      github: " ",
      linkedin: " ",
      info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
    },
    {
      img: "/teams/rf.jpg",
      name: "Rishika Fulwani",
      position: "Management Head",
      github: " ",
      linkedin: "https://www.linkedin.com/in/rishika-fulwani-11902b327/",
      info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
    },
    {
      img: "/teams/ss.jpg",
      name: "Sariska Shukla",
      position: "Editorial Head",
      github: "https://github.com/Sariska1455",
      linkedin: "https://www.linkedin.com/in/sariska-shukla/",
      info: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy"
    },
  ];

  const tech = [
    {
      img: "/teams/dg.jpg",
      name: "Deepesh Gupta",
      position: "Website Developer",
      github: "https://github.com/200Deepesh",
      linkedin: "https://www.linkedin.com/in/200deepesh/",
    },
    {
      img: "/teams/sid.jpg",
      name: "Siddhant Sharma",
      position: "Development Operations",
      github: "https://github.com/siddhant385",
      linkedin: "https://www.linkedin.com/in/sid385/",
    },
    {
      img: "/teams/vr.jpg",
      name: "Vivek Rajput",
      position: "Frontend Developer",
      github: "https://github.com/TheVivekRajput002",
      linkedin: "https://www.linkedin.com/in/thevivekrajput002/",
    }
  ];

  const studio = [
    {
      img: "/team/aaknp.jpg",
      name: "Akansha Patel",
      position: "Studio Lead",
    },
    {
      img: "/team/addu.jpg",
      name: "Aaditya Patel",
      position: "Designer",
    }
  ];

  const management = [
    {
      img: "/teams/dk.jpg",
      name: "Dhruv Kolare",
    },
    {
      img: "/teams/sl.jpg",
      name: "Samueal Lambert",
    },
    {
      img: "/team/ayank.jpg",
      name: "Ayan Khan",
    },
    {
      img: "/team/umat.jpg",
      name: "Uma Tiwari",
    },
    {
      img: "/team/prathma.jpg",
      name: "Prathma Dubey",
    },
    {
      img: "/team/ananya.jpg",
      name: "Ananya ",
    }
  ];

  return (
    <div className='max-md:mt-15 mt-35 mb-10 font-poppins'>

      {/* hero section  */}
      <div className='flex justify-between w-[80%] mx-auto max-md:flex-col '>

        <div className=' md:w-[60%]  pt-10'>

          <p className='text-left text-4xl font-bold text-[#8ACADE] max-md:text-3xl'>The Team Behind the Vibe</p>

          <div className='flex flex-col items-start '>
            <p className='mt-8'>Meet the students, designers, and developers turning ideas into action.</p>
            <p className=' '>Organizers, augmented crew, and the extended Matrix family — working together to make WINTER ARC a reality.</p>
          </div>
        </div>


        <div className='max-md:mt-8 mt-7'>
          <img className='h-50' src="/humans_hero_sec_img.svg" />
        </div>
      </div>

      {/* Mentor Section */}
      {/* <div className='sm:w-[75%] w-9/10 mx-auto mt-20 flex flex-col items-center'>
        <h2 className='text-3xl font-bold text-[#8ACADE] mb-10 border-b border-[#7689C9]/30 pb-4 w-full'>Our Mentor</h2>
        <div className='pt-10 pb-10 px-10 bg-gradient-to-br from-[#1a1d35] to-[#0f1020] border-2 border-[#7689C9]/50 rounded-4xl shadow-2xl max-w-2xl w-full transform hover:scale-105 transition-transform duration-300'>
          <div className='flex flex-col items-center gap-6'>
            <div className='relative'>
              <div className='absolute -inset-2 bg-gradient-to-r from-[#8ACADE] to-[#7689C9] rounded-full blur opacity-30'></div>
              <img className='h-40 w-40 rounded-full border-4 border-[#8ACADE]/30 object-cover relative z-10' src={mentor.img} alt={mentor.name} />
            </div>

            <div className='text-center space-y-2'>
              <h3 className='text-3xl font-bold text-white'>{mentor.name}</h3>
              <p className='text-[#8ACADE] text-xl font-medium tracking-wide'>{mentor.position}</p>
            </div>

            <div className='flex gap-4 mt-2'>
              <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className='hover:opacity-80 transition-opacity'>
                <img className='h-8' src="/red_linkedin.svg" alt="LinkedIn" />
              </a>
              <a href={mentor.github} target="_blank" rel="noopener noreferrer" className='hover:opacity-80 transition-opacity'>
                <img className='h-8' src="/red_github.svg" alt="GitHub" />
              </a>
            </div>

            <p className='text-gray-300 text-lg leading-relaxed text-center max-w-lg mt-4 font-light italic'>
              &quot;{mentor.info}&quot;
            </p>
          </div>
        </div>
      </div> */}

      {/* Organizing Committee */}
      <div className='sm:w-[75%] w-9/10 mx-auto mt-20'>
        <h2 className='text-3xl font-bold text-[#8ACADE] mb-10 border-b border-[#7689C9]/30 pb-4'>Organizing Committee</h2>
        <div className='max-2xl:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-4 gap-7'>
          {
            committee.map((person, index) => (
              <Person key={index} img={person.img} name={person.name} position={person.position} github={person.github} linkedin={person.linkedin} info={person.info} />
            ))
          }
        </div>
      </div>

      {/* Tech Team */}
      <div className='sm:w-[75%] w-9/10 mx-auto mt-20'>
        <h2 className='text-3xl font-bold text-[#8ACADE] mb-10 border-b border-[#7689C9]/30 pb-4'>Tech</h2>
        <div className='max-lg:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-3 gap-7'>
          {
            tech.map((person, index) => (
              <Person key={index} img={person.img} name={person.name} position={person.position} github={person.github} linkedin={person.linkedin} />
            ))
          }
        </div>
      </div>

      {/* Studio Team */}
      <div className='sm:w-[75%] w-9/10 mx-auto mt-20'>
        <h2 className='text-3xl font-bold text-[#8ACADE] mb-10 border-b border-[#7689C9]/30 pb-4'>Studio</h2>
        <div className='max-lg:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-3 gap-7'>
          {
            studio.map((person, index) => (
              <Person key={index} img={person.img} name={person.name} position={person.position} github={person.github} linkedin={person.linkedin} />
            ))
          }
        </div>
      </div>

      {/* Management Team */}
      <div className='sm:w-[75%] w-9/10 mx-auto mt-20'>
        <h2 className='text-3xl font-bold text-[#8ACADE] mb-10 border-b border-[#7689C9]/30 pb-4'>Augmented Crew</h2>
        <div className='max-lg:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-3 gap-7'>
          {
            management.map((person, index) => (
              <Person key={index} img={person.img} name={person.name} position={person.position} github={person.github} linkedin={person.linkedin} />
            ))
          }
        </div>
      </div>


    </div>


  )
}

export default page