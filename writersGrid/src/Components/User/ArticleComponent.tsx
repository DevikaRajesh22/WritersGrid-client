import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllArticles } from "../../Api/article";
import userImage from "../../assets/user.png";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    image: string;
    email: string;
}

interface Article {
    id: string;
    title: string;
    contents: string;
    image: string;
    creationTime: Date;
    userId: User;
}

const ArticleComponent = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 12;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await getAllArticles();
                if (res?.data.success) {
                    const sortedArticles = res.data.data.sort(
                        (a: Article, b: Article) =>
                            new Date(b.creationTime).getTime() -
                            new Date(a.creationTime).getTime()
                    );
                    setArticles(sortedArticles);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchArticles();
    }, []);

    function formatDate(dateString: Date) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-24 mt-10">
            {articles.length > 0 ? (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Articles</h1>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentArticles.map((a) => (
                            <div
                                key={a.id}
                                className="flex flex-col transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
                            >
                                <div>
                                    <img
                                        src={a.image}
                                        alt="Blog Cover"
                                        className="object-fill w-full h-56 rounded-t-lg"
                                    />
                                </div>
                                <hr className="border-gray-300" />
                                <div className="px-4 py-2">
                                    <Link to={`/singleArticle/${a.id}`} className="hover:underline">
                                        <h2 className="text-xl font-bold text-gray-800 truncate">
                                            {a.title}
                                        </h2>
                                    </Link>
                                    <div className="flex items-center mt-2">
                                        <img
                                            className="object-cover h-8 w-8 rounded-full"
                                            src={a.userId.image || userImage}
                                            alt="Avatar"
                                        />
                                        <div className="flex flex-col ml-2">
                                            <Link
                                                to=""
                                                className="font-semibold text-gray-700 hover:underline"
                                            >
                                                {a.userId.name}
                                            </Link>
                                            <span className="text-xs text-gray-600">
                                                {formatDate(a.creationTime)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                    <div className="flex justify-center mt-4">
                        {articles.length > 0 && (
                            <nav aria-label="Page navigation">
                                <ul className="inline-flex -space-x-px text-base h-10">
                                    <li>
                                        <a
                                            href="#"
                                            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                                                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                                            }`}
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </a>
                                    </li>
                                    {[...Array(Math.ceil(articles.length / articlesPerPage))].map(
                                        (_, index) => (
                                            <li key={index}>
                                                <a
                                                    href="#"
                                                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${
                                                        currentPage === index + 1
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "hover:bg-gray-100 hover:text-gray-700"
                                                    }`}
                                                    onClick={() => paginate(index + 1)}
                                                >
                                                    {index + 1}
                                                </a>
                                            </li>
                                        )
                                    )}
                                    <li>
                                        <a
                                            href="#"
                                            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
                                                currentPage === Math.ceil(articles.length / articlesPerPage)
                                                    ? "opacity-50 pointer-events-none"
                                                    : ""
                                            }`}
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={
                                                currentPage === Math.ceil(articles.length / articlesPerPage)
                                            }
                                        >
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600 text-lg">No articles found.</p>
                </div>
            )}
        </div>
    );
};

export default ArticleComponent;