import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      {/* Featured Section Placeholder */}
      <section className="container mx-auto py-20 px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-(--color-foreground) md:text-4xl">
            Curated for Comfort
          </h2>
          <p className="mt-4 text-gray-600">
            Handpicked properties in the heart of the city.
          </p>
        </div>
        {/* Property Grid will go here */}
      </section>
    </main>
  );
}
