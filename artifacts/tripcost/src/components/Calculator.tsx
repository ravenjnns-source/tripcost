import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hotel, UtensilsCrossed, Bus, Camera, Stamp, Plane, ShieldAlert, Calculator, RotateCcw, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { travelCountries } from "../data/travelCountries";
import { useApp } from "../context/AppContext";

type TravelStyle = "budget" | "standard" | "luxury";

const STYLE_ICONS = { budget: "🎒", standard: "🏨", luxury: "✨" };

const LINE_ITEMS = [
  { key: "hotel", icon: Hotel, perDay: true },
  { key: "food", icon: UtensilsCrossed, perDay: true },
  { key: "transport", icon: Bus, perDay: true },
  { key: "activities", icon: Camera, perDay: true },
  { key: "visa", icon: Stamp, perDay: false },
  { key: "flight", icon: Plane, perDay: false },
  { key: "emergency", icon: ShieldAlert, perDay: false },
] as const;

export function CalculatorSection() {
  const { t } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<(typeof travelCountries)[0] | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [days, setDays] = useState<number | "">(7);
  const [style, setStyle] = useState<TravelStyle>("standard");
  const [results, setResults] = useState<null | {
    hotel: number; food: number; transport: number; activities: number;
    visa: number; flight: number; emergency: number; grandTotal: number; dailyAverage: number;
  }>(null);

  const filtered = travelCountries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const calculate = () => {
    if (!selectedCountry || !days) return;
    const d = Number(days);
    const costs = selectedCountry.costs[style];
    const hotel = costs.hotel * d;
    const food = costs.food * d;
    const transport = costs.transport * d;
    const activities = costs.activities * d;
    const visa = costs.visa;
    const flight = costs.flight;
    const emergency = costs.emergency;
    const subtotal = hotel + food + transport + activities + visa + flight + emergency;
    const grandTotal = Math.round(subtotal);
    const dailyAverage = Math.round(subtotal / d);
    setResults({ hotel, food, transport, activities, visa, flight, emergency, grandTotal, dailyAverage });
  };

  const reset = () => {
    setResults(null);
    setSelectedCountry(null);
    setSearch("");
    setDays(7);
    setStyle("standard");
  };

  const getVerdict = (daily: number) => {
    if (daily < 50) return { label: t.calculator.affordable, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800", Icon: TrendingDown };
    if (daily <= 150) return { label: t.calculator.moderate, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800", Icon: Minus };
    return { label: t.calculator.expensive, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800", Icon: TrendingUp };
  };

  const styles: { key: TravelStyle; label: string; desc: string }[] = [
    { key: "budget", label: t.calculator.budget, desc: t.calculator.budgetDesc },
    { key: "standard", label: t.calculator.standard, desc: t.calculator.standardDesc },
    { key: "luxury", label: t.calculator.luxury, desc: t.calculator.luxuryDesc },
  ];

  const formatCost = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <section id="calculator" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            {t.calculator.title}
          </div>
          <p className="text-muted-foreground text-lg">{t.calculator.subtitle}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 space-y-7">
            {/* Country Selector */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t.calculator.selectCountry}</label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-background border border-border rounded-xl text-start hover:border-primary/50 transition-colors"
                  data-testid="country-selector"
                >
                  {selectedCountry ? (
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="font-medium">{selectedCountry.name}</span>
                      <span className="text-muted-foreground text-sm">({selectedCountry.continent})</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{t.calculator.selectCountry}</span>
                  )}
                  <span className="text-muted-foreground">▾</span>
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute start-0 end-0 top-full mt-2 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden">
                      <div className="p-2 border-b border-border">
                        <input
                          type="search"
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          placeholder={t.calculator.searchCountry}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary"
                          autoFocus
                          data-testid="country-search"
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto">
                        {filtered.length === 0 ? (
                          <div className="px-4 py-6 text-center text-muted-foreground text-sm">{t.calculator.noData}</div>
                        ) : (
                          filtered.map(c => (
                            <button
                              key={c.code}
                              onClick={() => { setSelectedCountry(c); setDropdownOpen(false); setResults(null); }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-start ${selectedCountry?.code === c.code ? "bg-primary/5 text-primary font-semibold" : ""}`}
                              data-testid={`country-option-${c.code}`}
                            >
                              <span className="text-lg">{c.flag}</span>
                              <span className="flex-1 font-medium">{c.name}</span>
                              <span className="text-muted-foreground text-xs">{c.continent}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Days Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t.calculator.days}</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={days}
                  onChange={e => setDays(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder={t.calculator.daysPlaceholder}
                  className="w-32 px-4 py-3 bg-background border border-border rounded-xl text-center text-lg font-bold outline-none focus:border-primary transition-colors"
                  data-testid="days-input"
                />
                <span className="text-muted-foreground font-medium">{t.calculator.days_label}</span>
                <div className="flex gap-2 ms-auto">
                  {[3, 7, 14, 30].map(d => (
                    <button
                      key={d}
                      onClick={() => setDays(d)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        days === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">{t.calculator.travelStyle}</label>
              <div className="grid grid-cols-3 gap-3">
                {styles.map(s => (
                  <button
                    key={s.key}
                    onClick={() => { setStyle(s.key); setResults(null); }}
                    className={`p-4 rounded-xl border-2 text-start transition-all duration-200 ${
                      style === s.key
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/40 hover:bg-muted/50"
                    }`}
                    data-testid={`style-${s.key}`}
                  >
                    <div className="text-2xl mb-1.5">{STYLE_ICONS[s.key]}</div>
                    <div className={`font-semibold text-sm mb-1 ${style === s.key ? "text-primary" : "text-foreground"}`}>{s.label}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={calculate}
                disabled={!selectedCountry || !days}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                data-testid="calculate-button"
              >
                <Calculator className="w-5 h-5" />
                {t.calculator.calculate}
              </button>
              {results && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-4 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  data-testid="reset-button"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t.calculator.reset}
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="border-t border-border overflow-hidden"
              >
                <div className="p-6 sm:p-8 bg-gradient-to-br from-muted/30 to-background">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-foreground">{t.calculator.resultsTitle}</h3>
                    {selectedCountry && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span>{selectedCountry.name}</span>
                        <span>·</span>
                        <span>{days} {t.calculator.days_label}</span>
                      </div>
                    )}
                  </div>

                  {/* Line Items */}
                  <div className="space-y-2.5 mb-6">
                    {LINE_ITEMS.map(({ key, icon: Icon, perDay }) => {
                      const amount = results[key as keyof typeof results] as number;
                      return (
                        <div key={key} className="flex items-center gap-3 py-2.5 px-4 bg-card rounded-xl border border-border/50">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="flex-1 text-sm font-medium text-foreground">
                            {t.calculator[key as keyof typeof t.calculator] as string}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {perDay ? t.calculator.perDay : t.calculator.oneTime}
                          </span>
                          <span className="font-bold text-foreground tabular-nums">{formatCost(amount)}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Grand Total & Verdict */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 bg-primary rounded-2xl p-5 text-primary-foreground">
                      <div className="text-sm font-medium opacity-80 mb-1">{t.calculator.grandTotal}</div>
                      <div className="text-4xl font-black tabular-nums">{formatCost(results.grandTotal)}</div>
                      <div className="text-sm opacity-70 mt-1">
                        {t.calculator.dailyAverage}: {formatCost(results.dailyAverage)}/{t.calculator.perDay.replace("per ", "")}
                      </div>
                    </div>

                    <div className={`border rounded-2xl p-5 ${getVerdict(results.dailyAverage).bg}`}>
                      <div className="text-sm font-medium text-muted-foreground mb-2">{t.calculator.verdict}</div>
                      {(() => {
                        const { label, color, Icon } = getVerdict(results.dailyAverage);
                        return (
                          <div className={`flex items-center gap-2 font-bold text-lg ${color}`}>
                            <Icon className="w-5 h-5" />
                            {label}
                          </div>
                        );
                      })()}
                      <div className="text-xs text-muted-foreground mt-2">
                        {formatCost(results.dailyAverage)} {t.calculator.perDay}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
