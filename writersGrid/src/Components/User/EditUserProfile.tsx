import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { profile, editProfile } from "../../Api/user";

const EditUserProfile = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate()

    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try{
            if(name.trim().length<3){
                toast.error('Name should have more than 3 characters !!')
                return 
            }
            const formData = new FormData();
            formData.append('name', name)
            if(image){
                formData.append('image',image)
            }
            const res = await editProfile(formData)
            if (res?.data.success) {
                toast.success('Profile updated..')
                navigate('/profile')
              } else {
                toast.error('Something went wrong...')
              }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const res = await profile();
                if (res?.data?.userProfile) {
                    setName(res.data.userProfile.name);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    },[])

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setImage(selectedFile)
        }
      }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-white shadow-md rounded-lg px-8 pb-8 max-w-md mb-20">
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <h3 className="mb-5 mt-5 font-semibold">Edit your profile</h3>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="floating_first_name"
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Legal Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900"
                            htmlFor="file_input"
                        >
                            Upload profile picture
                        </label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            id="file_input"
                            onChange={handleImage}
                            type="file"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditUserProfile