import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mt-2">The page you are looking for does not exist.</p>
            
            {/* Link to Home Page */}
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;
