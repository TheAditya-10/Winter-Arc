import Link from "next/link"

const EventTimer = ({ isRegistered }) => {
    return (
        <div className='max-md:h-[40%]'>
            <div
                className='h-screen bg-cover bg-center py-[180px] bg-no-repeat my-[-30px] px-[100px] max-md:h-[150%] max-md:bg-cover max-md:px-0 max-md:py-0 max-md:my-5'
                style={{ backgroundImage: "url('/EventTimerBg.svg')" }}
            >
                <p className='text-4xl text-[#184654] max-md:text-lg max-md:pt-14 max-md:pl-7'>Event Starts In</p>
                <p className='text-[120px] text-[#0A0F1F] max-md:text-5xl max-md:pl-9'>12:05:30</p>

                <div className='flex gap-30 ml-10 text-[#0A0F1F] max-md:m-0 max-md:gap-6 max-md:text-xs max-md:pl-12'>
                    <p>DAYS</p>
                    <p>HOURS</p>
                    <p>MINUTES</p>
                </div>

                <div className='mt-6'>
                    <Link href={isRegistered ? "/dashboard/me" : "/auth/register"}>
                        <button className='ml-45 py-1 rounded-lg px-8 bg-[#8ACADE] border-2 border-[#0A0F1F] text-black font-semibold max-md:mx-auto  max-md:scale-70'>
                            {isRegistered ? "Dashboard" : "Register"}
                        </button>
                    </Link>
                </div>


            </div>
        </div>

    )
}

export default EventTimer