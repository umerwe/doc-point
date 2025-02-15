import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";
import { useSelector } from "react-redux";
import NoDoctor from "../Components/Error/NoDoctor";
import Footer from "../Components/Footer";

const AllDoctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const doctors = useSelector((store) => store.userSlice.doctors);

  const [isOpen, setIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterDoc, setFilterDoc] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (speciality) {
      const filtered = doctors.filter((doc) => doc.speciality === speciality);
      setFilterDoc(filtered);
      setIsError(filtered.length === 0); // If no doctors found, show error
    } else {
      setFilterDoc(doctors);
      setIsError(false);
    }
  }, [doctors, speciality]);

  function handleClick(item) {
    if (speciality === item.speciality) {
      navigate("/alldoctors");
      setFilterOpen(false);
    } else {
      navigate(`/alldoctors/${item.speciality}`);
    }
    setIsOpen(false);
  }

  return (
    <div className="text-gray-500 mx-[8%]">
      {isError ? (
        <NoDoctor />
      ) : (
        <>
          <p className="font-medium py-5">
            Browse through the doctors specialist.
          </p>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setFilterOpen(true);
            }}
            className={`py-1 px-3 border rounded text-sm transition-all lg:hidden mb-3 text-black ${
              filterOpen ? "bg-primary text-white" : ""
            }`}
          >
            Filters
          </button>
          <div className="flex gap-5">
            {/* Filters Section */}
            <div
              className={`lg:flex lg:flex-col lg:static absolute top-10px bg-white w-[82%] sm:w-[400px] lg:gap-5 lg:w-[210px] ${
                isOpen ? "block" : "hidden"
              }`}
            >
              {specialityData.map((item, index) => (
                <p
                  key={index}
                  onClick={() => handleClick(item)}
                  className={`text-[13px] font-medium border border-gray-300 rounded py-1.5 text-left pl-4 pr-16 cursor-pointer duration-75 mb-3 lg:mb-0 ${
                    speciality === item.speciality
                      ? "bg-[#EAEFFF] text-black"
                      : "text-gray-500"
                  }`}
                >
                  {item.speciality}
                </p>
              ))}
            </div>

            {/* Doctors Grid */}
            <div
              className={`grid max-[470px]:grid-cols-1 min-[720px]:grid-cols-3 gap-5 m-auto lg:m-0 max-[720px]:grid-cols-2 ${
                isOpen ? "max-[1024px]:mt-[290px]" : "max-[1024px]:mt-[20px]"
              }`}
            >
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    scrollTo(0, 0);
                  }}
                  className="border border-[#C9D8FF] rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500 cursor-pointer"
                >
                  <div className="bg-[#EAEFFF]">
                    <img className="w-[255px]" src={item.image} alt="" />
                  </div>
                  <div className="px-4 pt-3 pb-4">
                    <div className="flex items-center gap-2 text-sm max-[540px]:text-[13px] text-center text-green-500">
                      <p className="w-2 h-2 rounded-full bg-green-500"></p>
                      <p>Available</p>
                    </div>
                    <div>
                      <p className="lg:text-[17px] xl:text-[18px] text-[#262626] font-semibold">
                        {item.name}
                      </p>
                      <p className="text-[#5C5C5C] text-[13px]">
                        {item.speciality}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default AllDoctors;
