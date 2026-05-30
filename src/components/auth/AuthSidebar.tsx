const testimonials = [
  {
    quote: "This program gave me my life back. The holistic approach changed everything.",
    author: "SSgt. Marcus W., USMC Veteran",
  },
  {
    quote: "Finally found something that actually works. My sleep and anxiety are so much better.",
    author: "Spc. Dana R., Army Veteran",
  },
  {
    quote: "Veteran Healing's mission is real. They genuinely care about us.",
    author: "PO2 James T., Navy Veteran",
  },
];

export default function AuthSidebar() {
  return (
    <div
      className="relative flex flex-col justify-between p-8 lg:p-12 overflow-hidden w-full h-full"
      style={{
        background: "linear-gradient(135deg, #113B2C 0%, #0F402F 40%, #24533E 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: "#3B6E56", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
        style={{ background: "#769183", transform: "translate(-30%, 30%)" }}
      />

      {/* Logo / Brand */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-25 h-25 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ background: "#fff" }}
          >
            <img src="/logo.webp" alt="Veteran Healing" className="w-[120px] object-contain " />
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            Veteran Healing
          </span>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
        <h1
          className="text-white font-bold leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Holistic Wellness
          <br />
          <span style={{ color: "#F5A623" }}>For Those Who Served</span>
        </h1>

        <p className="text-green-100 text-base leading-relaxed mb-8 max-w-xs opacity-90">
          Premium mushroom-based wellness products crafted with a mission — supporting
          veteran healing, mind, body, and spirit.
        </p>

        {/* Testimonial */}
        <div
          className="rounded-xl p-5 border border-white/10"
          style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(4px)" }}
        >
          <p className="text-green-100 text-sm italic leading-relaxed mb-3">
            "{testimonials[0].quote}"
          </p>
          <p className="text-green-300 text-xs font-medium">{testimonials[0].author}</p>
        </div>
      </div>
    </div>
  );
}
