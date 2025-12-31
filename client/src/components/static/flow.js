import flow1Png from "/flow1.png"
import flow2Png from "/flow2.png"
import flow3Png from "/flow3.png"
import flow4Png from "/flow4.png"
import flow5Png from "/flow5.png"
import flow6Png from "/flow6.png"
import eventFlowSvg from "/eventFlow.svg"
import starSvg from "/star.svg"

const cardContents = [
    { heading: "Register your vibe", text: "Play solo or team up with a coding buddy. Fill out the form and get ready to vibe.", img: flow1Png, position: "self-start" },
    { heading: "Show Up, Sync Up", text: "Arrive at the venue, settle in, and meet fellow devs. Bring your laptop, ideas & good vibes.", img: flow2Png, position: "self-end" },
    { heading: "The Briefing Begins", text: "Understand the rules, judging criteria, problem statement scope, and tech do’s & don’ts.", img: flow3Png, position: "self-start" },
    { heading: "Think It. Plan It.", text: "You get 20 minutes to brainstorm, whiteboard, or just vibe your ideas before hands-on starts.", img: flow4Png, position: "self-end" },
    { heading: "Build in the Zone", text: "4 hours of pure building. Use AI + Web tools to create your problem-solving website.", img: flow5Png, position: "self-start" },
    { heading: "Demo & Decide", text: "Mentors and judges review your work. Shortlisted teams demo. Winners announced on the spot.", img: flow6Png, position: "self-end" },
]

const FlowCard = ({ heading, text, img, position }) => {
    return (
        
        <div className={`bg-[#1C1A1A] ms:rounded-4xl rounded-2xl flex ms:pl-32 pl-4 ms:h-48 h-40 ms:w-[38rem] w-fit pr-2 justify-evenly ms:py-6 py-4 ${position} max-lg:self-start relative`}>
            <img src={starSvg} alt="" className='absolute z-20 ms:top-8 top-6 ms:left-14 -left-6 w-4'/>
            <div className='w-fit'>
                <h3 className='font-syne font-semibold ms:text-2xl text-xl ms:w-64 w-54 ms:mb-6 mb-4'>{heading}</h3>
                <p className='font-syne text-sm w-50 sm:pl-8 pl-4'>{text}</p>
            </div>
            <img src={img} alt="" className='h-full ms:w-50 min-[25rem]:w-32 w-28 object-contain' />
        </div>
    )
}

const Flow = () => {
    return (
        <section>
            {/* <BlurElement
  elements={[ */}
   
            <h2 className='font-poppins text-[#CF2C3C] font-bold ms:text-5xl text-3xl ms:mb-8 mb-4'>Hackathon Flow</h2>,
            <div className='relative flex flex-col gap-[2.375rem] lg:w-[60.4rem] w-fit m-auto max-[24rem]:ml-6'>
                <div className='absolute z-10 h-full w-fit top-10 left-16 hidden lg:block'>
                    <img src={eventFlowSvg} alt=""/>
                </div>
                <div className='absolute z-10 ms:h-[72rem] h-[62rem] w-[2px] ms:top-10 top-8 ms:left-16 -left-4 bg-red-700 lg:hidden'>
                </div>
                {cardContents.map((ele, index) => {
                    return <FlowCard key={index} heading={ele.heading} text={ele.text} img={ele.img} position={ele.position} />
                })}
            </div>,
  {/* ]}
  delay={300}
      direction="top"
      className="flex-col justify-around max-ml:flex-col gap-2 items-center w-full"
/> */}

        
        </section>
    )
}

export default Flow