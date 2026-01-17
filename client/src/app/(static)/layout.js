"use server"

import Header from '@/components/static/header'
import Footer from '@/components/static/footer'
import { isRegistered } from '@/utils/auth'
import Image from 'next/image'

const MainLayout = async ({ children }) => {

    const { status } = await isRegistered()

    return (
        <>
            <div className='overflow-hidden relative'>
                <Image src={"/background.svg"} fill alt="background image" className="object-cover opacity-20 -z-10" />
                <div className='min-h-dvh h-fit flex flex-col justify-between '>
                    <Header isRegistered={status} />
                    {children}
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default MainLayout