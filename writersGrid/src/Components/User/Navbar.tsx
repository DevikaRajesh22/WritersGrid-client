import { useState, useEffect } from 'react';
import logo from '../../assets/logoNoBg.png';
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import user from '../../assets/user.png';
import { profile, userLogout } from '../../Api/user';
import { logout } from '../../Store/Slice/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface RootState {
  auth: {
    userInfo: string | null;
  };
}

const Navbar = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout=async()=>{
    try{
      const res=await userLogout()
      if(res?.data.success){
        dispatch(logout())
        toast.success('Logged out successfully...')
        navigate('/login')
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await profile();
        if (res?.data.userProfile) {
          setName(res?.data.userProfile.name);
          setImage(res?.data.userProfile.image || user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 border-b border-gray-200" style={{ backgroundColor: '#013220' }}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} style={{ height: 50, width: 50 }} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Writers Grid</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!userInfo ? (
            <Link to='/signup'>
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center" style={{ backgroundColor: '#ECF0F1', color: "#000000" }}>Signup</button>
            </Link>
          ) : (
            <div className="relative">
              <button
                type="button"
                className="flex items-center space-x-2 border-2 border-white p-1 rounded-full"
                onClick={toggleDropdown}
              >
                <img src={image} alt="User avatar" className="w-8 h-8 rounded-full" />
                <span className="text-white">{name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1" style={{ zIndex: 30 }}>
                  <Link to='/profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to='#' onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                </div>
              )}
            </div>
          )}
          <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        {userInfo && (
          <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`} onClick={toggleSidebar}>
            <div className="w-64 h-full bg-white p-4 space-y-4">
              <ul className="space-y-4">
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100">Articles</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-gray-100">My Articles</a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {userInfo && (
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0" style={{ backgroundColor: '#013220' }}>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Articles</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">My Articles</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;