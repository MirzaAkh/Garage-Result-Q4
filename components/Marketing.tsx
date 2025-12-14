import React, { useRef } from 'react';
import Section from './Section';
import { motion, useInView } from "framer-motion";
import { Megaphone, Star, TrendingUp, Users } from "lucide-react";

const funnel = [
  { label: "Отправлено", value: 120800, width: "100%" },
  { label: "Доставлено", value: 96700, width: "80%" },
  { label: "Открыто", value: 8600, width: "35%" },
  { label: "Гаражей создано", value: 4700, width: "20%" },
];

const Marketing: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="marketing">
      <div ref={ref} className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">Маркетинг</span>
          </h2>
          <p className="text-gray-400 text-xl">Marketing Performance</p>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-garage-card border border-white/5 p-8 mb-12 text-center rounded-3xl shadow-[0_0_30px_rgba(0,255,157,0.1)]"
        >
          <Megaphone className="w-16 h-16 text-garage-green mx-auto mb-4" />
          <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue mb-2">
            Stories — ключевой канал
          </h3>
          <p className="text-xl text-gray-400">
            Stories — Key Marketing Channel
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-garage-card border border-white/5 p-6 rounded-3xl text-center"
          >
            <TrendingUp className="w-10 h-10 text-garage-green mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">17%</div>
            <h4 className="text-lg font-semibold text-white">Конверсия</h4>
            <p className="text-gray-400 text-sm">Conversion Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-garage-card border border-white/5 p-6 rounded-3xl text-center"
          >
            <Star className="w-10 h-10 text-garage-blue mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">4.26</div>
            <h4 className="text-lg font-semibold text-white">Рейтинг пользователей</h4>
            <p className="text-gray-400 text-sm">User Rating / 5</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-garage-card border border-white/5 p-6 rounded-3xl text-center"
          >
            <Users className="w-10 h-10 text-garage-green mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">80%</div>
            <h4 className="text-lg font-semibold text-white">Рейтинги 4+</h4>
            <p className="text-gray-400 text-sm">Ratings 4 and above</p>
          </motion.div>
        </div>

        {/* Push Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-garage-card border border-white/5 p-8 rounded-3xl"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Push-кампания — Воронка</h3>
          <p className="text-gray-400 mb-8">Push Campaign Funnel</p>

          <div className="space-y-6">
            {funnel.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-400 w-40 text-left">{step.label}</span>
                  <span className="text-white font-bold">
                    {step.value.toLocaleString("ru-RU")}
                  </span>
                </div>
                <div className="h-8 rounded-lg bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-lg"
                    style={{
                      background:
                        "linear-gradient(90deg, #00ff9d 0%, #00f0ff 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: step.width } : {}}
                    transition={{ duration: 1.2, delay: 1 + index * 0.15 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-8 p-4 rounded-xl bg-garage-green/10 border border-garage-green/30"
          >
            <p className="text-center text-lg text-white">
              <span className="text-garage-green font-bold">Декабрь:</span>{" "}
              <span>
                Stories на главной = максимальный эффект
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Marketing;