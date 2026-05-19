"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const { data: signUpData, error } = await signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                image: data.photoUrl,
            });

            if (error) {
                toast.error(error.message || "Failed to register");
            }
            else {
                toast.success("Registration successful!");
                router.push("/");
            }
        }
        catch (err) {
            toast.error("An unexpected error occurred.");
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {

    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-140px)] flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Register for MediQueue
                    </h1>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="John Doe"
                                {...register("name", { required: "Name is required" })}
                            />

                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="name@company.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />

                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="photoUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Photo URL
                            </label>

                            <input
                                type="url"
                                id="photoUrl"
                                className={`bg-gray-50 border ${errors.photoUrl ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                placeholder="https://example.com/photo.jpg"
                                {...register("photoUrl", { required: "Photo URL is required" })}
                            />

                            {errors.photoUrl && <p className="mt-1 text-sm text-red-500">{errors.photoUrl.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                        message: "Must contain at least one uppercase and one lowercase letter"
                                    }
                                })}
                            />

                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70"
                        >
                            {isLoading ? "Creating account..." : "Register"}
                        </button>

                        <div className="flex items-center justify-center space-x-2 my-4">
                            <span className="h-px w-full bg-gray-200 dark:bg-gray-700"></span>

                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Or</span>

                            <span className="h-px w-full bg-gray-200 dark:bg-gray-700"></span>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                            <FaGoogle className="w-4 h-4 mr-2" />

                            Sign up with Google
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            Already have an account?{" "}

                            <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
