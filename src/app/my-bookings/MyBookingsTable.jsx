"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

function CancelBookingAlert({ bookingId, isOpen, onClose, onCancel }) {
    const [isCancelling, setIsCancelling] = useState(false);

    if (!isOpen) return null;

    const confirmCancel = async () => {
        setIsCancelling(true);
        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/cancel/${bookingId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": token ? `Bearer ${token}` : "",
                }
            });
            if (!res.ok) throw new Error("Failed to cancel booking");
            toast.success("Booking cancelled successfully!");
            onCancel(bookingId);
            onClose();
        } catch (error) {
            toast.error(error.message || "An error occurred");
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={onClose} disabled={isCancelling} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>

                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to cancel this booked session?</h3>

                        <button onClick={confirmCancel} disabled={isCancelling} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:opacity-50">
                            {isCancelling ? "Cancelling..." : "Yes, cancel it"}
                        </button>

                        <button onClick={onClose} disabled={isCancelling} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 disabled:opacity-50">No, keep it</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MyBookingsTable() {
    const { data: session, isPending } = useSession();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cancelModalBookingId, setCancelModalBookingId] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!session?.user?.email) return;
            try {
                const tokenRes = await authClient.token();
                const token = tokenRes?.data?.token;
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${session.user.email}`, {
                    headers: {
                        "Authorization": token ? `Bearer ${token}` : "",
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch bookings");
                const data = await res.json();
                setBookings(Array.isArray(data) ? data : (data.data || []));
            } catch (err) {
                toast.error(err.message || "Failed to load bookings");
            } finally {
                setIsLoading(false);
            }
        };

        if (!isPending) {
            if (session?.user) {
                fetchBookings();
            } else {
                setIsLoading(false);
            }
        }
    }, [session, isPending]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {
                isLoading
                    ? (
                        <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading bookings...</div>
                    )
                    : bookings.length === 0
                        ? (
                            <div className="text-center p-12 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                                <p>You haven't booked any sessions yet.</p>
                            </div>
                        )
                        : (
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Tutor Name</th>
                                        <th scope="col" className="px-6 py-3">Student Name</th>
                                        <th scope="col" className="px-6 py-3">Student Email</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookings.map(booking => {
                                            const isCancelled = booking.status === "cancelled";
                                            return (
                                                <tr key={booking._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {booking.tutorName || "N/A"}
                                                    </th>

                                                    <td className="px-6 py-4">{booking.studentName || "N/A"}</td>

                                                    <td className="px-6 py-4">{booking.studentEmail}</td>

                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isCancelled ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}>
                                                            {isCancelled ? "Cancelled" : (booking.status || "Booked")}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={() => setCancelModalBookingId(booking._id)}
                                                            disabled={isCancelled}
                                                            className="font-medium text-red-600 dark:text-red-500 hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        )}

            <CancelBookingAlert
                bookingId={cancelModalBookingId}
                isOpen={!!cancelModalBookingId}
                onClose={() => setCancelModalBookingId(null)}
                onCancel={(id) => {
                    setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
                }}
            />
        </div>
    );
}
