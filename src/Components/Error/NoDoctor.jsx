import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoDoctor = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-500">
                No Doctor Available
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                Please select a valid specialty.
            </p>
            <button
                onClick={() => navigate("/alldoctors")}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
            >
                Go Back
            </button>
        </div>
    )
}

export default NoDoctor
