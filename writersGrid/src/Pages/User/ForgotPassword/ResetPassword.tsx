import React, { useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from '../../../Api/user'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from '../../../Store/Slice/authSlice';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            if (password.trim().length < 5) {
                toast.error('Password should be more than 6 characters!')
            } else if (confirmPassword.trim().length < 5) {
                toast.error('Password should be more that 6 characters!')
            } else if (password !== confirmPassword) {
                toast.error('Passwords doesnt match!')
            }
            const userData = localStorage.getItem('userotpforgotpassword')
            if (userData) {
                const tokenPayload = userData.split('.')[1];
                const decodedPayload = atob(tokenPayload);
                const payloadObject = JSON.parse(decodedPayload);
                const email = payloadObject.userFound.email
                if (email) {
                    const res = await resetPassword(email, password);
                    if (res?.data.success) {
                        toast.success(res?.data.message)
                        dispatch(setCredentials(res.data.token))
                        navigate('/login')
                    } else if (!res?.data.success) {
                        toast.error(res?.data.message)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Confirm password
                            </label>
                            <input
                                type="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                id="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            style={{ backgroundColor: '#013220' }}
                            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Reset passwod
                        </button>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default ResetPassword