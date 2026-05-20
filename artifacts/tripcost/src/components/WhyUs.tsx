import { motion } from "framer-motion";
import { Zap, Globe2, BarChart2, Languages } from "lucide-react";
import { useApp } from "../context/AppContext";

export function WhyUs() {
  const { t } = useApp();

  const features = [
    { icon: Zap, title: t.whyUs.feature1Title, desc: t.whyUs.feature1Desc, color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Globe2, title: t.whyUs.feature2Title, desc: t.whyUs.feature2Desc, color: "text-[#00b5c8]", bg: "bg-[#00b5c8]/10" },
    { icon: BarChart2, title: t.whyUs.feature3Title, desc: t.whyUs.feature3Desc, color: "text-[#3ecf4c]", bg: "bg-[#3ecf4c]/10" },
    { icon: Languages, title: t.whyUs.feature4Title, desc: t.whyUs.feature4Desc, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <section id="why-us" className="py-24 bg-gradient-to-br from-[#0d1e3d] via-[#1a2f5e] to-[#0d1e3d] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,181,200,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(62,207,76,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.whyUs.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:-translate-y-1 hover:border-white/20 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}>
                <feat.icon className={`w-6 h-6 ${feat.color}`} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{feat.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
