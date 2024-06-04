import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import { auth, signOut } from "../firebase/firebaseConfig";
import imageIcon from "../assets/user-icon.svg";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-10 mt-6">
      <div className="flex justify-between items-center p-4 bg-[#a2d2ff] rounded">
        {auth.currentUser.photoURL !== null ? (
          <div className="flex gap-3 items-center">
            <img
              src={auth.currentUser.photoURL}
              alt="image-icon"
              className="rounded-full object-cover"
              width="100%"
              height="100%"
              style={{ width: "50px", height: "50px" }}
            />
            <h1 className="text-3xl text-white">
              {auth.currentUser.displayName}
            </h1>
          </div>
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

        <div className="flex items-center gap-3">
          <button
            className="bg-red-400 text-white p-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-slate-600 text-white p-2 rounded-md"
            onClick={() => navigate("/update-password")}
          >
            Update Password
          </button>
          <button
            onClick={() => navigate("/update-profile")}
            className="bg-gray-400 font-bold text-white p-2 rounded-md hover:bg-gray-500"
          >
            Update Profile
          </button>
        </div>
      </div>

      <Profile />
    </div>
  );
};

export default ProfilePage;
