import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoute from "./Routes/userRoute";
import AdminRoute from "./Routes/adminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
