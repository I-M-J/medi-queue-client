import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";


export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 mt-auto border-t border-gray-200 dark:border-gray-800">
            <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                MediQueue
                            </span>
                        </Link>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            The premium tutor booking system.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Tutor Services
                            </h2>

                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/tutors" className="hover:underline">Find a Tutor</Link>
                                </li>

                                <li>
                                    <Link href="/add-tutor" className="hover:underline">Become a Tutor</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Contact Info
                            </h2>

                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="mailto:support@mediqueue.com" className="hover:underline">support@mediqueue.com</a>
                                </li>

                                <li>
                                    <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Legal
                            </h2>

                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2026 <Link href="/" className="hover:underline">MediQueue™</Link>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 rtl:space-x-reverse">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaGithub className="w-5 h-5" />
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaTwitter className="w-5 h-5" />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaLinkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
