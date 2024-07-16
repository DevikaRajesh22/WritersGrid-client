import { Route, Routes } from "react-router-dom"
import Home from "../Pages/User/Home/Home"
import Signup from "../Pages/User/Signup/Signup"
import Login from "../Pages/User/Login/Login"
import Otp from "../Pages/User/Otp/Otp"
import Profile from "../Pages/User/Profile/Profile"
import EditProfile from "../Pages/User/Profile/EditProfile"
import Error from "../Pages/User/Error/Error"
import UserLoggedOut from '../Components/User/UserLoggedOut'
import UserLoggedIn from '../Components/User/UserLoggedIn'

const userRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path="" element={<UserLoggedOut />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="otp" element={<Otp />} />
      </Route>
      <Route path="" element={<UserLoggedIn />}>
        <Route path='profile' element={<Profile />} />
        <Route path="editProfile" element={<EditProfile />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default userRoute