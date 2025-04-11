"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { user, login, logout } = useAuth();
    const pathname = usePathname();

    // Helper function to determine if a link is active
    const isActive = (path: string) => {
        console.log(pathname);
        return pathname === path || (path !== '/' && pathname.startsWith(path));
    }

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="PhotoAlbum Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PhotoAlbum</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Log Out
                        </button>
                    ) : (
                        <button onClick={login} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Log In
                        </button>
                    )}

                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/" className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
                        </li>
                        { user ? (
                            <>
                                <li>
                                    <Link href="/user/" className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/user') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`} aria-current={isActive('/user') ? 'page' : undefined}>Users</Link>
                                </li>
                                <li>
                                    <Link href="/album/" className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/album') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`} aria-current={isActive('/album') ? 'page' : undefined}>Albums</Link>
                                </li>
                                <li>
                                    <Link href="/photo/" className={`block py-2 px-3 rounded-sm md:p-0 ${isActive('/photo') ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`} aria-current={isActive('/photo') ? 'page' : undefined}>Photos</Link>
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