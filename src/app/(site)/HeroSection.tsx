"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HeroSection() {
    const pathname = usePathname();
    if (pathname !== "/") return null;
    return (
        <section className="w-full flex justify-center sm:-mt-30">
            <div className="relative w-full max-w-8xl sm:aspect-[3/2] aspect-[3/2.5]">
                {/* Overlay: logo and name at the top in a row */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex flex-row items-center z-10 justify-center -ml-15">
                    <div className="w-18 h-18 sm:w-[154px] sm:h-[154px]">
                        <Image
                            src="/logowhite.svg"
                            alt="Shop Logo"
                            fill
                            priority
                        />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white drop-shadow-lg ml-20 ">KORA</h1>
                </div>
                {/* Background image */}
                <Image
                    src="/field.png"
                    alt="Field background"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className="rounded-xl"
                />
            </div>
        </section>
    );
} 