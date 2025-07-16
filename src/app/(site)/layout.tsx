import "../globals.css";
import NextAuthSessionProvider from "./SessionProvider";
import Header from "./Header";
import { CartProvider } from "./CartProvider";
import HeroSection from "./HeroSection";
import Image from "next/image";

export const metadata = {
  title: "KORA",
  description: "KORA - ecommerce shop",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <NextAuthSessionProvider>
        <Header />
        <HeroSection />
        <main className="min-h-[70vh] px-4 sm:px-8 pb-8">{children}</main>
        <footer className="w-full bg-zinc-100 text-zinc-700 px-0 pt-8 pb-4 mt-12 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 min-h-[88px]">
              {/* Left group: logo and name */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-4">
                <Image src="/logo.png" alt="KORA Logo" width={96} height={96} className="h-24 w-auto object-contain align-middle" />
                <span className="text-3xl font-extrabold tracking-wide text-zinc-900 mt-1 sm:mt-0">KORA</span>
              </div>
              {/* Right group: links and icons */}
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:gap-8">
                <a href="/faq" className="hover:underline font-medium">FAQ</a>
                <a href="/delivery" className="hover:underline font-medium">Доставка и оплата</a>
                <div className="flex flex-row items-center gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70">
                    {/* Instagram icon from public/instagram.svg */}
                    <svg fill="#000000" width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"/><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"/></svg>
                  </a>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:opacity-70">
                    <svg width="28" height="28" viewBox="0 0 240 240" fill="none"><path d="M195.1 62.7l-27.7 130.9c-2.1 9.3-7.6 11.6-15.4 7.2l-42.6-31.4-20.6 19.8c-2.3 2.3-4.2 4.2-8.6 4.2l3.1-44.1 80.3-72.5c3.5-3.1-0.8-4.8-5.4-1.7l-99.2 62.5-42.7-13.3c-9.3-2.9-9.5-9.3 1.9-13.7l167.2-64.5c7.7-2.8 14.4 1.9 12 13.6z" fill="#111"/></svg>
                  </a>
                  <a href="https://vk.com" target="_blank" rel="noopener noreferrer" aria-label="VK" className="hover:opacity-70">
                    {/* VK icon from public/vk.svg */}
                    <svg fill="#000000" width="28" height="28" viewBox="0 0 363.301 363.301" xmlns="http://www.w3.org/2000/svg"><path d="M347.506,240.442c-7.91-9.495-16.899-18.005-25.592-26.235c-3.091-2.927-6.287-5.953-9.368-8.962
c-8.845-8.648-9.167-11.897-2.164-21.72c4.845-6.771,9.982-13.551,14.95-20.108c4.506-5.949,9.166-12.101,13.632-18.273l0.917-1.269
c8.536-11.811,17.364-24.024,22.062-38.757c1.22-3.887,2.501-9.607-0.428-14.39c-2.927-4.779-8.605-6.237-12.622-6.918
c-1.987-0.337-3.96-0.383-5.791-0.383l-55.901-0.04l-0.462-0.004c-8.452,0-14.148,3.983-17.412,12.178
c-3.116,7.83-6.539,16.168-10.445,24.096c-7.773,15.787-17.645,33.97-31.93,49.135l-0.604,0.645
c-1.687,1.813-3.598,3.866-4.995,3.866c-0.214,0-0.447-0.041-0.711-0.124c-2.959-1.153-4.945-8.316-4.855-11.648
c0.001-0.046,0.002-0.092,0.002-0.138l-0.039-64.61c0-0.224-0.016-0.446-0.045-0.668c-1.422-10.503-4.572-17.041-16.474-19.372
c-0.316-0.063-0.639-0.094-0.961-0.094h-58.126c-9.47,0-14.688,3.849-19.593,9.61c-1.324,1.54-4.08,4.746-2.714,8.635
c1.386,3.947,5.885,4.791,7.35,5.065c7.272,1.384,11.371,5.832,12.532,13.604c2.027,13.496,2.276,27.901,0.784,45.334
c-0.416,4.845-1.239,8.587-2.595,11.784c-0.315,0.746-1.432,3.181-2.571,3.182c-0.362,0-1.409-0.142-3.316-1.456
c-4.509-3.089-7.808-7.497-11.654-12.942c-13.084-18.491-24.065-38.861-33.575-62.288c-3.527-8.624-10.114-13.452-18.556-13.594
c-9.276-0.141-17.686-0.209-25.707-0.209c-8.764,0-16.889,0.081-24.823,0.246C8.914,83.74,4.216,85.776,1.744,89.676
c-2.476,3.903-2.315,9.03,0.479,15.236c22.366,49.723,42.645,85.876,65.755,117.228c16.193,21.938,32.435,37.123,51.109,47.784
c19.674,11.255,41.722,16.727,67.402,16.727c2.911,0,5.921-0.071,8.956-0.213c14.922-0.727,20.458-6.128,21.158-20.657
c0.333-7.425,1.145-15.212,4.795-21.853c2.304-4.184,4.452-4.184,5.158-4.184c1.36,0,3.046,0.626,4.857,1.799
c3.248,2.12,6.033,4.96,8.316,7.441c2.149,2.357,4.274,4.738,6.401,7.12c4.59,5.141,9.336,10.456,14.294,15.497
c10.852,11.041,22.807,15.897,36.538,14.843h51.252c0.109,0,0.219-0.004,0.328-0.011c5.107-0.337,9.53-3.17,12.135-7.772
c3.227-5.701,3.162-12.974-0.174-19.46C356.718,251.867,351.808,245.601,347.506,240.442z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center text-sm pt-3 text-zinc-500 border-t border-zinc-200 mt-6">
              &copy; 2024 KORA. Все права защищены.
            </div>
          </div>
        </footer>
      </NextAuthSessionProvider>
    </CartProvider>
  );
} 