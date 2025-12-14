import React, { useRef, useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Megaphone, Zap } from 'lucide-react';
import Section from './Section';

// Helper to generate date string
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' }).format(date);
};

// Data generation logic
const generateChartData = () => {
  const data = [];
  const startDate = new Date('2025-09-15');
  const genEndDate = new Date('2025-10-21');
  
  // Real data base (22.10)
  const realBaseDate = new Date('2025-10-22');
  const baseGarages = 16453;
  const baseCars = 15601;

  // Target values for 21.10 (End of generated period)
  const targetGenGarages = 16320;
  const targetGenCars = 15502;

  // Start values for 15.09 (Set to 0 as requested)
  let currentGarages = 0;
  let currentCars = 0;

  // 1. GENERATED PHASE (15.09 - 21.10)
  const daysDiff = Math.round((genEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const garageStep = (targetGenGarages - currentGarages) / daysDiff;
  const carStep = (targetGenCars - currentCars) / daysDiff;

  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    let gValue, cValue;

    if (i === daysDiff) {
        // Force exact value on the last day of generation (21.10)
        gValue = targetGenGarages;
        cValue = targetGenCars;
    } else {
        // Linear interpolation without random dips
        gValue = Math.floor(currentGarages + garageStep * i);
        cValue = Math.floor(currentCars + carStep * i);
    }

    data.push({
      dateStr: formatDate(date),
      fullDate: date,
      garages: gValue,
      cars: cValue,
      isProjected: true
    });
  }

  // 2. REAL DATA PHASE BASE (22.10)
  data.push({
    dateStr: formatDate(realBaseDate),
    fullDate: realBaseDate,
    garages: baseGarages,
    cars: baseCars,
    isProjected: false
  });

  // 3. REAL DATA INCREMENTS (23.10 onwards)
  // Arrays start from 23.10
  const realGaragesIncrements = [
    244, 206, 210, 206, 241, 237, 242, 264, 298, 382, 329, 339, 300, 251, 233, 220, 230, 206, 198, 205, 212, 222, 242, 209, 191, 238, 217, 231, 325, 398, 315, 275, 217, 216, 205, 280, 346, 303, 308, 319, 338, 343, 234, 231, 235, 189, 760, 539, 293, 248, 947, 1161, 97
  ];
  
  const realCarsIncrements = [
    240, 200, 193, 196, 232, 232, 244, 242, 304, 356, 305, 338, 285, 251, 202, 196, 207, 199, 199, 199, 201, 202, 235, 210, 176, 201, 162, 187, 281, 327, 247, 217, 181, 207, 191, 271, 312, 255, 290, 292, 307, 302, 235, 186, 123, 70, 794, 559, 322, 295, 1013, 1256, 104
  ];

  let runningGarages = baseGarages;
  let runningCars = baseCars;
  const startDateIncrements = new Date('2025-10-23');

  for (let i = 0; i < realGaragesIncrements.length; i++) {
    const date = new Date(startDateIncrements);
    date.setDate(startDateIncrements.getDate() + i);
    
    runningGarages += realGaragesIncrements[i];
    runningCars += realCarsIncrements[i];

    // Determine if this date corresponds to an event
    let eventName = undefined;
    const day = date.getDate();
    const month = date.getMonth(); // 11 is Dec
    
    if (month === 11 && day === 8) eventName = 'Push Campaign';
    if (month === 11 && day === 12) eventName = 'Stories Feature';

    data.push({
      dateStr: formatDate(date),
      fullDate: date,
      garages: runningGarages,
      cars: runningCars,
      event: eventName
    });
  }

  return data;
};

const spikes = [
  {
    date: "08.12",
    value: "+760",
    title: "Push-кампания",
    subtitle: "Re-engagement Push",
    description: "гаражей за день",
    color: "primary",
    icon: Megaphone
  },
  {
    date: "12-13.12",
    value: "+2,108",
    title: "Stories на главной",
    subtitle: "Viral Feature Launch",
    description: "гаражей за 48 часов",
    color: "secondary",
    icon: Zap
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-garage-card/90 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
        <p className="text-gray-400 mb-2 text-sm font-mono">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-garage-green shadow-[0_0_10px_#00ff9d]"></div>
             <div>
               <p className="text-xs text-gray-400">Гаражи</p>
               <p className="text-xl font-bold text-white leading-none">{payload[0].value.toLocaleString()}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-garage-blue shadow-[0_0_10px_#00f0ff]"></div>
             <div>
               <p className="text-xs text-gray-400">Авто</p>
               <p className="text-xl font-bold text-white leading-none">{payload[1].value.toLocaleString()}</p>
             </div>
          </div>
        </div>
        {data.event && (
          <div className="mt-3 pt-2 border-t border-white/10">
             <div className="inline-block py-1 px-2 bg-white/10 rounded text-xs text-white font-medium">
                {data.event}
             </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const GrowthChart: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [chartAnimated, setChartAnimated] = useState(false);
  
  const chartData = useMemo(() => generateChartData(), []);

  // Filter ticks for every 10 days
  const ticks = chartData
    .filter((_, index) => index % 10 === 0)
    .map(item => item.dateStr);

  return (
    <Section className="bg-garage-dark/30">
      <div ref={ref} className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-garage-green" />
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">
                Ежедневный прирост
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-xl">Динамика создания гаражей и добавления авто</p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          onAnimationComplete={() => setChartAnimated(true)}
          className="bg-garage-card border border-white/5 rounded-3xl p-4 md:p-8 mb-12 relative shadow-2xl"
        >
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGarages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="dateStr" 
                  ticks={ticks}
                  stroke="#666" 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#666" 
                  axisLine={false} 
                  tickLine={false} 
                  dx={-10} 
                  tick={{ fill: '#888', fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Event Lines */}
                <ReferenceLine x="08.12" stroke="#00ff9d" strokeDasharray="3 3" />
                <ReferenceLine x="12.12" stroke="#00f0ff" strokeDasharray="3 3" />

                <Area 
                  type="monotone" 
                  dataKey="garages" 
                  stroke="#00ff9d" 
                  strokeWidth={3}
                  fill="url(#colorGarages)" 
                  animationDuration={2000}
                  animationBegin={chartAnimated ? 0 : 300}
                  name="Гаражи"
                />
                <Area 
                  type="monotone" 
                  dataKey="cars" 
                  stroke="#00f0ff" 
                  strokeWidth={3}
                  fill="url(#colorCars)" 
                  animationDuration={2000}
                  animationBegin={chartAnimated ? 0 : 500}
                  name="Авто"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Spikes */}
        <div className="grid md:grid-cols-2 gap-8">
          {spikes.map((spike, index) => (
            <motion.div
              key={spike.date}
              initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              className="bg-garage-card border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <div className="flex items-start gap-6 relative z-10">
                <div
                  className={`p-4 rounded-2xl ${
                    spike.color === "primary"
                      ? "bg-garage-green/10 text-garage-green"
                      : "bg-garage-blue/10 text-garage-blue"
                  }`}
                >
                  <spike.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        spike.color === "primary"
                          ? "bg-garage-green/20 text-garage-green border border-garage-green/30"
                          : "bg-garage-blue/20 text-garage-blue border border-garage-blue/30"
                      }`}
                    >
                      {spike.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {spike.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {spike.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-4xl font-bold ${
                        spike.color === "primary"
                          ? "text-garage-green"
                          : "text-garage-blue"
                      }`}
                    >
                      {spike.value}
                    </span>
                    <span className="text-gray-500 text-sm">{spike.description}</span>
                  </div>
                </div>
              </div>

              {/* Background glow */}
              <div
                className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none ${
                  spike.color === "primary" ? "bg-garage-green" : "bg-garage-blue"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default GrowthChart;