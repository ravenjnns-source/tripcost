import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CalculatorSection } from "./components/Calculator";
import { PopularDestinations } from "./components/PopularDestinations";
import { HowItWorks } from "./components/HowItWorks";
import { WhyUs } from "./components/WhyUs";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <CalculatorSection />
          <PopularDestinations />
          <HowItWorks />
          <WhyUs />
          <FAQ />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
