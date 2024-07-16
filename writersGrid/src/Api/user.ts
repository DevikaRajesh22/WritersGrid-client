import Api from "../Service/axios";
import UserEndpoint from '../Service/endpoints/userEndpoints'

export const signup = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(UserEndpoint.userSignup, { name, email, password })
        const token = res.data.token
        localStorage.setItem('userotp', token)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        const token = localStorage.getItem('userotp')
        const res = await Api.post(UserEndpoint.userVerifyOtp, { otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        if (res?.data.success) {
            localStorage.removeItem('userotp')
        }
        return res
    } catch (error) {
        console.log(error)
    }
}

export const otpResend = async () => {
    try {
        const token = localStorage.getItem('userotp')
        const res = await Api.post(UserEndpoint.userResendOtp, '', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        const tokens = res.data.token
        localStorage.setItem('userotp', tokens)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const login = async (email: string, password: string) => {
    try {
        const res=await Api.post(UserEndpoint.userLogin,{email,password})
        return res
    } catch (error) {
        console.log(error)
    }
}