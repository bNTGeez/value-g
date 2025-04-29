import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Track Your Investments with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Monitor your stock portfolio, analyze market trends, and make informed
          investment decisions.
        </p>
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
          <p className="text-sm text-gray-500">
            No account required - Start tracking your investments now
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Real-time Data</h3>
            <p className="text-gray-600">
              Access up-to-date stock prices and market information
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Easy Tracking</h3>
            <p className="text-gray-600">
              Monitor your portfolio performance at a glance
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Smart Analysis</h3>
            <p className="text-gray-600">
              Get insights to make better investment decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
