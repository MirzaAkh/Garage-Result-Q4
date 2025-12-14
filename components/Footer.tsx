import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Slack } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <Section className="text-center">
      <div className="relative py-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">Спасибо</span>
          </h2>
          <p className="text-2xl md:text-4xl text-white/80 mb-4">
            за внимание
          </p>
          <p className="text-xl text-gray-500 mb-12">
            Thank you for your attention
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-12">
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-garage-green to-garage-blue">
              Garage
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">Q4 2025</span>
          </div>

          {/* Slack Link Section */}
          <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <p className="text-xl text-gray-300 flex flex-wrap items-center justify-center gap-2">
              Приходите к нам в Slack
              <a 
                href="https://join.slack.com/share/enQtMTAxNDgyMTI5MjE0MjQtNDQxNDI1ODI3NDFhY2QwNjMxMzU2ZDlhNDQ0Njk4ODYyODNlMTk0ZTY2MTU4MmIwZDEzNmM0NjQyM2U5NDMwOQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-garage-green transition-colors font-bold underline decoration-garage-green/50 hover:decoration-garage-green underline-offset-4"
              >
                <Slack className="w-5 h-5" />
                #team-garage
              </a>
            </p>
          </div>
        </motion.div>

        {/* Animated line */}
        <motion.div
          className="mx-auto mt-16 h-[2px] bg-gradient-to-r from-transparent via-garage-green to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "200px" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </Section>
  );
};

export default Footer;