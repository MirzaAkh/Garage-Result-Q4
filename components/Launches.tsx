import React, { useRef } from 'react';
import Section from './Section';
import { motion, useInView } from "framer-motion";
import {
  Search,
  Zap,
  Receipt,
  Bell,
  Server,
  BarChart3,
  FileCheck,
} from "lucide-react";

const userFeatures = [
  {
    icon: Search,
    title: "Поиск авто",
    subtitle: "Car Search",
    description: "SIMA + ASAN интеграция",
  },
  {
    icon: Zap,
    title: "Карта EV-зарядок",
    subtitle: "EV Charging Map",
    description: "Запуск 26.11",
  },
  {
    icon: Receipt,
    title: "Оплата штрафов",
    subtitle: "Traffic Fines Payment",
    description: "Полный функционал",
  },
  {
    icon: Bell,
    title: "Push-уведомления",
    subtitle: "Push Notifications",
    description: "О новых штрафах",
  },
];

const backendFeatures = [
  {
    icon: Server,
    title: "On-prem миграция",
    subtitle: "Infrastructure Migration",
    description: "Собственная инфраструктура",
  },
  {
    icon: BarChart3,
    title: "Аналитический движок",
    subtitle: "Analytics Engine",
    description: "Глубокая аналитика",
  },
  {
    icon: Search,
    title: "E2E зарядки авто",
    subtitle: "E2E Charge flow",
    description: "Разработка концепта",
  },
  {
    icon: FileCheck,
    title: "Legal & Compliance",
    subtitle: "Согласование контрактов",
    description: "Партнерские соглашения",
  },
];

const FeatureCard = ({
  feature,
  index,
  isInView,
  side,
}: {
  feature: typeof userFeatures[0];
  index: number;
  isInView: boolean;
  side: "left" | "right";
}) => (
  <motion.div
    initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    className="bg-garage-card border border-white/5 backdrop-blur-sm rounded-2xl p-5 group hover:scale-105 transition-all duration-300 hover:border-white/10"
  >
    <div className="flex items-start gap-4">
      <motion.div
        className={`p-3 rounded-xl ${
          side === "left" ? "bg-garage-green/10" : "bg-garage-blue/10"
        }`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <feature.icon
          className={`w-6 h-6 ${
            side === "left" ? "text-garage-green" : "text-garage-blue"
          }`}
        />
      </motion.div>
      <div>
        <h4 className="font-semibold text-white">{feature.title}</h4>
        <p className="text-sm text-gray-400 mb-1">{feature.subtitle}</p>
        <p
          className={`text-sm ${
            side === "left" ? "text-garage-green/80" : "text-garage-blue/80"
          }`}
        >
          {feature.description}
        </p>
      </div>
    </div>
  </motion.div>
);

const Launches: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="launches">
      <div ref={ref} className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">Что мы запустили</span>
          </h2>
          <p className="text-gray-400 text-xl">What We Launched</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* User-facing features */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-garage-green to-transparent" />
              <h3 className="text-2xl font-bold text-garage-green">
                Видимое пользователям
              </h3>
            </div>
            <p className="text-gray-400 mb-6">Visible to Users</p>

            <div className="space-y-4">
              {userFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  isInView={isInView}
                  side="left"
                />
              ))}
            </div>
          </motion.div>

          {/* Backend features */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-garage-blue to-transparent" />
              <h3 className="text-2xl font-bold text-garage-blue">
                Под капотом
              </h3>
            </div>
            <p className="text-gray-400 mb-6">Under the Hood</p>

            <div className="space-y-4">
              {backendFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  isInView={isInView}
                  side="right"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Launches;