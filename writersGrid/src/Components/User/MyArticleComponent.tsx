import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticles, deleteArticle } from '../../Api/article';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Article {
    id: string;
    title: string;
    contents: string;
    image: string;
    creationTime: Date;
}

const MyArticleComponent = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await getArticles();
                if (res?.data.success) {
                    const sortedArticles = res.data.data.sort((a: Article, b: Article) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());
                    setArticles(sortedArticles);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchArticle();
    }, []);

    function formatDate(dateString: Date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    const handleEdit = async (id: string) => {
        try {
            navigate(`/editArticle/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteArticle(id);
            if (res?.data.success) {
                toast.success('Successfully deleted.');
                setArticles(articles.filter(article => article.id !== id)); // Remove the deleted article from the state
            } else {
                toast.error('Something went wrong!!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center m-10">
            <Link to='/newArticle'>
                <button className="bg-green-900 text-white px-4 py-2 rounded mb-4">
                    Add New
                </button>
            </Link>
            <div className="max-w-lg w-full mx-4">
                <div className="overflow-x-auto">
                    {articles.length === 0 ? (
                        <div className="text-center mt-4 text-gray-500">No articles found. Please add new.</div>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500">
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
                                {articles.map((a) => (
                                    <tr key={a.id} className="bg-white border-b">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap truncate max-w-xs">
                                            {a.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(a.creationTime)}
                                        </td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button onClick={() => handleEdit(a.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(a.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyArticleComponent;