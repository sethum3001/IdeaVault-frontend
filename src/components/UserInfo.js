import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  // Decode the access token to extract user information
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  const username = decodedToken.name;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem("accessToken");
    // Redirect to the login page or any other desired route
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="mr-1">Welcome,</p>
        <p className="font-semibold">{username}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 max-w-max"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
