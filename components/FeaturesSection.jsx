export default function FeaturesSection() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance with lazy loading and advanced caching.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Modern UI/UX that captivates users and drives engagement.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      description: "Enterprise-grade security and best-practice protection.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Fully responsive across all devices and screen sizes.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: "♻️",
      title: "Scalable",
      description: "Architecture that grows with your business seamlessly.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: "🚀",
      title: "Future Ready",
      description: "Built with cutting-edge tech and best practices.",
      color: "from-cyan-500 to-blue-500"
    },
  ];

  return (
    <section className="relative py-24 px-6 lg:px-24 space-y-section">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-block mb-6">
          <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
            Why Work With Me
          </span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
          <span className="gradient-text">Powerful Features</span>
          <br />
          <span className="text-gray-300">That Deliver Results</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Technical excellence combined with creative design for solutions that exceed expectations
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group glass-card p-8 rounded-xl hover-lift"
            style={{
              animationDelay: `${i * 100}ms`
            }}
          >
            {/* Icon Background */}
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
              <span className="text-2xl">{feature.icon}</span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {feature.description}
            </p>

            {/* Bottom Line Accent */}
            <div className="mt-6 h-1 w-0 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
