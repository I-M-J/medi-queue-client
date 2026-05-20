"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { X, CalendarCheck } from "lucide-react";

export default function BookingModal({ tutor }) {
    const router = useRouter();
    const { data: sessionData, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const totalSlot = tutor.totalSlot !== undefined ? tutor.totalSlot : 0;
    const isNoSlots = totalSlot <= 0;

    const currentDate = new Date();
    const sessionStartDate = tutor.sessionStartDate ? new Date(tutor.sessionStartDate) : null;
    const isTooEarly = sessionStartDate && (currentDate < sessionStartDate);

    const handleOpen = () => {
        if (!sessionData) {
            toast.error("You must be logged in to book a session.");
            router.push("/login");
            return;
        }
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        if (!sessionData) return;
        setIsSubmitting(true);

        try {
            let tokenValue = "";

            if (typeof authClient.token === "function") {
                const tokenRes = await authClient.token();
                tokenValue = tokenRes?.data?.token || tokenRes?.value || "";
            } else if (typeof authClient.session === "function") {
                const sess = await authClient.session();
                tokenValue = sess?.token?.value || sess?.data?.token || sess?.token || "";
            }

            if (!tokenValue && sessionData?.session?.token) {
                tokenValue = sessionData.session.token;
            }

            const bookingPayload = {
                tutorId: tutor._id || tutor.id,
                tutorName: tutor.name || tutor.tutorName,
                tutorEmail: tutor.tutorEmail || tutor.email,
                studentId: sessionData.user.id,
                studentName: sessionData.user.name,
                studentEmail: sessionData.user.email,
                userEmail: sessionData.user.email,
                phone: data.phone,
                hourlyFee: tutor.hourlyFee || tutor.fee || 0,
                image: tutor.image || tutor.photoUrl,
                bookingDate: new Date().toISOString(),
            };

            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

            const response = await fetch(`${serverUrl}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenValue}`,
                },
                body: JSON.stringify(bookingPayload),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to book session. Please try again.");
            }

            toast.success("Booking successful!");
            handleClose();
            router.refresh();

        } catch (error) {
            console.error("Booking error:", error);
            toast.error(error.message || "An error occurred while booking");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isNoSlots) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 border border-red-200 dark:border-red-900">
                <span className="font-medium block mb-1">Fully Booked!</span>
                No available slots left. You can't join at the moment.
            </div>
        );
    }

    if (isTooEarly) {
        return (
            <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-900">
                <span className="font-medium block mb-1">Notice:</span>
                Booking is not available yet for this tutor.
            </div>
        );
    }

    return (
        <>
            <button
                onClick={handleOpen}
                disabled={isPending}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 flex justify-center items-center shadow-sm transition-colors"
            >
                <CalendarCheck className="w-5 h-5 mr-2" />
                {isPending ? "Loading..." : "Book Session"}
            </button>

            {
                isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto overflow-x-hidden">
                        <div className="relative p-4 w-full max-w-lg">
                            <div className="relative bg-white rounded-lg shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Confirm Booking
                                    </h3>

                                    <button
                                        onClick={handleClose}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tutor Name</label>
                                            <input type="text" value={tutor.name || tutor.tutorName} readOnly className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed" />
                                        </div>

                                        <div className="col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tutor ID</label>
                                            <input type="text" value={tutor._id || tutor.id} readOnly className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed" />
                                        </div>

                                        <div className="col-span-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hourly Fee</label>
                                            <input type="text" value={`$${tutor.hourlyFee || tutor.fee || 0}`} readOnly className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed" />
                                        </div>


                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                            <input type="text" value={sessionData?.user?.name || ""} readOnly className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed" />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                            <input type="text" value={sessionData?.user?.email || ""} readOnly className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed" />
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Your Phone Number <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                type="tel"
                                                id="phone"
                                                placeholder="+1 (555) 000-0000"
                                                className={`bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-sm transition-colors`}
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                                                        message: "Please enter a valid phone number"
                                                    }
                                                })}
                                            />

                                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                                        </div>

                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-3 transition-colors"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70 transition-colors shadow-sm"
                                        >
                                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}
