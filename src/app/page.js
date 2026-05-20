import AvailableTutors from "@/components/home/AvailableTutors";
import Banner from "@/components/home/Banner";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default async function Home() {
  let tutors = [];

  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    const res = await fetch(`${serverUrl}/tutors?limit=6`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      tutors = data.tutors || data || [];

      if (!Array.isArray(tutors)) {
        tutors = [];
      }
    }
  } catch (error) {
    console.error("Failed to fetch tutors for home page:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />

      <Stats />

      <AvailableTutors tutors={tutors.slice(0, 6)} />

      <WhyChooseUs />
    </div>
  );
}
