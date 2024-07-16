import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        userInfo: string,
    }
}

const BuyerLoggedOut = () => {
    const userInfo = useSelector((state: RootState) => state.auth);
    return (
        userInfo.userInfo ? <Navigate to='/' /> : <Outlet />
    )
}

export default BuyerLoggedOut