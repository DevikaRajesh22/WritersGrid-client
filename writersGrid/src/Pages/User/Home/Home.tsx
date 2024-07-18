import Navbar from "../../../Components/User/Navbar"
import Hero from "../../../Components/User/Hero"
import Choose from "../../../Components/User/Choose"
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
                <Footer />
            </main>
        </>
    )
}

export default Home