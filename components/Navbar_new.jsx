import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-5 px-6 lg:px-24 bg-gray-950/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            {/* LOGO */}
            <Link href="/" className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-emerald-500/50 group-hover:border-emerald-400 transition group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <span className="text-emerald-400 font-bold text-lg">M</span>
                </div>

                <span className="text-lg font-bold tracking-wider hidden sm:inline text-white">
                    MJ <span className="bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text font-black">DEV</span>
                </span>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex gap-10 text-gray-300 font-medium">
                {[
                    { label: "Home", href: "/" },
                    { label: "Services", href: "/services" },
                    { label: "Portfolio", href: "/portfolio" },
                    { label: "Contact", href: "/contact" },
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="relative group transition duration-300 hover:text-emerald-400"
                    >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                ))}
            </div>

            {/* CTA BUTTON */}
            <Link
                href="/contact"
                className="group px-7 py-3 rounded-lg font-bold bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
            >
                <span className="flex items-center gap-2">
                    Let&apos;s Talk
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
            </Link>
        </nav>
  );
}
