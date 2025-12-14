import React from 'react';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import GrowthChart from './components/GrowthChart';
import Launches from './components/Launches';
import BusinessResults from './components/BusinessResults';
import Marketing from './components/Marketing';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  return (
    <main className="bg-garage-black text-white selection:bg-garage-green selection:text-black w-full overflow-hidden">
      <Navigation />
      <Hero />
      <Metrics />
      <GrowthChart />
      <Launches />
      <BusinessResults />
      <Marketing />
      <Roadmap />
      <Team />
      <Footer />
      
      {/* Sticky Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-50">
        <div className="h-full bg-garage-green origin-left scale-x-0 animate-scroll-progress"></div>
      </div>
    </main>
  );
}

export default App;