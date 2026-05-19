"use client";

import { useState, useEffect } from "react";
import TutorCard from "@/components/tutors/TutorCard";
import { Search, Loader2 } from "lucide-react";

export default function TutorsPage() {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchTutors = async () => {
        setLoading(true);

        try {
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

            const params = new URLSearchParams();
            if (searchName) params.append("search", searchName);

            if (startDate) params.append("startDate", startDate);

            if (endDate) params.append("endDate", endDate);

            const res = await fetch(`${serverUrl}/tutors?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setTutors(Array.isArray(data) ? data : data.tutors || []);
            }
            else {
                setTutors([]);
            }
        }
        catch (error) {
            console.error("Error fetching tutors:", error);
            setTutors([]);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            fetchTutors();
        }, 300);

        return () => clearTimeout(delayDebounceFn);

    }, [searchName, startDate, endDate]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Find a Tutor
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Search for your perfect tutor by name or filter by session start dates.
                    </p>

                    <div className="grid gap-4 md:grid-cols-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>

                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by name..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Start Date"
                            />
                        </div>

                        <div>
                            <input
                                type="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="End Date"
                            />
                        </div>
                    </div>
                </div>

                {
                    loading
                        ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="w-10 h-10 text-blue-600 animate-spin dark:text-blue-500" />
                            </div>
                        )
                        : tutors.length > 0
                            ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {tutors.map((tutor) => (
                                        <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
                                    ))}
                                </div>
                            )
                            : (
                                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                                        No tutors found
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Try adjusting your search or filters to find what you're looking for.
                                    </p>
                                </div>
                            )
                }
            </div>
        </div>
    );
}
