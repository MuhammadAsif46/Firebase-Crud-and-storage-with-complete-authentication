import React from "react";
import UpdateProfile from "../components/UpdateProfile"

const UpdateProfilePage = () => {
  return (
    <div className="mx-10 mt-6">
      <div className="text-center p-4 bg-[#a2d2ff] rounded">
        <h1 className="text-3xl text-white">Update Profile </h1>
      </div>
      <UpdateProfile/>
    </div>
  );
};

export default UpdateProfilePage;
