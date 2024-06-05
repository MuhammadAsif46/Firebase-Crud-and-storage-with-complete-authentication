import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { auth, onAuthStateChanged } from "./firebase/firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false)
    });

    // Cleanup subscription on unmount
    return () => unSubscribe();
  }, [auth]);
  if (isLoading) { // Show a loading message or component while auth state is being determined
    return <div className="flex justify-center items-center text-4xl" style={{height:"100vh"}}>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/profile" /> : <SignupPage />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/update-password"
          element={user ? <UpdatePasswordPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update-profile"
          element={user ? <UpdateProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
