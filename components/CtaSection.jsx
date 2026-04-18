export default function CtaSection() {
  return (
    <section className="py-24 px-6 lg:px-24">
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-[1px] rounded-2xl">
        <div className="bg-gray-950 rounded-2xl p-12 lg:p-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let&apos;s Build Something <span className="text-emerald-400">Amazing</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Ready to take your idea to the next level? Let&apos;s start a conversation about what&apos;s possible.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-8 py-3 bg-emerald-500 rounded-lg font-semibold hover:bg-emerald-400 transition transform hover:scale-105">
              Book a Call
            </button>
            <button className="px-8 py-3 border border-gray-700 rounded-lg font-semibold hover:bg-gray-900 transition">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
