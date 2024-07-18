import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from '../../../Api/user';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error('Please enter valid email !!');
                return;
            }
            const res = await forgotPassword(email);
            if (res?.data.success) {
                navigate(`/forgotPasswordOtp`);
            } else {
                toast.error('User doesnt exists !!');
                navigate('/signup');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main
            id="content"
            role="main"
            className="flex items-center justify-center min-h-screen w-full max-w-lg mx-auto p-6"
        >
            <div className="mt-7 bg-white rounded-xl shadow-lg border-2">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800">
                            Forgot password?
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Remember your password?
                            <Link
                                className="text-blue-600 decoration-2 hover:underline font-medium"
                                to='/login'
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold ml-1 mb-2"
                                    >
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            name="email"
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            aria-describedby="email-error"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    style={{ backgroundColor: '#013220' }}
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;