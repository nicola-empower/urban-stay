"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { PROPERTIES } from "@/data/properties";

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-900 text-white/50">
            Loading Map...
        </div>
    )
});

export default function ListingsPage() {
    const [highlightedId, setHighlightedId] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Filters Header */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-[var(--color-foreground)]">
                            Stays in Metropolis
                        </h1>
                        <p className="text-gray-500">
                            {PROPERTIES.length} properties found
                        </p>
                    </div>

                    {/* Mock Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50">
                            Price: Any
                        </button>
                        <button className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50">
                            Guests: Any
                        </button>
                        <button className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50">
                            Type: Entire place
                        </button>
                        <button className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50">
                            More filters
                        </button>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-6 lg:flex-row">
                    {/* Grid */}
                    <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
                        {PROPERTIES.map((property) => (
                            <div
                                key={property.id}
                                onMouseEnter={() => setHighlightedId(property.id)}
                                onMouseLeave={() => setHighlightedId(null)}
                            >
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>

                    {/* Map (Sticky on Desktop) */}
                    <div className="hidden h-[calc(100vh-140px)] w-full lg:sticky lg:top-24 lg:block lg:w-[45%]">
                        <Map properties={PROPERTIES} highlightedId={highlightedId} />
                    </div>
                </div>
            </div>
        </main>
    );
}
