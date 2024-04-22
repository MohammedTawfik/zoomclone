import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavigation from "./mobileNavigation";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="Yoom Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        ></Image>
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* Add Clerk User Management*/}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
