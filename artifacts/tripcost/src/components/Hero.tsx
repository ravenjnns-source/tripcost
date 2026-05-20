import { motion } from "framer-motion";
import { ArrowRight, Plane, MapPin, DollarSign, TrendingDown } from "lucide-react";
import { useApp } from "../context/AppContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const SAMPLE_CARDS = [
  { country: "Paris, France", flag: "🇫🇷", daily: "$95", style: "Standard", color: "from-blue-500/20 to-teal-500/20" },
  { country: "Bali, Indonesia", flag: "🇮🇩", daily: "$38", style: "Budget", color: "from-green-500/20 to-emerald-500/20" },
  { country: "Tokyo, Japan", flag: "🇯🇵", daily: "$110", style: "Standard", color: "from-purple-500/20 to-pink-500/20" },
];

export function Hero() {
  const { t } = useApp();

  const scrollToCalc = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1e3d] via-[#1a2f5e] to-[#00b5c8]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,181,200,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(62,207,76,0.08),transparent_60%)]" />

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-white"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white/90 mb-6">
              <TrendingDown className="w-4 h-4 text-[#3ecf4c]" />
              Smart travel budgeting for 20+ countries
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/75 leading-relaxed mb-10 max-w-lg"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                onClick={scrollToCalc}
                className="group inline-flex items-center gap-2 bg-[#00b5c8] hover:bg-[#00a0b2] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#00b5c8]/30 hover:-translate-y-0.5"
                data-testid="hero-cta"
              >
                {t.hero.ctaButton}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <DollarSign className="w-4 h-4 text-[#3ecf4c]" />
                Free · No sign-up required
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "20+", label: "Countries" },
                { value: "3", label: "Travel Styles" },
                { value: "10", label: "Languages" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-[#00b5c8]">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Sample Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#00b5c8]/20 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-[#00b5c8]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Sample Trip Estimates</div>
                    <div className="text-white/50 text-xs">10 days · Standard Style</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {SAMPLE_CARDS.map((card, i) => (
                    <motion.div
                      key={card.country}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className={`flex items-center justify-between bg-gradient-to-r ${card.color} border border-white/10 rounded-xl p-4`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{card.flag}</span>
                        <div>
                          <div className="text-white font-semibold text-sm">{card.country}</div>
                          <div className="text-white/50 text-xs">{card.style}</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-[#00b5c8] font-black text-lg">{card.daily}</div>
                        <div className="text-white/50 text-xs">/day</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <MapPin className="w-3 h-3 text-[#3ecf4c]" />
                    Live estimates
                  </div>
                  <div className="text-white/40 text-xs">Updated regularly</div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="absolute -top-4 -end-4 bg-[#3ecf4c] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg"
              >
                100% Free
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
