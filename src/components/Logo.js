import React from "react";
import logo from "../assets/IdeaVault_logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
      <h1 className="text-xl font-bold">IdeaVault</h1>
    </div>
  );
};

export default Logo;
