import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Activity, Trophy, BookOpen, Settings, ArrowRight } from 'lucide-react';
import type { Screen } from '../App';
import dashboardData from '../data/dashboard.json';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric'
  });

  const mockData = dashboardData.dashboardData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-3 pt-12 pb-6 border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">
                Good morning, Arun
              </h1>
              <span className="text-lg">🏃</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{currentDate}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('settings')}
            className="p-2 flex-shrink-0"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        
        {/* Next Race */}
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">{mockData.nextEvent.name}</h3>
                <p className="text-sm text-muted-foreground">Next race • {mockData.nextEvent.date}</p>
              </div>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="text-2xl font-medium mb-1">{mockData.monthlyProgress.currentDistance}</div>
              <div className="text-sm text-muted-foreground">km this month</div>
              <div className="text-xs text-muted-foreground mt-1">
                {mockData.monthlyProgress.targetDistance - mockData.monthlyProgress.currentDistance} km to goal
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="text-2xl font-medium mb-1">#{mockData.userStats.currentRank}</div>
              <div className="text-sm text-muted-foreground">club ranking</div>
              <div className="text-xs text-muted-foreground mt-1">
                this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Activity */}
        <div className="space-y-4">
          <h2 className="font-medium">Recent Activity</h2>
          
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Morning Run</h3>
                  <p className="text-sm text-muted-foreground">5.2 km • 28:36 • Today</p>
                </div>
                <Activity className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">{mockData.latestBlog.title}</h3>
                  <p className="text-sm text-muted-foreground">New blog post</p>
                </div>
                <BookOpen className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-between h-12"
            onClick={() => onNavigate('races')}
          >
            <span>View All Races</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline"
            className="w-full justify-between h-12"
            onClick={() => onNavigate('leaderboard')}
          >
            <span>Leaderboard</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button 
            variant="outline"
            className="w-full justify-between h-12"
            onClick={() => onNavigate('training')}
          >
            <span>Training Plans</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}