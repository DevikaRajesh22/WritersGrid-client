import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { findArticleById } from "../../Api/article";
import userImage from '../../assets/user.png';

interface User {
  id: string;
  name: string;
  image: string;
  email: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  creationTime: Date;
  userId: User;
}

const SingleArticleComponent = () => {
  const [article, setArticle] = useState<Article>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const res = await findArticleById(id);
          if (res?.data.success) {
            console.log("Fetched article:", res.data.data);
            setArticle(res.data.data);
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      }
    };
    fetchArticle();
  }, [id]);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {article ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={article.image}
            alt="Article Cover"
            className="w-full h-auto object-contain object-center"
          />
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Link to="/articles">
                <button className="text-gray-600 hover:text-gray-800 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              </Link>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {article.title}
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={article.userId.image || userImage}
                alt="Author"
                className="h-8 w-8 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="text-gray-700 font-semibold">
                  {article.userId.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {formatDate(article.creationTime)}
                </p>
              </div>
            </div>
            {article.content ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              ></div>
            ) : (
              <p className="text-gray-500">No content available.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Loading article...</p>
      )}
    </div>
  );
};

export default SingleArticleComponent;