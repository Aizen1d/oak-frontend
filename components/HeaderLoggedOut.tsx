"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAVLINKS = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "Login",
    href: "/login"
  }
];

const HeaderLoggedOut = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const path = usePathname();

  const mapNavLinks = (screen: string) => {
    return NAVLINKS.map(link => (
      <Link
        key={link.title}
        href={link.href}
        onClick={() => {
          if (screen === 'mobile') setIsHamburgerOpen(false);
        }}
        className={`${path === link.href ? 'font-bold' : 'font-normal'} text-BLACK_LABEL_TEXT text-md`}
      >
        {link.title}
      </Link>
    ));
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex justify-between items-center px-10 h-20 bg-HEADER border-b border-slate-300 rounded-b-lg">
        <div className="flex justify-center items-center space-x-5">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <h1 className="hidden lg:block lg:text-xl font-bold text-BLACK_LABEL_TEXT">
            OakTree Innovations
          </h1>
        </div>

        {/* Large screen */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-7">{mapNavLinks('large')}</ul>
        </nav>

        {/* Mobile screen: Hamburger icon */}
        <nav className="block lg:hidden">
          <Image
            src="/icons/Hamburger.png"
            alt="Hamburger"
            width={35}
            height={35}
            onClick={() => setIsHamburgerOpen(true)}
            className="hover:cursor-pointer"
          />
        </nav>
      </header>

      {/* Mobile screen: Hamburger opened */}
      <nav
        className={`fixed top-0 left-0 z-30 bg-HEADER w-full ${
          isHamburgerOpen ? 'h-full' : 'h-0 overflow-hidden'
        } transition-[height] duration-200 ease-in`}
      >
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex flex-col justify-center items-start w-1/2 ml-10 mt-8">
            <div className={`absolute top-6 left-10`}>
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <ul className="flex flex-col space-y-5 mt-16">
              {mapNavLinks('mobile')}
            </ul>
          </div>

          {/* Right side */}
          <div className="w-1/2 flex justify-end items-end">
            <div
              className={`absolute top-7 right-10`}
              onClick={() => setIsHamburgerOpen(false)}
            >
              <label className="text-BLACK_LABEL_TEXT text-xl font-bold border border-BLACK_LABEL_TEXT rounded-lg px-3 py-1 hover:cursor-pointer">
                X
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderLoggedOut;
