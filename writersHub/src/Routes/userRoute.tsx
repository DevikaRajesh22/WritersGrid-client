import { Route, Routes } from "react-router-dom"
import Home from "../Pages/User/Home/Home"
import Signup from "../Pages/User/Signup/Signup"
import Login from "../Pages/User/Login/Login"
import Otp from "../Pages/User/Otp/Otp"

const userRoute = () => {
  return (
    <Routes>
         <Route path='' element={<Home />} />
         <Route path="signup" element={<Signup/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="otp" element={<Otp/>}/>
    </Routes>
  )
}

export default userRoute