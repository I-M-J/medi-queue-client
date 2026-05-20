"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { useForm } from "react-hook-form";

function TutorEditModal({ tutor, isOpen, onClose, onUpdate }) {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    useEffect(() => {
        if (tutor) {
            reset(tutor);
        }
    }, [tutor, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;
            const payload = {
                ...data,
                tutorName: data.name,
                name: data.name,
                image: data.photoUrl,
                photoUrl: data.photoUrl,
                hourlyFee: Number(data.hourlyFee),
                totalSlot: Number(data.totalSlots),
                totalSlots: Number(data.totalSlots),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${tutor._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Failed to update tutor");
            const updatedResponse = await res.json();

            toast.success("Tutor updated successfully!");
            onUpdate(updatedResponse.data || { ...tutor, ...payload });
            onClose();
        } catch (error) {
            toast.error(error.message || "An error occurred");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Tutor</h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        <form id="edit-tutor-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" {...register("name", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                <input type="text" {...register("subject", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hourly Fee ($)</label>
                                <input type="number" {...register("hourlyFee", { required: true, min: 0 })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Slots</label>
                                <input type="number" {...register("totalSlots", { required: true, min: 1 })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo URL</label>
                                <input type="url" {...register("photoUrl", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="submit" form="edit-tutor-form" disabled={isSubmitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                        <button type="button" onClick={onClose} className="ml-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TutorDeleteAlert({ tutorId, isOpen, onClose, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${tutorId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token ? `Bearer ${token}` : "",
                }
            });
            if (!res.ok) throw new Error("Failed to delete tutor");
            toast.success("Tutor deleted successfully!");
            onDelete(tutorId);
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={onClose} disabled={isDeleting} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white disabled:opacity-50">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this tutor?</h3>
                        <button onClick={confirmDelete} disabled={isDeleting} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:opacity-50">
                            {isDeleting ? "Deleting..." : "Yes, I'm sure"}
                        </button>
                        <button onClick={onClose} disabled={isDeleting} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 disabled:opacity-50">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MyTutorsTable() {
    const { data: session, isPending } = useSession();
    const [tutors, setTutors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editModalTutor, setEditModalTutor] = useState(null);
    const [deleteModalTutorId, setDeleteModalTutorId] = useState(null);

    useEffect(() => {
        const fetchTutors = async () => {
            if (!session?.user?.email) return;

            try {
                const tokenRes = await authClient.token();
                const token = tokenRes?.data?.token;
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/user/${session.user.email}`, {
                    headers: {
                        "Authorization": token ? `Bearer ${token}` : "",
                    }
                });

                if (!res.ok) throw new Error("Failed to fetch tutors");
                const data = await res.json();
                setTutors(Array.isArray(data) ? data : (data.data || []));
            }
            catch (err) {
                toast.error(err.message || "Failed to fetch tutors");
            }
            finally {
                setIsLoading(false);
            }
        };

        if (!isPending) {
            if (session?.user) {
                fetchTutors();
            } else {
                setIsLoading(false);
            }
        }
    }, [session, isPending]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {isLoading ? (
                <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading tutors...</div>
            ) : tutors.length === 0 ? (
                <div className="text-center p-12 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">No tutors found</h3>
                    <p>You haven't added any tutors yet.</p>
                </div>
            ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tutor Name</th>
                            <th scope="col" className="px-6 py-3">Subject</th>
                            <th scope="col" className="px-6 py-3">Fee / hr</th>
                            <th scope="col" className="px-6 py-3">Slots</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map(tutor => (
                            <tr key={tutor._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {tutor.name}
                                </th>
                                <td className="px-6 py-4">{tutor.subject}</td>
                                <td className="px-6 py-4">${tutor.hourlyFee}</td>
                                <td className="px-6 py-4">{tutor.totalSlot !== undefined ? tutor.totalSlot : tutor.totalSlots}</td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button onClick={() => setEditModalTutor(tutor)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => setDeleteModalTutorId(tutor._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <TutorEditModal
                tutor={editModalTutor}
                isOpen={!!editModalTutor}
                onClose={() => setEditModalTutor(null)}
                onUpdate={(updatedTutor) => {
                    setTutors(tutors.map(t => t._id === updatedTutor._id ? updatedTutor : t));
                }}
            />

            <TutorDeleteAlert
                tutorId={deleteModalTutorId}
                isOpen={!!deleteModalTutorId}
                onClose={() => setDeleteModalTutorId(null)}
                onDelete={(id) => {
                    setTutors(tutors.filter(t => t._id !== id));
                }}
            />
        </div>
    );
}
