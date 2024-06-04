import React from "react";
import UpdateProfile from "../components/UpdateProfile";
import { auth } from "../firebase/firebaseConfig";
import imageIcon from "../assets/user-icon.svg";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-10 mt-6 ">
      <div className="p-4 bg-[#a2d2ff] rounded flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <h1 className="text-white text-xl">Update Profile</h1>
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-400 font-normal text-white p-2 rounded-md hover:bg-gray-500"
          >
            Update Profile
          </button>
        </div>

        {auth.currentUser.photoURL !== null ? (
          <img
            src={auth.currentUser.photoURL}
            alt="image-icon"
            className="rounded-full object-cover"
            width="100%"
            height="100%"
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          <div className="border rounded-full p-4 bg-[#ccc]">
            <img
              src={imageIcon}
              alt="image-icon"
              className="rounded-full"
              width="100%"
              height="100%"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        )}
      </div>
      <UpdateProfile />
    </div>
  );
};

export default UpdateProfilePage;
