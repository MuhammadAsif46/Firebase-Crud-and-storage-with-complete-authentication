import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import { auth, onAuthStateChanged } from "./firebase/firebaseConfig";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unSubscribe();
  }, [auth]);

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
        <Route path="/update-password" element={user ? <UpdatePasswordPage /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
