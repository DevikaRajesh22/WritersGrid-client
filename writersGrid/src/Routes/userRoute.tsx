import { Route, Routes } from "react-router-dom"
import Home from "../Pages/User/Home/Home"
import Signup from "../Pages/User/Signup/Signup"
import Login from "../Pages/User/Login/Login"
import Otp from "../Pages/User/Otp/Otp"
import Profile from "../Pages/User/Profile/Profile"
import EditProfile from "../Pages/User/Profile/EditProfile"
import Articles from "../Pages/User/Articles/Articles"
import MyArticles from "../Pages/User/Articles/MyArticles"
import NewArticle from "../Pages/User/Articles/NewArticle"
import EditArticles from "../Pages/User/Articles/EditArticles"
import SingleArticle from "../Pages/User/Articles/SingleArticle"
import ForgotPassword from "../Pages/User/ForgotPassword/ForgotPassword"
import ResetPassword from "../Pages/User/ForgotPassword/ResetPassword"
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
        <Route path="otp" element={<Otp user={false} />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path='resetPassword' element={<ResetPassword />} />
        <Route path='forgotPasswordOtp' element={<Otp user={true}/>}/>
      </Route>
      <Route path="" element={<UserLoggedIn />}>
        <Route path='profile' element={<Profile />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path='articles' element={<Articles />} />
        <Route path='myArticles' element={<MyArticles />} />
        <Route path='newArticle' element={<NewArticle />} />
        <Route path='editArticle/:id' element={<EditArticles />} />
        <Route path='singleArticle/:id' element={<SingleArticle />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default userRoute