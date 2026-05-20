import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

type Language = "en" | "ar" | "fr" | "es" | "de" | "tr" | "pt" | "hi" | "zh" | "ja";
type Theme = "light" | "dark";

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  isRTL: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  isRTL: false,
  theme: "light",
  toggleTheme: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedLang = localStorage.getItem("tripcost-lang") as Language;
    if (storedLang && translations[storedLang]) setLangState(storedLang);
    const storedTheme = localStorage.getItem("tripcost-theme") as Theme;
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("tripcost-lang", newLang);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("tripcost-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const t = (translations[lang] || translations.en) as typeof translations.en;

  return (
    <AppContext.Provider value={{ lang, setLang, t, isRTL, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
