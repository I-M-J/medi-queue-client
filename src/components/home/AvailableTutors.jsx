import Link from "next/link";

export default function AvailableTutors({ tutors }) {
    if (!tutors || tutors.length === 0) {
        return (
            <section className="bg-gray-50 dark:bg-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Available Tutors
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">No tutors available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-12">
            <div className="py-8 px-4 mx-auto max-w-7xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Top Rated Tutors
                    </h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Browse through our highly qualified educators and book your next session today.
                    </p>
                </div>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-3">
                    {tutors.map((tutor) => (
                        <div key={tutor._id || tutor.id} className="bg-white rounded-lg shadow dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-5 flex flex-col items-center grow">
                                <img
                                    className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                                    src={tutor.image || `https://ui-avatars.com/api/?name=${tutor.tutorName}`}
                                    alt={tutor.tutorName}
                                    referrerPolicy="no-referrer"
                                />

                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
                                    {tutor.tutorName}
                                </h3>

                                <span className="text-blue-600 dark:text-blue-400 mb-2 font-medium">
                                    {tutor.subject || tutor.specialty || "General Subjects"}
                                </span>

                                <p className="text-gray-500 dark:text-gray-400 text-center mb-6 line-clamp-2">
                                    {tutor.institution || ""}
                                </p>

                                <div className="mt-auto w-full">
                                    <Link
                                        href={`/tutors/${tutor._id || tutor.id}`}
                                        className="flex justify-center items-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        Book Session
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
