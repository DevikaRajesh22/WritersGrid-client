import logo from '../../../assets/logoNoBg.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from '../../../Store/Slice/authSlice';
import { login } from '../../../Api/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Please enter valid email !!')
        return
      } else if (password.trim().length < 6) {
        toast.error('Please enter valid password !!')
        return
      }
      const res = await login(email, password)
      if (res?.data.success) {
        dispatch(setCredentials(res?.data.token))
        toast.success('Successfully Logged in..')
        navigate('/')
      } else if (!res?.data.success) {
        toast.error(res?.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Writers Grid
        </Link>
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" />
                <Link to='/forgotPassword'>
                  <p className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Forgot password?</p>
                </Link>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" style={{ backgroundColor: '#013220' }}>Log in</button>
              <p className="text-sm font-light text-gray-500">
                Create new account? <Link to="/signup" className="font-medium text-primary-600 hover:underline">Signup here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login