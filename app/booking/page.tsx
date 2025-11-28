import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero.png"
                        alt="Background"
                        fill
                        className="object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex w-full max-w-5xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Side: Text */}
                    <div className="text-white lg:max-w-lg">
                        <h1 className="font-heading mb-6 text-4xl font-bold md:text-5xl">
                            Your Urban Sanctuary Awaits.
                        </h1>
                        <p className="text-lg text-white/90">
                            Complete your reservation securely. Enjoy 24/7 support and a seamless check-in experience.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                <div className="h-2 w-2 rounded-full bg-green-400" />
                                <span className="font-medium">Instant Confirmation</span>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                <div className="h-2 w-2 rounded-full bg-green-400" />
                                <span className="font-medium">No Hidden Fees</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="flex justify-center lg:justify-end">
                        <BookingForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
