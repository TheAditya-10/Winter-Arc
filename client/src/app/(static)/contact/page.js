
const ContactUs = () => {
    return (
        <>
            <div className='mt-25 w-[80%] mx-auto max-md:w-[80%]'>
                <p className='text-left text-5xl font-bold text-[#8ACADE] max-md:text-3xl'>How Can We Help You ? </p>

                <div className="flex items-center justify-between mx-auto max-md:flex-col">


                    <div className="w-[50%] max-md:w-[100%] mt-6">
                        <p className=' text-left text-4xl font-semibold text-white max-md:text-2xl'>We&#39;re Here To</p>
                        <p className='mt-2 text-left text-3xl font-semibold text-white max-md:text-2xl'>Connect And</p>
                        <p className='mt-2 text-left text-3xl font-semibold text-white max-md:text-2xl'>Assist You</p>
                        <p className='mt-10 font-light text-lg text-white max-md:text-lg max-md:mt-4'>Have questions, need assistance, or just want to connect?
                            Our team is ready to assist you.</p>

                        <div className="grid grid-cols-2 gap-10 mt-12 max-md:grid-cols-1 max-md:mt-8">
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold max-md:text-xl'>CONTACT US</p>
                                <p className='text-left text-lg  text-white max-md:text-md'>+91 6267xxxxxx</p>
                            </div>
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold max-md:text-xl'>EVENT HOST</p>
                                <p className='text-left text-lg  text-white max-md:text-lg'>Team Matrix </p>
                            </div>
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold max-md:text-xl'>EMAIL</p>
                                <p className='text-left text-lg  text-white max-md:text-lg'>team.matrix.jec@gmail.com</p>
                            </div>
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold max-md:text-xl'>FOLLOW US</p>
                                <div className="flex gap-4 items-center">
                                    <img className="h-4" src="/facebook.svg" />
                                    <img className="h-7"  src="/linkedin.svg" />
                                    <img className="h-8" src="/instagram.svg" />
                                    <img className="h-4"  src="/youtube.svg" />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div>
                        <img className="h-115 mt-12 max-md:mt-[-5px]" src="/contact_us_illustration.svg" />
                    </div>
                </div>


            </div>
        </>
    )
}

export default ContactUs