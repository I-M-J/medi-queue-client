import MyTutorsTable from "./MyTutorsTable";

export const metadata = {
    title: "My Tutors | MediQueue"
};

export default function MyTutorsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">My Tutors</h1>
                <MyTutorsTable />
            </div>
        </div>
    );
}
