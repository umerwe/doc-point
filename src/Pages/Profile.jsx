import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { updateProfileData } from '../store/slices/userSlice';
import { FaCamera } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userSlice.user);
  const profileDataFromRedux = useSelector(
    (store) => store.userSlice.profileData
  );

  const { number, address, gender, birthDay, profilePic: profileImg } = profileDataFromRedux;

  // Whether the form is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Local profile form state with default values
  const [profileForm, setProfileForm] = useState({
    number: 'Empty',
    address: 'Empty',
    gender: 'Not Selected',
    birthDay: 'Not Selected',
  });

  // Default profile pictures
  const defaultProfilePic =
    'data:image/png;base64,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';

  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const fileInputRef = useRef(null);

  // Fetch profile data when the component mounts or when the user changes


  // Sync local preview with Redux changes when not editing
  useEffect(() => {
    if (!isEditing) {
      setProfilePic(profileDataFromRedux.profilePic || defaultProfilePic);
    }
  }, [profileDataFromRedux, isEditing]);

  // Handle input changes by updating local state
  const handleChange = (e) => {
    setProfileForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Only allow profile pic update when in edit mode
  const handleProfilePicClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Update local state only on file selection (no Firestore update here)
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Define compression options (adjust as needed)
        const options = {
          maxSizeMB: 0.5, // target maximum size in MB
          maxWidthOrHeight: 1024, // maximum dimension in pixels
          useWebWorker: true,
        };
  
        // Compress the image file
        const compressedFile = await imageCompression(file, options);
  
        // Convert the compressed file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setProfilePic(base64String);
          setProfileForm((prevState) => ({
            ...prevState,
            profilePic: base64String,
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        window.notify('Image compression failed.', error);
      }
    }
  };

  // Save all changes to Firestore when clicking Save Information
  const saveInformation = async () => {
    try {
      setIsSaving(true);
      const updatedData = {
        number: profileForm.number.trim() === '' ? 'Empty' : profileForm.number,
        address: profileForm.address.trim() === '' ? 'Empty' : profileForm.address,
        gender: profileForm.gender.trim() === '' ? 'Not Selected' : profileForm.gender,
        birthDay: profileForm.birthDay.trim() === '' ? 'Not Selected' : profileForm.birthDay,
        profilePic, // using the local state
      };

      await setDoc(doc(db, 'userForm', user.uid), {
        id: user.uid,
        ...updatedData,
      });
      const docSnap = await getDoc(doc(db, 'userForm', user.uid));
      if (docSnap.exists()) {
        dispatch(updateProfileData(docSnap.data()));
      }
    } catch (error) {
      window.notify(error.message || 'Something went wrong', 'error');
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  const handleEditClick = () => {
    // Optionally reset form state if needed
    setProfileForm({ number: '', address: '', gender: '', birthDay: '' });
    setIsEditing(true);
  };

  return (
    <div className='mx-[8%]'>
      <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
        {/* Profile Picture with overlay icon (visible only in edit mode) */}
        <div className="relative w-36 h-36">
          <img
            className={`w-36 h-36 ${profileImg ? 'border-3 border-primary-500 shadow-[0_0_10px_#3b82f6]' : ''} rounded-full object-cover object-center cursor-pointer bg-[#EFEBFF]`}
            src={profilePic}
            alt="Profile"
            onClick={handleProfilePicClick}
          />
          {isEditing && (
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handleProfilePicClick}
            >
              <FaCamera className="text-white text-2xl" />
            </div>
          )}
        </div>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfilePicChange}
          style={{ display: 'none' }}
        />

        <p className="font-medium text-3xl text-[#262626] mt-4">
          {user.displayName}
        </p>
        <hr className="bg-[#ADADAD] h-[1px] border-none" />

        {/* CONTACT INFORMATION */}
        <div>
          <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{user.email}</p>
            <p className="font-medium">Phone:</p>
            {isEditing ? (
              <input
                onChange={handleChange}
                name="number"
                value={profileForm.number}
                type="number"
                className="bg-gray-50 max-w-48 border-2 rounded-md pl-2 pt-[3px] pb-[4px] text-[13px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Enter phone#"
              />
            ) : (
              <p className="text-blue-500">{number}</p>
            )}
            <p className="font-medium mr-3">Address:</p>
            {isEditing ? (
              <textarea
                name="address"
                value={profileForm.address}
                onChange={handleChange}
                className="bg-gray-50 max-[515px]:w-56 w-80 max-[515px]:h-20 h-24 border-2 rounded-md px-[9px] py-[3px] resize-none text-[13px]"
                placeholder="Enter your address..."
              ></textarea>
            ) : (
              <p>{address}</p>
            )}
          </div>
        </div>

        {/* BASIC INFORMATION */}
        <div>
          <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
            <p className="font-medium">Gender:</p>
            {isEditing ? (
              <select
                name="gender"
                value={profileForm.gender}
                onChange={handleChange}
                className="max-w-24 bg-gray-50 text-[12px]"
              >
                <option value="">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-500">{gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEditing ? (
              <input
                name="birthDay"
                value={profileForm.birthDay}
                onChange={handleChange}
                type="date"
                className="max-w-28 bg-gray-50"
                max={new Date().toISOString().split('T')[0]}
              />
            ) : (
              <p className="text-gray-500">{birthDay}</p>
            )}
          </div>
        </div>

        {/* Edit / Save Buttons */}
        <div className="mt-5">
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={saveInformation}
              className={`border bg-primary text-white px-8 py-2 rounded-full transition-all ${isSaving ? 'animate-pulse' : ''}`}
            >
              {isSaving ? 'Saving ...' : 'Save Information'}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
