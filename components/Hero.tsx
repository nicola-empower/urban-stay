"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Key } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Hero() {
    return (
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 pt-20 text-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/hero.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-heading text-5xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl"
                >
                    YOUR HOME, YOUR CITY.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-2xl text-lg font-medium text-white/90 drop-shadow-md sm:text-xl"
                >
                    Experience luxury urban living with verified stays.
                </motion.p>

                {/* Interactive Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full"
                >
                    <div className="flex justify-center">
                        <SearchBar />
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-white sm:gap-12"
                >
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <ShieldCheck className="h-5 w-5 text-[var(--color-primary)]" />
                        <span>Verified Hosts</span>
                    </div>
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <Clock className="h-5 w-5 text-[var(--color-primary)]" />
                        <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <Key className="h-5 w-5 text-[var(--color-primary)]" />
                        <span>Self Check-in</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
