export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-40 px-6 lg:px-24 text-center min-h-screen flex items-center justify-center">
      {/* Enhanced Background Glows */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-emerald-500 opacity-15 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600 opacity-15 blur-[150px] rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 opacity-5 blur-[150px] rounded-full"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-block mb-8 animate-fade-in">
          <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <span className="animate-pulse">✨</span> Welcome to My Portfolio
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-8 tracking-tight">
          Crafting{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 text-transparent bg-clip-text animate-slide-up-jerk">
            Digital Magic
          </span>
          <br />
          <span className="text-gray-300">& Scalable Solutions</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          I design and develop high-performance web applications, interactive dashboards, and 
          beautiful user experiences that drive business growth. Let&apos;s transform your vision into reality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          <button className="group px-10 py-4 rounded-lg font-bold bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)]">
            <span className="flex items-center gap-2">
              Start Your Project
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          <button className="px-10 py-4 rounded-lg border-2 border-emerald-500/50 text-emerald-400 font-bold hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300">
            View Portfolio
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-3 gap-6 lg:gap-12 max-w-2xl mx-auto pt-16 border-t border-gray-700/50">
          {[
            { number: "50+", label: "Projects Shipped", icon: "🚀" },
            { number: "30+", label: "Happy Clients", icon: "😊" },
            { number: "5+", label: "Years Exp", icon: "⚡" },
          ].map((stat, i) => (
            <div key={i} className="group hover-lift">
              <p className="text-3xl lg:text-4xl font-black bg-gradient-to-br from-emerald-400 to-blue-500 text-transparent bg-clip-text mb-2">
                {stat.number}
              </p>
              <p className="text-sm lg:text-base text-gray-400 group-hover:text-gray-300 transition">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <p className="text-gray-500 text-sm mb-2">Scroll to explore</p>
        <svg className="w-6 h-6 mx-auto text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
