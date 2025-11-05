export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[680px] bg-section-gradient flex items-center justify-center text-center overflow-hidden">
      {/* Optional overlay for depth */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Banner text */}
      <div className="relative z-10">
        <h1 className="uppercase tracking-[0.35em] font-semibold text-[26px] md:text-[32px] text-white">
          BANNER IMAGE
        </h1>
      </div>
    </section>
  );
}
