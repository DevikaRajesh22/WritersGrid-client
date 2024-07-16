import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        userInfo: string
    }
}

const BuyerLoggedIn = () => {
    const userInfo = useSelector((state: RootState) => state.auth);
    return (
        userInfo.userInfo ? < Outlet /> : <Navigate to='/login' />
    )
}

export default BuyerLoggedIn