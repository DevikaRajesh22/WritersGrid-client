import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../Api/user';
import userImage from '../../assets/user.png';

interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    password: string;
    isBlocked: boolean;
    creationTime: Date;
}

const Profile = () => {
    const [image, setImage] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await profile();
                if (res?.data?.userProfile) {
                    setUser(res.data.userProfile);
                    setImage(res.data.userProfile.image || null);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, []);

    function formatDate(dateString: Date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    const src = image || userImage;

    return (
        <div className="flex justify-center items-start h-screen">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-center items-center mt-20">
                <div className="flex justify-end px-4 pt-4"></div>
                <div className="flex flex-col items-center pb-10">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                        src={src}
                        alt="Profile Image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">
                        {user?.name}
                    </h5>
                    <span className="text-sm text-gray-500">
                        Email: {user?.email}
                    </span>
                    {user?.creationTime && (
                        <span className="text-sm text-gray-500 ">
                            Since {formatDate(user.creationTime)}
                        </span>
                    )}

                    <div className="flex mt-4 md:mt-6">
                        <Link
                            to='/editProfile'
                            style={{ backgroundColor: '#013220' }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;