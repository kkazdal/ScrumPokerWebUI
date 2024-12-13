"use client"
import { JSX, useState } from "react";

export const Menu = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                    </span>
                </a>

                {/* Hamburger Menu Button */}
                <button
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>

                {/* Navbar Links */}
                <div
                    className={`${isOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                    id="navbar"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 dark:text-white md:p-0"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#how-it-works"
                                className="block py-2 px-3 text-gray-900 dark:text-white md:p-0"
                            >
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a
                                href="#features"
                                className="block py-2 px-3 text-gray-900 dark:text-white md:p-0"
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="block py-2 px-3 text-gray-900 dark:text-white md:p-0"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}