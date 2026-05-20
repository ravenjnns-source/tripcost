import { Globe2, Plane } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0d1e3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/tripcost-logo.jpeg" alt="TripCost" className="h-10 w-auto rounded" />
              <span className="text-2xl font-black">
                <span className="text-white">Trip</span>
                <span className="text-[#00b5c8]">Cost</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-2 mt-4 text-xs text-white/40">
              <Globe2 className="w-3.5 h-3.5 text-[#00b5c8]" />
              10 languages · 20+ countries · Free forever
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {[
                { label: t.nav.calculator, id: "calculator" },
                { label: t.nav.destinations, id: "destinations" },
                { label: t.nav.howItWorks, id: "how-it-works" },
                { label: t.nav.whyUs, id: "why-us" },
                { label: t.nav.faq, id: "faq" },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/60 hover:text-[#00b5c8] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Info</div>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "About TripCost", "Contact"].map(item => (
                <li key={item}>
                  <span className="text-sm text-white/60 cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {t.footer.copyright.replace("{year}", String(year))}
          </p>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Plane className="w-3.5 h-3.5 text-[#3ecf4c]" />
            Built for smarter travelers
          </div>
        </div>
      </div>
    </footer>
  );
}
