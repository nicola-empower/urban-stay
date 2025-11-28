"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, CheckCircle, AlertCircle } from "lucide-react";
import clsx from "clsx";

// Zod Schema
const bookingSchema = z
    .object({
        checkIn: z.string().min(1, "Check-in date is required"),
        checkOut: z.string().min(1, "Check-out date is required"),
        guests: z
            .number()
            .min(1, "At least 1 guest required")
            .max(4, "Maximum 4 guests allowed for this property"),
    })
    .refine((data) => {
        if (!data.checkIn || !data.checkOut) return true;
        return new Date(data.checkOut) > new Date(data.checkIn);
    }, {
        message: "Check-out must be after Check-in",
        path: ["checkOut"],
    });

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            guests: 1,
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Booking Data:", data);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6">
                <h2 className="font-heading text-2xl font-bold text-(--color-foreground)">
                    Secure Your Stay
                </h2>
                <p className="text-gray-500">Book your urban retreat today.</p>
            </div>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <div className="mb-4 rounded-full bg-green-100 p-4">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Booking Confirmed!</h3>
                        <p className="mt-2 text-gray-600">
                            We&apos;ve sent the details to your email.
                        </p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-sm font-medium text-(--color-primary) hover:underline"
                        >
                            Book another stay
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Check-in Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Check-in Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    {...register("checkIn")}
                                    className={clsx(
                                        "w-full rounded-xl border bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:bg-white focus:ring-2",
                                        errors.checkIn
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:border-(--color-primary) focus:ring-primary/20"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.checkIn && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 text-xs text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        <span>{errors.checkIn.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Check-out Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Check-out Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    {...register("checkOut")}
                                    className={clsx(
                                        "w-full rounded-xl border bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:bg-white focus:ring-2",
                                        errors.checkOut
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:border-(--color-primary) focus:ring-primary/20"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.checkOut && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 text-xs text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        <span>{errors.checkOut.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Guests */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Guests
                            </label>
                            <div className="relative">
                                <Users className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    {...register("guests", { valueAsNumber: true })}
                                    className={clsx(
                                        "w-full rounded-xl border bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-all focus:bg-white focus:ring-2",
                                        errors.guests
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 focus:border-(--color-primary) focus:ring-primary/20"
                                    )}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.guests && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-1 text-xs text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        <span>{errors.guests.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-(--color-highlight) py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Confirm Booking
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
