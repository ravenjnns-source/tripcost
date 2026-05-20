import { motion } from "framer-motion";
import { Globe2, SlidersHorizontal, Receipt } from "lucide-react";
import { useApp } from "../context/AppContext";

export function HowItWorks() {
  const { t } = useApp();

  const steps = [
    { icon: Globe2, title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc, num: "01" },
    { icon: SlidersHorizontal, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc, num: "02" },
    { icon: Receipt, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc, num: "03" },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">{t.howItWorks.title}</h2>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 start-1/6 end-1/6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid lg:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Number circle */}
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-black flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                </div>

                <div className="text-xs font-bold text-primary/40 tracking-widest mb-2">{step.num}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
