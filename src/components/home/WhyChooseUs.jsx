import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function WhyChooseUs() {
    return (
        <section className="bg-white dark:bg-gray-900 py-12">
            <div className="py-8 px-4 mx-auto max-w-7xl sm:py-16 lg:px-6">
                <div className="max-w-3xl mb-8 lg:mb-16">
                    <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Why Choose MediQueue?
                    </h2>

                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                        We provide a seamless and secure platform to connect eager learners with exceptional educators from around the world.
                    </p>
                </div>

                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 lg:h-16 lg:w-16">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-300 lg:w-8 lg:h-8" />
                        </div>

                        <h3 className="mb-2 text-xl font-bold dark:text-white">Verified Tutors</h3>

                        <p className="text-gray-500 dark:text-gray-400">
                            Every tutor on our platform goes through a rigorous vetting process to ensure high-quality education and safety.
                        </p>
                    </div>

                    <div>
                        <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 lg:h-16 lg:w-16">
                            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-300 lg:w-8 lg:h-8" />
                        </div>

                        <h3 className="mb-2 text-xl font-bold dark:text-white">Flexible Timings</h3>

                        <p className="text-gray-500 dark:text-gray-400">
                            Book sessions that fit perfectly into your schedule. With global tutors, you can learn anytime, anywhere.
                        </p>
                    </div>

                    <div>
                        <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 lg:h-16 lg:w-16">
                            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-300 lg:w-8 lg:h-8" />
                        </div>

                        <h3 className="mb-2 text-xl font-bold dark:text-white">Secure Platform</h3>

                        <p className="text-gray-500 dark:text-gray-400">
                            Your data is safe with us. We use industry-standard encryption and security measures to protect your information.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
