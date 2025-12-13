import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Activity, Timer, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { StaggeredList } from './AnimationProvider';
import statisticsData from '../data/statistics.json';
import {
  WeeklyProgressChart,
  MonthlyTargetChart,
  PaceDistributionChart,
  RunTypeChart,
  HeartRateZonesChart,
  PerformanceCorrelationChart,
} from './AdvancedCharts';

export function Statistics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'trends'>('overview');

  const currentMonthStats = statisticsData.currentMonthStats;
  const comparisonData = statisticsData.monthlyComparison;
  const recentAchievements = statisticsData.recentAchievements;
  const weeklyGoals = statisticsData.weeklyGoals;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <h1 className="text-xl font-medium">Statistics</h1>
      </div>

      <div className="px-6 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 mt-8">
            {/* Monthly Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="border border-border">
                <CardContent className="p-4 text-center">
                  <Activity className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-medium">{currentMonthStats.totalDistance}</div>
                  <div className="text-sm text-muted-foreground">Total Distance (km)</div>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-4 text-center">
                  <Timer className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-medium">{currentMonthStats.avgPace}</div>
                  <div className="text-sm text-muted-foreground">Average Pace</div>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-4 text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-medium">{currentMonthStats.totalRuns}</div>
                  <div className="text-sm text-muted-foreground">Total Runs</div>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-medium">{currentMonthStats.calories.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Calories Burned</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Monthly Comparison */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Month-over-Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData.map((item, index) => (
                    <motion.div
                      key={item.metric}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{item.metric}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.current}{item.unit}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          vs {item.previous}{item.unit}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <StaggeredList className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{achievement.value}</div>
                        <div className="text-sm text-green-600">{achievement.improvement}</div>
                      </div>
                    </div>
                  ))}
                </StaggeredList>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>This Week's Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{goal.goal}</span>
                        <span className="text-sm text-muted-foreground">
                          {goal.progress || goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                      {goal.progress && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6 mt-8">
            <WeeklyProgressChart />
            <MonthlyTargetChart />
            <div className="grid grid-cols-1 gap-6">
              <PaceDistributionChart />
              <RunTypeChart />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 mt-8">
            <HeartRateZonesChart />
            <PerformanceCorrelationChart />
            
            {/* Additional trend insights */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Pace Improvement</h4>
                  <p className="text-sm text-muted-foreground">
                    Your average pace has improved by 16 seconds over the last 3 months. 
                    Keep focusing on tempo runs to maintain this trend.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Consistency Score</h4>
                  <p className="text-sm text-muted-foreground">
                    You've maintained an 85% consistency rate this month. 
                    Try to aim for 3-4 runs per week to reach 90%.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Distance Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Your monthly distance has increased by 9.5% compared to last month. 
                    Great progress toward your goals!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}