export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStartup",
      text: "MJ delivered an exceptional dashboard that transformed how we manage our operations. The attention to detail and performance is outstanding!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, E-Commerce Co",
      text: "Working with MJ was smooth and professional. The final product exceeded our expectations and has driven significant revenue growth.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, SaaS Inc",
      text: "MJ's full-stack expertise was exactly what we needed. The application is performant, scalable, and the code quality is excellent.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          What Clients <span className="text-emerald-400">Say</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real testimonials from satisfied clients I&apos;ve worked with
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/50 transition-all"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, j) => (
                <span key={j} className="text-emerald-400">⭐</span>
              ))}
            </div>

            <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>

            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-emerald-400 text-sm">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
