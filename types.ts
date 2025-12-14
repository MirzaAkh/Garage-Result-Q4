import React from 'react';

export interface ChartDataPoint {
  date: string;
  value: number;
  annotation?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  growth?: string;
  description?: string;
}

export interface LaunchItem {
  title: string;
  icon: React.ReactNode;
  category: 'USER' | 'TECH';
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}