import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Banner() {
    return (
        <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="py-8 px-4 mx-auto max-w-7xl text-center lg:py-16 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Find Your Perfect Tutor & Master New Skills
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Learn at your own pace with expert educators. Whether you are aiming to ace an exam, learn a new language, or develop a professional skill, MediQueue connects you with the best tutors worldwide.
                </p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link
                        href="/tutors"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    >
                        Book a Session
                        <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                    </Link>
                    <Link
                        href="/register"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Become a Tutor
                    </Link>
                </div>
            </div>
        </section>
    );
}
