import React, { useRef, useState, useEffect } from 'react';
import Section from './Section';
import { Warehouse, Car, ShieldCheck } from 'lucide-react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// Internal AnimatedCounter component
const AnimatedCounter = ({ end, suffix = "", duration = 2.5 }: { end: number, suffix?: string, duration?: number }) => {
  const spring = useSpring(0, { bounce: 0, duration: duration * 1000 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);

  useEffect(() => {
    spring.set(end);
  }, [spring, end]);

  return <motion.span>{display}</motion.span>;
};

const metrics = [
  {
    icon: Warehouse,
    value: 32400,
    label: "Созданных гаражей",
    sublabel: "Created garages",
    color: "primary",
  },
  {
    icon: Car,
    value: 30600,
    label: "Добавленных авто",
    sublabel: "Added cars",
    color: "secondary",
  },
  {
    icon: ShieldCheck,
    value: 21,
    suffix: "%",
    label: "Верифицированных авто",
    sublabel: "Verification growth: 0% → 21%",
    color: "primary",
  },
];

interface MetricCardProps {
  metric: any;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView]);

  const isPrimary = metric.color === "primary";
  const iconColor = isPrimary ? "text-garage-green" : "text-garage-blue";
  const bgColor = isPrimary ? "bg-garage-green/10" : "bg-garage-blue/10";
  const glowColor = isPrimary ? "hsl(156, 100%, 50%, 0.1)" : "hsl(192, 100%, 50%, 0.1)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-garage-card border border-white/5 p-8 text-center group hover:scale-105 transition-transform duration-300 rounded-3xl relative overflow-hidden backdrop-blur-sm"
    >
      <motion.div
        className={`inline-flex p-4 rounded-2xl mb-6 ${bgColor}`}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <metric.icon 
          className={`w-10 h-10 ${iconColor}`} 
        />
      </motion.div>

      <div className="mb-4 text-5xl md:text-6xl font-bold text-white tracking-tight">
        {shouldAnimate ? (
          <AnimatedCounter
            end={metric.value}
            suffix={metric.suffix}
            duration={2.5}
          />
        ) : (
           "0" + (metric.suffix || "")
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-1">
        {metric.label}
      </h3>
      <p className="text-sm text-gray-400">{metric.sublabel}</p>

      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px ${glowColor}` }}
      />
    </motion.div>
  );
};

const Metrics: React.FC = () => {
  return (
    <Section id="metrics">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">
              Рост пользователей
            </span>
          </h2>
          <p className="text-gray-400 text-xl">User Growth Metrics</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Metrics;