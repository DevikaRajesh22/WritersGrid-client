import hero from '../../assets/hero.jpg';

const Hero = () => {
  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: '#ECD0A9', minHeight: '70vh' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center p-6">
        <img src={hero} alt="Hero Image" className="w-full md:w-1/3 h-auto object-cover ml-4 md:ml-20 mb-6 md:mb-0" />
        <div className="flex flex-col items-center justify-center text-center md:ml-10 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Writers Hub</h1>
          <p className="mt-4 text-lg text-gray-600">Where Creativity Meets Opportunity</p>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mt-4" style={{ backgroundColor: '#013220' }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
