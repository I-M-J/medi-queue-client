import BookingModal from "@/components/tutors/BookingModal";
import { Calendar, MapPin, Building, GraduationCap, Laptop, BookOpen, Clock, DollarSign } from "lucide-react";
import { notFound } from "next/navigation";

export default async function TutorDetailsPage({ params }) {
    const { id } = await params;

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    let tutor = null;

    try {
        const res = await fetch(`${serverUrl}/tutors/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            if (res.status === 404) notFound();
            throw new Error("Failed to fetch tutor details");
        }

        const data = await res.json();
        tutor = data.tutor || data;
    }
    catch (error) {
        console.error("Error fetching tutor:", error);

        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-red-500">
                Error loading tutor details.
            </div>
        );
    }

    if (!tutor) notFound();

    const startDate = tutor.sessionStartDate
        ? new Date(tutor.sessionStartDate).toLocaleDateString()
        : "Flexible";

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <img
                                    src={tutor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || tutor.tutorName || "Tutor")}&size=200`}
                                    alt={tutor.name || tutor.tutorName}
                                    className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover shadow-sm border border-gray-100 dark:border-gray-700"
                                />

                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {tutor.name || tutor.tutorName}
                                    </h1>

                                    <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
                                        {tutor.subject || tutor.specialty || "General Subject"}
                                    </p>

                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                        {tutor.description || "An experienced and dedicated educator helping students achieve their academic goals."}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                                            <Building className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="truncate"><strong>Institution:</strong> {tutor.institution || "Independent"}</span>
                                        </div>

                                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                                            <GraduationCap className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="truncate"><strong>Experience:</strong> {tutor.experience || "2+ years"}</span>
                                        </div>

                                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                                            <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="truncate"><strong>Location:</strong> {tutor.location || "Remote"}</span>
                                        </div>

                                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                                            <Laptop className="w-5 h-5 mr-3 text-gray-400" />
                                            <span className="truncate"><strong>Mode:</strong> {tutor.teachingMode || "Online"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                                Teaching Approach
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {tutor.approach || tutor.teachingApproach || "My teaching methodology focuses on interactive learning and personalized problem-solving. I adapt to each student's pace to ensure complete understanding of the core concepts."}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                Booking Information
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                        <DollarSign className="w-4 h-4 mr-2" /> Fee
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ${tutor.hourlyFee || tutor.fee || 0} / session
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" /> Start Date
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {startDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                        <Clock className="w-4 h-4 mr-2" /> Slots Left
                                    </span>

                                    <span className={`font-semibold ${tutor.totalSlot > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {tutor.totalSlot !== undefined ? tutor.totalSlot : 0}
                                    </span>
                                </div>
                                {tutor.availableDays && (
                                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                                        <span className="text-gray-600 dark:text-gray-400 block mb-2 font-medium">Available Days:</span>

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {
                                                Array.isArray(tutor.availableDays)
                                                    ? tutor.availableDays.map((day, idx) => (
                                                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md dark:bg-blue-900 dark:text-blue-300">
                                                            {day}
                                                        </span>
                                                    ))
                                                    : <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md dark:bg-blue-900 dark:text-blue-300">
                                                        {tutor.availableDays}
                                                    </span>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>

                            <BookingModal tutor={tutor} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
