import React, { useRef, useEffect } from 'react';
import Section from './Section';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  Receipt, 
  Car, 
  Zap, 
  Map, 
  Search, 
  ExternalLink,
  Navigation
} from 'lucide-react';

// Local AnimatedCounter for this component
const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2 }: { end: number, suffix?: string, prefix?: string, duration?: number }) => {
  const spring = useSpring(0, { bounce: 0, duration: duration * 1000 });
  const display = useTransform(spring, (current) => prefix + Math.round(current).toLocaleString('ru-RU') + suffix);

  useEffect(() => {
    spring.set(end);
  }, [spring, end]);

  return <motion.span>{display}</motion.span>;
};

const kpiCards = [
  {
    icon: CreditCard,
    value: 3650,
    suffix: "+",
    label: "Транзакций",
    sublabel: "Transactions",
    color: "blue"
  },
  {
    icon: TrendingUp,
    value: 103500,
    prefix: "₼ ",
    suffix: "+",
    label: "Оборота",
    sublabel: "Turnover (AZN)",
    color: "green"
  },
];

const breakdownCards = [
  {
    icon: Receipt,
    title: "Штрафы",
    subtitle: "Traffic Fines",
    payments: "~3,150",
    amount: "~102,000 ₼",
    avgCheck: "~32 ₼",
    color: "blue",
  },
  {
    icon: Car,
    title: "Паркинг",
    subtitle: "Parking",
    payments: "~500",
    amount: "~1,500 ₼",
    avgCheck: "~3 ₼",
    color: "green",
  },
];

const evFunnelData = [
  {
    icon: Map,
    label: "Открыли карту",
    unique: 5738,
    total: 7797,
    width: "100%",
    color: "border-garage-blue/50 bg-garage-blue/5",
    textColor: "text-garage-blue"
  },
  {
    icon: Search,
    label: "Изучили станции",
    unique: 1720,
    total: 14732,
    width: "90%",
    color: "border-white/20 bg-white/5",
    textColor: "text-white"
  },
  {
    icon: ExternalLink,
    label: "Перешли к партнёру",
    unique: 532,
    total: 923,
    width: "80%",
    color: "border-garage-green/50 bg-garage-green/5",
    textColor: "text-garage-green"
  },
  {
    icon: Navigation,
    label: "Построили маршрут",
    unique: 230,
    total: 382,
    width: "70%",
    color: "border-purple-500/50 bg-purple-500/5",
    textColor: "text-purple-400"
  }
];

const BusinessResults: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="business">
      <div ref={ref} className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">
              Бизнес-результаты
            </span>
          </h2>
          <p className="text-gray-400 text-xl">Business Results</p>
        </motion.div>

        {/* KPIs */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-garage-card border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <div className={`absolute top-0 right-0 p-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-20 ${kpi.color === 'blue' ? 'bg-garage-blue' : 'bg-garage-green'}`}></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${kpi.color === 'blue' ? 'bg-garage-blue/10 text-garage-blue' : 'bg-garage-green/10 text-garage-green'}`}>
                   <kpi.icon className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={kpi.value} suffix={kpi.suffix} prefix={kpi.prefix} />
                </div>
                <h3 className="text-xl font-semibold text-gray-200">{kpi.label}</h3>
                <p className="text-gray-500">{kpi.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Breakdown - Replaced Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
            {breakdownCards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                    // Reduced padding from p-6 to p-4/p-5 to reduce height ~25%
                    className="bg-garage-card border border-white/5 p-5 rounded-3xl hover:border-white/10 transition-colors"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-2.5 rounded-2xl ${card.color === 'blue' ? 'bg-garage-blue/10 text-garage-blue' : 'bg-garage-green/10 text-garage-green'}`}>
                            <card.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-white leading-tight">{card.title}</h4>
                            <p className="text-xs text-gray-400">{card.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Платежи</span>
                            <span className="font-mono text-white text-base">{card.payments}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Сумма</span>
                            <span className={`font-mono text-base font-bold ${card.color === 'blue' ? 'text-garage-blue' : 'text-garage-green'}`}>
                                {card.amount}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Ср. чек</span>
                            <span className="font-mono text-white text-sm">{card.avgCheck}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* EV Charging Funnel Vertical - Compact */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 bg-garage-card border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
            <div className="text-center mb-6 relative z-10">
                 <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-garage-blue/30 bg-garage-blue/10 text-garage-blue mb-3">
                    <Zap className="w-4 h-4" />
                    <span className="font-mono text-xs">Запуск: 26.11</span>
                 </div>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Электрозарядки</h3>
                 <p className="text-gray-400 text-sm">Воронка конверсии</p>
            </div>

            <div className="flex flex-col items-center relative z-10 max-w-2xl mx-auto">
                {evFunnelData.map((step, index) => (
                    <React.Fragment key={step.label}>
                         {/* Connector Line */}
                         {index > 0 && (
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={isInView ? { height: 16 } : {}}
                                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                                className="w-px border-l-2 border-dashed border-gray-600 my-1"
                            />
                         )}

                         {/* Funnel Step */}
                         <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
                            className={`relative p-4 rounded-2xl border ${step.color} backdrop-blur-md flex items-center justify-between gap-4 shadow-lg`}
                            style={{ width: step.width, minWidth: '300px' }}
                         >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-xl bg-black/20 ${step.textColor}`}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="text-base font-medium text-white block leading-tight mb-0.5">{step.label}</span>
                                    <span className="text-xs text-gray-400 block">Всего: {step.total.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="text-right min-w-[100px]">
                                <div className={`text-xl font-bold ${step.textColor} leading-none mb-1`}>
                                    <AnimatedCounter end={step.unique} />
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-white/50">уников</div>
                            </div>
                         </motion.div>
                    </React.Fragment>
                ))}
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-garage-blue/5 blur-[100px] rounded-full pointer-events-none"></div>
        </motion.div>
      </div>
    </Section>
  );
};

export default BusinessResults;