import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login/Login'

const adminRoute = () => {
  return (
    <Routes>
        <Route path='login' element={<Login />} />
    </Routes>
  )
}

export default adminRoute