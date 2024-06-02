import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile/Profile"

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-[#a2d2ff] ">
        <h1 className="text-3xl text-white">
          Crud operation with firebase firestore{" "}
        </h1>
        <button
          onClick={() => navigate("/update-profile")}
          className="bg-gray-400 font-bold text-white p-3 rounded-md hover:bg-gray-500"
        >
          Update Profile
        </button>
      </div>

      <Profile />
    </>
  );
};

export default ProfilePage;
