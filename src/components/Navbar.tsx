import { Link } from "react-router-dom";
import { Home, LineChart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20">
          <div className="flex space-x-12">
            <Link
              to="/"
              className="inline-flex items-center px-3 pt-1 text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              <Home className="w-6 h-6 mr-3" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-3 pt-1 text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              <LineChart className="w-6 h-6 mr-3" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
