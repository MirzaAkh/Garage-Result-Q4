import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart2, Zap, Users, Flag, Heart } from 'lucide-react';

const NavItem = ({ icon: Icon, id }: { icon: any, id: string }) => (
  <button 
    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
    className="p-3 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
  >
    <Icon className="w-5 h-5" />
  </button>
);

const Navigation: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-full"
    >
      <NavItem icon={Home} id="hero" />
      <NavItem icon={BarChart2} id="metrics" />
      <NavItem icon={Zap} id="launches" />
      <NavItem icon={Users} id="marketing" />
      <NavItem icon={Flag} id="roadmap" />
      <NavItem icon={Heart} id="team" />
    </motion.div>
  );
};

export default Navigation;