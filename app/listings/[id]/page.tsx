"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Dog, Users, Bed, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "@/data/properties";
import Navbar from "@/components/Navbar";

export default function ListingDetails() {
    const { id } = useParams();
    const property = PROPERTIES.find((p) => p.id === id);

    if (!property) {
        return <div>Property not found</div>;
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Image with Shared Element Transition */}
            <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
                <motion.div
                    layoutId={`image-${property.id}`}
                    className="absolute inset-0 h-full w-full"
                >
                    <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </motion.div>

                <Link
                    href="/listings"
                    className="absolute top-24 left-4 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/40 md:left-8"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Link>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="container mx-auto"
                    >
                        <h1 className="font-heading text-4xl font-bold text-white md:text-6xl">
                            {property.title}
                        </h1>
                        <div className="mt-2 flex items-center gap-4 text-white/90">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-5 w-5" />
                                <span>{property.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
                                <span>{property.rating}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-12 md:grid-cols-3">
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-8">
                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-8 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-(--color-primary)" />
                            <span>{property.guests} Guests</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bed className="h-5 w-5 text-(--color-primary)" />
                            <span>{property.bedrooms} Bedrooms</span>
                        </div>
                        {property.wifi && (
                            <div className="flex items-center gap-2">
                                <Wifi className="h-5 w-5 text-(--color-primary)" />
                                <span>Fast Wi-Fi</span>
                            </div>
                        )}
                        {property.petFriendly && (
                            <div className="flex items-center gap-2">
                                <Dog className="h-5 w-5 text-(--color-primary)" />
                                <span>Pet Friendly</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900">About this space</h2>
                        <p className="leading-relaxed text-gray-600">{property.description}</p>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900">What this place offers</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {property.amenities?.map((amenity) => (
                                <div key={amenity} className="flex items-center gap-3 text-gray-600">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-(--color-primary)">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900">Gallery</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {property.images.map((img, index) => (
                                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                    <Image
                                        src={img}
                                        alt={`${property.title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Card */}
                <div className="relative">
                    <div className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-xl">
                        <div className="mb-6 flex items-end justify-between">
                            <div>
                                <span className="font-heading text-2xl font-bold text-(--color-primary)">
                                    ${property.price}
                                </span>
                                <span className="text-gray-500"> / night</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 fill-(--color-highlight) text-(--color-highlight)" />
                                <span className="font-bold">{property.rating}</span>
                            </div>
                        </div>

                        <Link
                            href="/booking"
                            className="block w-full rounded-xl bg-(--color-highlight) py-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Reserve
                        </Link>

                        <p className="mt-4 text-center text-xs text-gray-400">
                            You won&apos;t be charged yet
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
