import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { travelCountries } from "../data/travelCountries";
import { useApp } from "../context/AppContext";

const FEATURED = ["FR", "JP", "TH", "IT", "TR", "MA"];

const GRADIENTS = [
  "from-blue-500/15 to-indigo-500/15",
  "from-red-500/15 to-orange-500/15",
  "from-green-500/15 to-teal-500/15",
  "from-yellow-500/15 to-amber-500/15",
  "from-purple-500/15 to-pink-500/15",
  "from-cyan-500/15 to-sky-500/15",
];

export function PopularDestinations() {
  const { t } = useApp();

  const destinations = FEATURED.map(code => travelCountries.find(c => c.code === code)).filter(Boolean) as typeof travelCountries;

  const scrollToCalc = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="destinations" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">{t.destinations.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.destinations.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => {
            const budgetDaily = dest.costs.budget.hotel + dest.costs.budget.food;
            return (
              <motion.div
                key={dest.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={scrollToCalc}
                className={`group relative bg-gradient-to-br ${GRADIENTS[i]} bg-card border border-border rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-200`}
                data-testid={`destination-card-${dest.code}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-4xl">{dest.flag}</span>
                    <div className="mt-2">
                      <h3 className="font-bold text-foreground text-lg">{dest.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {dest.continent}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 mt-1" />
                </div>

                <div className="border-t border-border/50 pt-4 mt-4">
                  <div className="text-xs text-muted-foreground mb-1">{t.destinations.from}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">${budgetDaily}</span>
                    <span className="text-muted-foreground text-sm">{t.destinations.perDay}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Budget style · hotel + food</div>
                </div>

                {/* Style dots */}
                <div className="flex gap-2 mt-4">
                  {(["budget", "standard", "luxury"] as const).map(s => (
                    <div
                      key={s}
                      className="flex-1 h-1.5 rounded-full"
                      style={{
                        background: s === "budget" ? "#3ecf4c" : s === "standard" ? "#00b5c8" : "#1a2f5e",
                        opacity: 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
