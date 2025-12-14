import React, { useRef } from 'react';
import Section from './Section';
import { motion, useInView } from "framer-motion";
import { Users, Code, LineChart, Award } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface Department {
  id: string;
  title: string;
  icon: any;
  members: TeamMember[];
}

const departments: Department[] = [
  {
    id: "dev",
    title: "Development Team",
    icon: Code,
    members: [
      { name: "Mirza Akhundov", role: "Product Owner" },
      { name: "Akhmed Suleymanov", role: "Back-end" },
      { name: "Aleksey Vasyukov", role: "Front-end" },
      { name: "Alexander Derevyanko", role: "AQA" },
      { name: "Jeyhun Gadirov", role: "DevOps" },
      { name: "Nurida Guliyeva", role: "Designer" },
      { name: "Ayla Mammadova", role: "MQA" },
    ]
  },
  {
    id: "perf",
    title: "Performance, Analytics & Marketing",
    icon: LineChart,
    members: [
      { name: "Maria Fomina", role: "Performance" },
      { name: "Aleksandra Kuzmina", role: "Product Analyst" },
      { name: "Kemel Akhmatbekov", role: "Product Analyst" },
      { name: "Heyran Hajiyeva", role: "PMM" },
      { name: "Amina Kazimova", role: "CVM Analyst" },
    ]
  },
  {
    id: "authors",
    title: "Project Co-authors",
    icon: Award,
    members: [
      { name: "Murad Garayev", role: "Co-author" },
      { name: "Jeyhun Yahyayev", role: "Co-author" },
    ]
  }
];

// Helper to get initials
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const Team: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="team">
      <div ref={ref} className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Users className="w-10 h-10 text-garage-green" />
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">Команда Garage</span>
            </h2>
          </div>
          <p className="text-2xl text-gray-400">Dream Team</p>
        </motion.div>

        <div className="space-y-20">
          {departments.map((dept, deptIndex) => (
            <div key={dept.id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + deptIndex * 0.2 }}
                className="flex items-center gap-3 mb-8 px-4"
              >
                <dept.icon className="w-6 h-6 text-garage-blue" />
                <h3 className="text-2xl font-bold text-white">{dept.title}</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {dept.members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 + deptIndex * 0.2 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-garage-card border border-white/5 p-6 w-40 md:w-48 text-center group cursor-pointer rounded-2xl hover:border-garage-green/30 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] transition-all duration-300"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-br from-garage-green to-garage-blue mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-shadow duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-garage-black relative flex items-center justify-center">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-garage-green transition-colors duration-300">
                            {getInitials(member.name)}
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight min-h-[2.5em] flex items-center justify-center">
                      {member.name}
                    </h4>
                    <p className="text-xs text-garage-green/80 font-medium">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Team Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 text-center"
        >
          <blockquote className="text-xl md:text-3xl text-white/90 font-light italic relative inline-block">
            <span className="absolute -top-4 -left-6 text-6xl text-garage-green/20">"</span>
            Маленькая команда — большие результаты
            <span className="absolute -bottom-8 -right-6 text-6xl text-garage-blue/20">"</span>
          </blockquote>
          <p className="text-gray-500 mt-4 uppercase tracking-widest text-sm">
            Small Team — Big Results
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default Team;