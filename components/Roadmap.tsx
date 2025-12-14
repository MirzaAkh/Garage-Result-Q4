import React, { useRef } from 'react';
import Section from './Section';
import { motion, useInView } from 'framer-motion';
import { Bell, Zap, Shield, Wrench, Code, CheckCircle2 } from 'lucide-react';

const roadmapData = [
  {
    title: "SDK For Ecosystem",
    subtitle: "Платформа для разработчиков",
    date: "Jan 2026",
    description: "Открытое SDK для партнеров. Создание мини-приложений внутри экосистемы Garage.",
    icon: Code,
    color: "blue",
    status: "upcoming"
  },
  {
    title: "Move your car notifications",
    subtitle: "Умные уведомления",
    date: "Jan 2026",
    description: "Оповещения об эвакуации и просьбы переставить авто от других водителей.",
    icon: Bell,
    color: "green",
    status: "upcoming"
  },
  {
    title: "Pasha Insurance (OSAGO/CASCO)",
    subtitle: "Страхование",
    date: "Feb 2026",
    description: "Оформление страховых полисов прямо в приложении. Управление сроками и выплатами.",
    icon: Shield,
    color: "blue",
    status: "planned"
  },
  {
    title: "End-to-end EV charging",
    subtitle: "Зарядка электромобилей",
    date: "Feb 2026",
    description: "Полный цикл: поиск, бронирование, старт сессии и оплата внутри Garage.",
    icon: Zap,
    color: "green",
    status: "planned"
  },
  {
    title: "Auto Parts BirMarket",
    subtitle: "Маркетплейс",
    date: "Mar 2026",
    description: "Единый маркетплейс автозапчастей. Подбор по VIN и быстрая доставка.",
    icon: Wrench,
    color: "blue",
    status: "planned"
  }
];

const RoadmapItem = ({ item, index, isEven }: { item: typeof roadmapData[0], index: number, isEven: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isBlue = item.color === 'blue';
  const colorClass = isBlue ? 'text-garage-blue' : 'text-garage-green';
  const bgClass = isBlue ? 'bg-garage-blue/10' : 'bg-garage-green/10';
  const borderClass = isBlue ? 'border-garage-blue/30' : 'border-garage-green/30';
  const gradientClass = isBlue ? 'from-garage-blue' : 'from-garage-green';

  return (
    <div ref={ref} className={`flex items-center justify-between w-full mb-12 md:mb-24 relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Empty half for desktop layout balancing */}
      <div className="hidden md:block w-5/12" />

      {/* Center Point (The Checkpoint) */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-8 h-8 rounded-full border-4 border-[#0a0a0a] ${isBlue ? 'bg-garage-blue' : 'bg-garage-green'} shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20`}
        />
        {/* Date bubble attached to checkpoint */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className={`mt-2 px-3 py-1 rounded-full text-xs font-bold bg-[#1a1a1a] border border-white/10 ${colorClass} whitespace-nowrap hidden md:block`}
        >
            {item.date}
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full pl-12 md:pl-0 md:w-5/12 relative group"
      >
        <div className={`bg-garage-card border border-white/5 p-6 rounded-3xl hover:border-white/20 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity ${isBlue ? 'bg-garage-blue' : 'bg-garage-green'} pointer-events-none -translate-y-1/2 translate-x-1/2`}></div>
            
            <div className="flex items-start gap-4 relative z-10">
                <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
                    <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400 md:hidden">{item.date}</span>
                        {index === 0 && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-white animate-pulse">Next</span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className={`text-sm font-medium mb-3 ${colorClass} opacity-80`}>{item.subtitle}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
            </div>
        </div>

        {/* Connector Line (Mobile only - horizontal) */}
        <div className={`absolute top-8 left-0 w-8 h-[2px] md:hidden ${isBlue ? 'bg-garage-blue/50' : 'bg-garage-green/50'}`}></div>
      </motion.div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="roadmap">
      <div ref={ref} className="max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">Что дальше</span>
          </h2>
          <p className="text-gray-400 text-xl">Roadmap 2026</p>
        </motion.div>

        <div className="relative">
          {/* The Road Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 md:translate-x-0">
             <div className="w-full h-full bg-gradient-to-b from-garage-green via-garage-blue to-transparent opacity-30 dashed-line-mask"></div>
          </div>
          
          {/* Road Overlay Gradient to fade out at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

          <div className="relative z-0">
            {roadmapData.map((item, index) => (
              <RoadmapItem 
                key={index} 
                item={item} 
                index={index} 
                isEven={index % 2 !== 0} 
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;