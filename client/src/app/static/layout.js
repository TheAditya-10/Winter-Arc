import Header from '@/components/static/header'
import Footer from '@/components/static/footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <div className='min-h-dvh h-fit flex flex-col justify-between'>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default MainLayout