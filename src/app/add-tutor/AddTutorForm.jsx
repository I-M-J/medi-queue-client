"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AddTutorForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        if (!session?.user) {
            toast.error("You must be logged in to add a tutor.");
            return;
        }

        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;

            const payload = {
                ...data,
                email: session.user.email,
                tutorEmail: session.user.email,
                name: data.name,
                tutorName: data.name,
                image: data.photoUrl,
                photoUrl: data.photoUrl,
                hourlyFee: Number(data.hourlyFee),
                totalSlot: Number(data.totalSlots),
                totalSlots: Number(data.totalSlots),
                sessionStartDate: data.startDate,
                startDate: data.startDate
            };

            console.log(payload);

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Failed to add tutor");

            toast.success("Tutor added successfully!");
            reset();
            router.refresh();
        }
        catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add a New Tutor</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tutor Name</label>
                    <input type="text" {...register("name", { required: "Name is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo URL</label>
                    <input type="url" {...register("photoUrl", { required: "Photo URL is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="https://example.com/photo.jpg" />
                    {errors.photoUrl && <span className="text-red-500 text-sm">{errors.photoUrl.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                    <select {...register("subject", { required: "Subject is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option value="">Select a Subject</option>
                        <option value="Math">Math</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="English">English</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                    {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teaching Mode</label>
                    <select {...register("teachingMode", { required: "Teaching Mode is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option value="">Select Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Both">Both</option>
                    </select>
                    {errors.teachingMode && <span className="text-red-500 text-sm">{errors.teachingMode.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hourly Fee ($)</label>
                    <input type="number" {...register("hourlyFee", { required: "Hourly fee is required", min: 0 })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="50" />
                    {errors.hourlyFee && <span className="text-red-500 text-sm">{errors.hourlyFee.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Slots</label>
                    <input type="number" {...register("totalSlots", { required: "Total slots is required", min: 1 })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="10" />
                    {errors.totalSlots && <span className="text-red-500 text-sm">{errors.totalSlots.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Session Start Date</label>
                    <input type="date" {...register("startDate", { required: "Start date is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                    {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available Days & Times</label>
                    <input type="text" {...register("availableDays", { required: "Availability is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., Mon-Wed 10am-12pm" />
                    {errors.availableDays && <span className="text-red-500 text-sm">{errors.availableDays.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution / Experience</label>
                    <input type="text" {...register("experience", { required: "Experience is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., Harvard University / 5 years" />
                    {errors.experience && <span className="text-red-500 text-sm">{errors.experience.message}</span>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" {...register("location", { required: "Location is required" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., New York, NY" />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                </div>

                <div className="col-span-1 md:col-span-2 pt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 transition-colors">
                        {isSubmitting ? "Submitting..." : "Add Tutor"}
                    </button>
                </div>
            </form>
        </div>
    );
}
