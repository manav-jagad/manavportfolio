    export default function Services() {
  const services = [
    {
      icon: "💻",
      title: "Full Stack Development",
      desc: "Complete web apps with frontend + backend integration.",
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      desc: "Custom dashboards with analytics and user management.",
    },
    {
      icon: "🔗",
      title: "API Integration",
      desc: "Connect third-party services and build scalable APIs.",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-24">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold">
          My <span className="text-emerald-500">Services</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Solutions designed to grow your business 🚀
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((item, i) => (
          <div
            key={i}
            className="group p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:-translate-y-2"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}