import Banner from "@/components/home/Banner";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />

      <Stats />

      <WhyChooseUs />
    </div>
  );
}
