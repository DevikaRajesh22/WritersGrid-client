import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        adminLogout: (state) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {setCredentials, logout, setAdminCredentials, adminLogout}=authSlice.actions
export default authSlice.reducer