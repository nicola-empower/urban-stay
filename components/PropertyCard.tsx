"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropertyProps {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    images: string[];
    guests: number;
    bedrooms: number;
    wifi: boolean;
    petFriendly: boolean;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

export default function PropertyCard({ property }: { property: PropertyProps }) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isPriceHovered, setIsPriceHovered] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    // We only have 3 images per property in mock data, but let's be safe
    const imageIndex = Math.abs(page % property.images.length);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // Auto-scroll carousel on hover
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered) {
            interval = setInterval(() => {
                paginate(1);
            }, 3000); // Change image every 3 seconds
        }
        return () => clearInterval(interval);
    }, [isHovered, page]); // Re-run on page change to reset timer

    const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    // Mock calculation for tooltip
    const nights = 3;
    const cleaningFee = 50;
    const serviceFee = Math.round(property.price * nights * 0.12);
    const totalPrice = property.price * nights + cleaningFee + serviceFee;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
            {/* Image Carousel */}
            <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        layoutId={`image-${property.id}`}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", ease: "easeInOut", duration: 0.8 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing transform-gpu"
                        onClick={() => router.push(`/listings/${property.id}`)}
                    >
                        <Image
                            src={property.images[imageIndex]}
                            alt={property.title}
                            fill
                            className="object-cover"
                            draggable={false}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority={imageIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows (Visible on Hover) */}
                <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(-1);
                        }}
                        className="pointer-events-auto rounded-full bg-white/80 p-1.5 text-gray-800 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            paginate(1);
                        }}
                        className="pointer-events-auto rounded-full bg-white/80 p-1.5 text-gray-800 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Favorite Button */}
                <button
                    className="absolute top-3 right-3 z-10 rounded-full p-2 text-white transition-transform hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Heart className="h-6 w-6 fill-black/20 stroke-white" />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-heading text-lg font-bold text-[var(--color-foreground)]">
                            {property.title}
                        </h3>
                        <p className="text-sm text-gray-500">{property.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[var(--color-highlight)] text-[var(--color-highlight)]" />
                        <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">
                            {property.guests} guests • {property.bedrooms} bedrooms
                        </span>
                        <div className="mt-1 flex gap-2">
                            {property.wifi && (
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                    Fast Wi-Fi
                                </span>
                            )}
                            {property.petFriendly && (
                                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                    Pet Friendly
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Pricing with Tooltip */}
                    <div
                        className="relative text-right"
                        onMouseEnter={() => setIsPriceHovered(true)}
                        onMouseLeave={() => setIsPriceHovered(false)}
                    >
                        <span className="font-heading text-lg font-bold text-[var(--color-primary)] cursor-help">
                            ${property.price}
                        </span>
                        <span className="text-sm text-gray-500"> / night</span>

                        <AnimatePresence>
                            {isPriceHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="absolute bottom-full right-0 mb-2 w-48 rounded-xl bg-gray-900 p-3 text-xs text-white shadow-xl z-20"
                                >
                                    <div className="flex justify-between mb-1">
                                        <span>{nights} nights</span>
                                        <span>${property.price * nights}</span>
                                    </div>
                                    <div className="flex justify-between mb-1 text-gray-400">
                                        <span>Cleaning fee</span>
                                        <span>${cleaningFee}</span>
                                    </div>
                                    <div className="flex justify-between mb-2 text-gray-400">
                                        <span>Service fee</span>
                                        <span>${serviceFee}</span>
                                    </div>
                                    <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-[var(--color-highlight)]">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="absolute bottom-[-4px] right-4 h-2 w-2 rotate-45 bg-gray-900"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
