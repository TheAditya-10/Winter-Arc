
const ContactUs = () => {
    return (
        <>
            <div className='mt-25 w-[80%] mx-auto'>
                <p className='text-left text-5xl font-bold text-[#8ACADE] max-md:text-3xl'>How Can We Help You ? </p>

                <div className="flex items-center justify-between mx-auto">


                    <div className="w-[50%]">
                        <p className=' text-left text-4xl font-semibold text-white max-md:text-3xl'>We’re Here To</p>
                        <p className='mt-2 text-left text-3xl font-semibold text-white max-md:text-3xl'>Connect And</p>
                        <p className='mt-2 text-left text-3xl font-semibold text-white max-md:text-3xl'>Assist You</p>
                        <p className='mt-10 font-light text-lg text-white max-md:text-3xl'>Have questions, need assistance, or just want to connect?
                            Our team is ready to assist you.</p>

                        <div className="grid grid-cols-2 gap-10 mt-12">
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold \ max-md:text-3xl'>Contact Us</p>
                                <p className='text-left text-lg  text-white max-md:text-3xl'>+91 6267xxxxxx</p>
                            </div>
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold \ max-md:text-3xl'>Contact Us</p>
                                <p className='text-left text-lg  text-white max-md:text-3xl'>+91 6267xxxxxx</p>
                            </div>
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold \ max-md:text-3xl'>Contact Us</p>
                                <p className='text-left text-lg  text-white max-md:text-3xl'>+91 6267xxxxxx</p>
                            </div>
                            <div>
                                <p className='text-left text-xl text-[#8ACADE] font-bold \ max-md:text-3xl'>Contact Us</p>
                                <div className="flex gap-4">
                                    <img src="/facebook.svg" />
                                    <img src="/linkedin.svg" />
                                    <img className="h-10" src="/instagram.svg" />
                                    <img src="/youtube.svg" />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div>
                        <img className="h-115 mt-12" src="/contact_us_illustration.svg" />
                    </div>
                </div>


            </div>
        </>
    )
}

export default ContactUs