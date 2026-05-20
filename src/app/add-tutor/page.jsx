import AddTutorForm from "./AddTutorForm";

export const metadata = {
    title: "Add Tutor | MediQueue"
};

export default function AddTutorPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10 pb-20">
            <AddTutorForm />
        </div>
    );
}
