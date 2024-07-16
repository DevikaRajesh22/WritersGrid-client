import { Link } from 'react-router-dom';

const MyArticleComponent = () => {
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
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Apple MacBook Pro 17"
                                </td>
                                <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                            {/* Add more rows dynamically based on your data */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyArticleComponent;