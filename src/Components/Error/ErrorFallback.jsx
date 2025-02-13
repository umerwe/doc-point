import { useRouteError, useNavigate } from "react-router-dom";

function ErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-primary">
      <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
      <p className="mt-2 text-lg">An unexpected error occurred.</p>
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
      
      <button 
        onClick={() => navigate('/')} 
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
      >
        Go to Home
      </button>
    </div>
  );
}

export default ErrorFallback;
