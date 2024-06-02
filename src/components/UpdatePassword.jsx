import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  updatePassword,
} from "../firebase/firebaseConfig";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleReAuthAndUpdatePassword = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const email = user.email;

    try {
      // Re-authenticate user
      const credential = signInWithEmailAndPassword(
        auth,
        email,
        password.currentPassword
      );
      await credential;

      // Update password
      await updatePassword(user, password.newPassword);
      alert("Password updated successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error.code);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center text-2xl font-bold">Update Passowrd</div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {errorMessage && (
              <div className="text-red-500 text-center mb-5 cursor-pointer">
                {errorMessage}
              </div>
            )}
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleReAuthAndUpdatePassword}
            >
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <div className="mt-1">
                  <input
                    id="current-password"
                    name="current-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Current Password"
                    required
                    minLength={8}
                    maxLength={20}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setPassword({
                        ...password,
                        currentPassword: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="New Password"
                    required
                    minLength={8}
                    maxLength={20}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setPassword({
                        ...password,
                        newPassword: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
