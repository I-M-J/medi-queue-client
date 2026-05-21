"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
    "use no memo";
    const { data: session, isPending } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);


    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDarkMode = currentTheme === "dark";
    const toggleMode = () => setTheme(isDarkMode ? "light" : "dark");

    const hasSessionCookie = typeof window !== "undefined" && document.cookie.includes("better-auth.session_token");
    const showPending = isPending && (!mounted || hasSessionCookie);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        MediQueue
                    </span>
                </Link>

                <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
                    <button
                        onClick={toggleMode}
                        type="button"
                        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                        aria-label="Toggle dark mode"
                    >
                        {mounted ? (isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />) : <div className="w-5 h-5 opacity-0" />}
                    </button>


                    {
                        showPending
                            ? (
                                <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
                            )
                            : session
                                ? (
                                    <div
                                        className="relative profile-dropdown-container"
                                        onBlur={(e) => {
                                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                                setIsProfileOpen(false);
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            aria-expanded={isProfileOpen}
                                        >
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
                                                alt="user photo"
                                                referrerPolicy="no-referrer"
                                            />
                                        </button>

                                        <div className={`absolute -right-2 top-full pt-2 px-2 z-50 transition-all duration-300 ease-in-out ${isProfileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                                            <div className="text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 min-w-48">
                                                <div className="px-4 py-3">
                                                    <span className="block text-sm text-gray-900 dark:text-white">
                                                        {session.user.name}
                                                    </span>
                                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {session.user.email}
                                                    </span>
                                                </div>
                                                <ul className="py-2" aria-labelledby="user-menu-button">
                                                    <li>
                                                        <button
                                                            onClick={() => signOut()}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                        >
                                                            Logout
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="flex gap-2">
                                        <Link
                                            href="/login"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 hidden sm:block"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )
                    }

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <div
                    className={`${isMobileMenuOpen ? "block" : "hidden"
                        } items-center justify-between w-full md:flex md:w-auto md:order-1`}
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/tutors"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Tutors
                            </Link>
                        </li>

                        {
                            session && (
                                <>
                                    <li>
                                        <Link
                                            href="/add-tutor"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Add Tutor
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/my-tutors"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            My Tutors
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/my-bookings"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            My Booked Sessions
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}