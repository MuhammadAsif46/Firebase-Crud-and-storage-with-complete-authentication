import { useNavigate, Link } from "react-router-dom";
import { auth, signOut } from "../firebase/firebaseConfig";
import Card from "../components/Card";

const Profile = () => {
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
    <div className="flex flex-col justify-center items-center">
      <div className="min-h-min w-1/2 mx-auto shadow-md flex items-center justify-between text-right py-3 px-3 mt-2 rounded-md">
        <div>
          <p className="text-xl">Welcome, {auth.currentUser.displayName}</p>
        </div>
        <div className="flex gap-3">
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
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-20">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Profile;
