// src/components/Header.tsx

import React from "react";
import { CogIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-black text-white p-4 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold text-center flex-grow">
        Web Sequencer
      </h1>
      <nav className="flex space-x-4">
        <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300 transition duration-200" />
        <CogIcon className="h-8 w-8 text-white hover:text-gray-300 transition duration-200" />
      </nav>
    </header>
  );
};

export default Header;
