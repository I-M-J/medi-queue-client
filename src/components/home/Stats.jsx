export default function Stats() {
    return (
        <section className="bg-blue-600 dark:bg-blue-900">
            <div className="max-w-7xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-3xl gap-8 mx-auto text-white sm:grid-cols-3 dark:text-white">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1000+</dt>
                        <dd className="font-light text-blue-100 dark:text-blue-200">Active Students</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">500+</dt>
                        <dd className="font-light text-blue-100 dark:text-blue-200">Verified Tutors</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">10k+</dt>
                        <dd className="font-light text-blue-100 dark:text-blue-200">Sessions Completed</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
