import { Link } from "react-router-dom";

function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-primary">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-lg">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 text-white bg-primary rounded-lg shadow-md hover:bg-opacity-90 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default ErrorBoundary;

