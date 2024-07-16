import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticles } from '../../Api/article';
import { useNavigate } from 'react-router-dom';

interface Article {
    id: string,
    title: string,
    contents: string,
    image: string,
    creationTime: Date
}

const MyArticleComponent = () => {
    const [articles, setArticles] = useState<Article[]>([])
    const navigate=useNavigate()

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await getArticles()
                if (res?.data.success) {
                    setArticles(res?.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchArticle()
    }, [])

    function formatDate(dateString: Date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    const handleEdit=async(id:string)=>{
        try{
            navigate(`/editArticle/${id}`)
        }catch(error){
            console.log(error)
        }
    }

    const handleDelete=async(id:string)=>{
        try{
            console.log(id)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center m-10">
            <Link to='/newArticle'>
                <button className="text-white px-4 py-2 rounded mb-4" style={{ backgroundColor: '#013220' }}>
                    Add New
                </button>
            </Link>
            <div className="max-w-lg w-full mx-4">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((a) => {
                                return (
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {a.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(a.creationTime)}
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button onClick={()=>handleEdit(a.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Edit</button>
                                            <button onClick={()=>handleDelete(a.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyArticleComponent;