import feat from '../../assets/featured.jpg'

const Featured = () => {
  // Sample data for articles
  const articles = [
    {
      title: 'Article 1 Title',
      image: feat,
    },
    {
      title: 'Article 2 Title',
      image: feat,
    },
    {
      title: 'Article 3 Title',
      image: feat,
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Featured Articles</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                <p className="text-gray-600 mt-2">Short description or excerpt goes here.</p>
                <a href="#" className="block text-blue-600 font-semibold mt-4 hover:text-blue-700">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
