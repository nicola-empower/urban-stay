import Link from "next/link";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-[var(--color-primary)]" />
                    <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-foreground)]">
                        Urban Stay
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden gap-6 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-[var(--color-primary)]"
                    >
                        Home
                    </Link>
                    <Link
                        href="/listings"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-[var(--color-primary)]"
                    >
                        Listings
                    </Link>
                    <Link
                        href="/booking"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-[var(--color-primary)]"
                    >
                        Booking
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/booking"
                        className="hidden rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700 md:block"
                    >
                        Book Now
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-gray-100 bg-white md:hidden"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/listings"
                                className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Listings
                            </Link>
                            <Link
                                href="/booking"
                                className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Booking
                            </Link>
                            <Link
                                href="/booking"
                                className="inline-block w-full rounded-full bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-700"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Book Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
