import Navbar from "../../../Components/User/Navbar"
import Hero from "../../../Components/User/Hero"
import Choose from "../../../Components/User/Choose"
import Featured from "../../../Components/User/Featured"
import Footer from "../../../Components/User/Footer"

const Home = () => {
    return (
        <>
            <main className="mt-8">
                <Navbar />
                <Hero />
                <div className="my-2">
                    <Choose />
                </div>
                <div className="my-8">
                    <Featured />
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Home