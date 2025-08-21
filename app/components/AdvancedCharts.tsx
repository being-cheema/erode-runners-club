import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
} from 'recharts';
import { motion } from 'motion/react';

// Weekly progress data
const weeklyData = [
  { week: 'W1', distance: 18.5, pace: 6.2, runs: 3, calories: 1250 },
  { week: 'W2', distance: 22.3, pace: 5.8, runs: 4, calories: 1580 },
  { week: 'W3', distance: 28.1, pace: 5.5, runs: 5, calories: 1890 },
  { week: 'W4', distance: 31.7, pace: 5.3, runs: 5, calories: 2100 },
  { week: 'W5', distance: 35.2, pace: 5.1, runs: 6, calories: 2380 },
  { week: 'W6', distance: 29.8, pace: 5.4, runs: 4, calories: 1950 },
];

// Monthly distance breakdown
const monthlyDistanceData = [
  { month: 'Jan', distance: 85.2, target: 100 },
  { month: 'Feb', distance: 92.8, target: 100 },
  { month: 'Mar', distance: 118.5, target: 120 },
  { month: 'Apr', distance: 134.2, target: 130 },
  { month: 'May', distance: 147.8, target: 150 },
  { month: 'Jun', distance: 156.3, target: 160 },
];

// Pace distribution
const paceData = [
  { pace: '4:30-5:00', runs: 8, color: '#22c55e' },
  { pace: '5:00-5:30', runs: 25, color: '#3b82f6' },
  { pace: '5:30-6:00', runs: 32, color: '#f59e0b' },
  { pace: '6:00-6:30', runs: 18, color: '#ef4444' },
  { pace: '6:30+', runs: 6, color: '#6b7280' },
];

// Running type distribution
const runTypeData = [
  { name: 'Easy Runs', value: 65, color: '#3b82f6' },
  { name: 'Tempo', value: 20, color: '#f59e0b' },
  { name: 'Intervals', value: 10, color: '#ef4444' },
  { name: 'Long Runs', value: 5, color: '#22c55e' },
];

// Heart rate zones
const heartRateData = [
  { zone: 'Zone 1', percentage: 15, color: '#6b7280' },
  { zone: 'Zone 2', percentage: 45, color: '#3b82f6' },
  { zone: 'Zone 3', percentage: 25, color: '#f59e0b' },
  { zone: 'Zone 4', percentage: 12, color: '#ef4444' },
  { zone: 'Zone 5', percentage: 3, color: '#dc2626' },
];

// Performance correlation data
const correlationData = [
  { distance: 5, pace: 5.2, elevation: 50 },
  { distance: 8, pace: 5.5, elevation: 120 },
  { distance: 10, pace: 5.3, elevation: 80 },
  { distance: 15, pace: 5.8, elevation: 200 },
  { distance: 21, pace: 6.1, elevation: 350 },
  { distance: 25, pace: 6.3, elevation: 280 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'pace' ? ' min/km' : entry.dataKey === 'distance' ? ' km' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function WeeklyProgressChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="distance" 
                stroke="var(--primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function MonthlyTargetChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Monthly Distance vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyDistanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="target" fill="var(--muted)" opacity={0.5} />
              <Bar dataKey="distance" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PaceDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Pace Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={paceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis type="category" dataKey="pace" stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="runs" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RunTypeChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Training Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={runTypeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {runTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {runTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function HeartRateZonesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Heart Rate Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="20%" 
              outerRadius="80%" 
              data={heartRateData}
            >
              <RadialBar dataKey="percentage" cornerRadius={4} fill="var(--primary)" />
              <Tooltip content={<CustomTooltip />} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {heartRateData.map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-4 h-4 rounded mx-auto mb-1" 
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-xs text-muted-foreground">{item.zone}</div>
                <div className="text-sm font-medium">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PerformanceCorrelationChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Distance vs Pace Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="distance" 
                stroke="var(--muted-foreground)" 
                fontSize={12}
                label={{ value: 'Distance (km)', position: 'bottom' }}
              />
              <YAxis 
                dataKey="pace" 
                stroke="var(--muted-foreground)" 
                fontSize={12}
                label={{ value: 'Pace (min/km)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter dataKey="pace" fill="var(--primary)" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}