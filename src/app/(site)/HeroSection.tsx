"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HeroSection() {
    const pathname = usePathname();
    if (pathname !== "/") return null;
    return (
        <section className="w-full flex flex-col justify-center -mt-10 sm:-mt-40">
            <div className="flex flex-col-reverse md:flex-col w-full">
                {/* Mobile hero text block (now above image on mobile) */}
                <div className="flex flex-col md:hidden w-full items-center px-4 mt-4">
                    <div className="mb-2 text-sm font-semibold text-black tracking-widest uppercase">ДОБРО ПОЖАЛОВАТЬ В KORA</div>
                    <h1 className="text-2xl font-extrabold text-black mb-4 text-center">Крупнейший питомник в СНГ</h1>
                    <p className="text-base text-black mb-6 max-w-xl text-center">Сотни сортов, десятки тысяч растений — от декоративных кустарников до крупных деревьев, готовых к пересадке.</p>
                    <a href="/catalog" className="inline-block px-8 py-3 rounded-3xl font-bold text-lg bg-white border-1 border-[black] text-[black] shadow-lg hover:bg-zinc-100 transition">Каталог</a>
                </div>
                {/* Image container and overlays */}
                <div className="relative w-full max-w-8xl sm:aspect-[3/2] aspect-[3/2.5] overflow-hidden">
                    {/* Mobile logo overlay on top of trees image */}
                    {/* Background image */}
                    
                    {/* Overlay: logo and name in bottom right */}
                    {/* ... logo code ... */}
                    {/* Overlay: main content block (desktop only) */}
                    <div className="hidden md:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 flex-col items-center sm:items-start z-20 px-4 sm:px-16">
                        <div className="mb-2 text-sm font-semibold text-white/80 tracking-widest uppercase">ДОБРО ПОЖАЛОВАТЬ В KORA</div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg text-center md:text-left">Крупнейший питомник в СНГ</h1>
                        <p className="text-lg md:text-2xl text-white/90 mb-6 max-w-xl text-center md:text-left">Сотни сортов, десятки тысяч растений — от декоративных кустарников до крупных деревьев, готовых к пересадке.</p>
                        <a href="/catalog" className="inline-block px-8 py-3 rounded-lg font-bold text-lg bg-white text-[#2E6F40] shadow-lg hover:bg-zinc-100 transition">Каталог</a>
                    </div>
                    <Image
                        src="/field.png"
                        alt="Field background"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                        className="rounded-xl mt-1"
                    />
                    {/* Overlay: feature items banner at bottom, desktop only */}
                    <div
                        className="hidden md:flex w-full bg-[#354024]/95 px-2 md:px-16 absolute left-0 right-0 bottom-0 z-40"
                        style={{ minHeight: '110px', maxHeight: '40%' }}
                    >
                        <div className="flex flex-row w-full items-center justify-between py-3 md:py-0 md:gap-10">
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                                <div className="text-white font-extrabold text-2xl mb-1">360 га</div>
                                <div className="text-zinc-100 text-base leading-snug">Площадь питомника — крупнейший в СНГ.</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                                <div className="text-white font-extrabold text-2xl mb-1">30 000+</div>
                                <div className="text-zinc-100 text-base leading-snug">Взрослых деревьев, готовых к пересадке.</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                                <div className="text-white font-extrabold text-2xl mb-1">3 года</div>
                                <div className="text-zinc-100 text-base leading-snug">Гарантия приживаемости. Бережно доставим и посадим.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile static banner BELOW the image */}
            <div
                className="w-full mt-6 bg-[#354024]/95 px-2 py-4 flex flex-col items-center space-y-2 md:hidden"
                style={{ minHeight: '110px' }}
            >
                <div className="text-white font-extrabold text-xl">360 га</div>
                <div className="text-white text-xs">Площадь питомника — крупнейший в СНГ.</div>
                <div className="text-white font-extrabold text-xl">30 000+</div>
                <div className="text-white text-xs">Взрослых деревьев, готовых к пересадке.</div>
                <div className="text-white font-extrabold text-xl">3 года</div>
                <div className="text-white text-xs">Гарантия приживаемости. Бережно доставим и посадим.</div>
            </div>
        </section>
    );
} 