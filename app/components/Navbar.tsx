"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { getGravatarUrl } from "@/app/lib/util";

const Navbar = () => {
    const { user, login, logout } = useAuth();
    const pathname = usePathname();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helper function to determine if a link is active
    const isActive = (path: string) => {
        console.log(pathname);
        return pathname === path || (path !== '/' && pathname.startsWith(path));
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="PhotoAlbum Logo" width={32} height={32}/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PhotoAlbum</span>
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <span className="sr-only">Open user menu</span>
                                <Image className="w-8 h-8 rounded-full" src={user.photoURL || getGravatarUrl(user.email || 'test@mail.com')} alt="USER_IMAGE" width={32} height={32} unoptimized />
                            </button>
                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg dark:bg-gray-700">
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                                        <p className="text-sm text-gray-900 dark:text-white truncate">
                                            {user.displayName || 'Anonymous User'}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user.email || 'test@mail.com'}
                                        </p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                href="/user"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Users
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/album"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Albums
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/photo"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Photos
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            type="button"
                            className="flex items-center justify-center gap-2 w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
                            </svg>
                            Log in with Google
                        </button>
                    )}
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/"
                                  className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                                  aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link href="/user/"
                                          className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/user') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                                          aria-current={isActive('/user') ? 'page' : undefined}>Users</Link>
                                </li>
                                <li>
                                    <Link href="/album/"
                                          className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/album') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                                          aria-current={isActive('/album') ? 'page' : undefined}>Albums</Link>
                                </li>
                                <li>
                                    <Link href="/photo/"
                                          className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/photo') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                                          aria-current={isActive('/photo') ? 'page' : undefined}>Photos</Link>
                                </li>
                            </>
                        ) : ("")}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;