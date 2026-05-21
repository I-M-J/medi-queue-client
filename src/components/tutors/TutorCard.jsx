import Link from "next/link";
import { Calendar, DollarSign, Users } from "lucide-react";

export default function TutorCard({ tutor }) {
    const startDate = tutor.sessionStartDate
        ? new Date(tutor.sessionStartDate).toLocaleDateString()
        : "Flexible";

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full overflow-hidden">
            <img
                className="object-cover w-full h-48"
                src={tutor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || tutor.tutorName || "Tutor")}`}
                alt={tutor.name || tutor.tutorName || "Tutor"}
                referrerPolicy="no-referrer"
            />

            <div className="p-5 flex flex-col grow">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                    {tutor.name || tutor.tutorName}
                </h5>

                <p className="mb-3 font-normal text-blue-600 dark:text-blue-400 line-clamp-1">
                    {tutor.subject || tutor.specialty || "General Subject"}
                </p>

                <div className="mt-auto space-y-2 mb-4">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-500" />

                        <span className="font-medium">Fee:</span>

                        <span className="ml-1">${tutor.hourlyFee || tutor.fee || 0}/hr</span>
                    </div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />

                        <span className="font-medium">Slots:</span>

                        <span className="ml-1">{tutor.totalSlot !== undefined ? tutor.totalSlot : 0} available</span>
                    </div>

                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />

                        <span className="font-medium">Starts:</span>

                        <span className="ml-1">{startDate}</span>
                    </div>
                </div>

                <Link
                    href={`/tutors/${tutor._id || tutor.id}`}
                    className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mt-2 transition-colors"
                >
                    Book Session
                </Link>
            </div>
        </div>
    );
}
