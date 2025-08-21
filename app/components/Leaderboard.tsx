import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Trophy, Medal, Award, Crown, Zap, Target } from 'lucide-react';

interface Runner {
  id: string;
  name: string;
  distance: number;
  pace: string;
  avatar?: string;
  rank: number;
  change: number; // +1, -1, 0 for rank change
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  criteria: string;
  prize: string;
  winner?: string;
  completed?: boolean;
}

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'alltime' | 'challenges'>('monthly');

  const monthlyRunners: Runner[] = [
    { id: '1', name: 'Rajesh Kumar', distance: 156.2, pace: '5:12', rank: 1, change: 1 },
    { id: '2', name: 'Priya Sharma', distance: 142.8, pace: '5:28', rank: 2, change: -1 },
    { id: '3', name: 'Arjun Patel', distance: 138.5, pace: '5:35', rank: 3, change: 0 },
    { id: '4', name: 'Meera Singh', distance: 124.3, pace: '5:42', rank: 4, change: 2 },
    { id: '5', name: 'Kiran Reddy', distance: 118.7, pace: '5:48', rank: 5, change: -1 },
    { id: '6', name: 'Arun Gupta', distance: 112.4, pace: '5:55', rank: 6, change: 0 },
  ];

  const allTimeRunners: Runner[] = [
    { id: '1', name: 'Priya Sharma', distance: 2847.3, pace: '5:22', rank: 1, change: 0 },
    { id: '2', name: 'Rajesh Kumar', distance: 2654.8, pace: '5:18', rank: 2, change: 0 },
    { id: '3', name: 'Arjun Patel', distance: 2398.2, pace: '5:40', rank: 3, change: 1 },
    { id: '4', name: 'Kiran Reddy', distance: 2156.7, pace: '5:52', rank: 4, change: -1 },
    { id: '5', name: 'Meera Singh', distance: 1987.4, pace: '5:45', rank: 5, change: 0 },
    { id: '6', name: 'Arun Gupta', distance: 1743.6, pace: '6:01', rank: 6, change: 1 },
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Distance Champion',
      description: 'Complete 200km in a single month',
      criteria: '200km monthly distance',
      prize: 'Premium Running Gear',
      winner: 'Rajesh Kumar',
      completed: true
    },
    {
      id: '2',
      title: 'Speed Demon',
      description: 'Achieve sub-5:00 average pace for 10K',
      criteria: 'Sub-5:00 pace on 10K run',
      prize: 'Elite Racing Shoes',
      completed: false
    },
    {
      id: '3',
      title: 'Consistency King',
      description: 'Run every day for 30 consecutive days',
      criteria: '30-day running streak',
      prize: 'Smart Fitness Watch',
      completed: false
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Complete 20 morning runs (before 7 AM)',
      criteria: '20 morning runs',
      prize: 'Sunrise Runner Jersey',
      winner: 'Priya Sharma',
      completed: true
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderRunnersList = (runners: Runner[]) => (
    <div className="space-y-3">
      {runners.map((runner, index) => (
        <Card key={runner.id} className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12">
                {runner.rank === 1 && (
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center">
                    <span className="text-sm font-medium">1</span>
                  </div>
                )}
                {runner.rank === 2 && (
                  <div className="w-10 h-10 rounded-full bg-muted text-foreground flex items-center justify-center">
                    <span className="text-sm font-medium">2</span>
                  </div>
                )}
                {runner.rank === 3 && (
                  <div className="w-10 h-10 rounded-full bg-muted text-foreground flex items-center justify-center">
                    <span className="text-sm font-medium">3</span>
                  </div>
                )}
                {runner.rank > 3 && (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">{runner.rank}</span>
                  </div>
                )}
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted text-foreground text-sm">
                  {getInitials(runner.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="font-medium">{runner.name}</div>
                <div className="text-sm text-muted-foreground">
                  {runner.pace} avg pace
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium">{runner.distance} km</div>
                {runner.change > 0 && (
                  <div className="text-xs text-muted-foreground">↑ +{runner.change}</div>
                )}
                {runner.change < 0 && (
                  <div className="text-xs text-muted-foreground">↓ {runner.change}</div>
                )}
                {runner.change === 0 && (
                  <div className="text-xs text-muted-foreground">—</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <h1 className="text-xl font-medium">Leaderboard</h1>
      </div>

      <div className="px-6 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-8 mt-8">
            {/* Top 3 */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-end justify-center space-x-6">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <Avatar className="h-14 w-14 mx-auto mb-3">
                      <AvatarFallback className="bg-muted text-foreground">
                        {getInitials(monthlyRunners[1].name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{monthlyRunners[1].name.split(' ')[0]}</div>
                      <div className="text-xs text-muted-foreground">{monthlyRunners[1].distance} km</div>
                      <div className="w-8 h-8 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">2</span>
                      </div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3 ring-2 ring-foreground">
                      <AvatarFallback className="bg-foreground text-background">
                        {getInitials(monthlyRunners[0].name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium">{monthlyRunners[0].name.split(' ')[0]}</div>
                      <div className="text-sm text-muted-foreground">{monthlyRunners[0].distance} km</div>
                      <div className="w-10 h-10 mx-auto bg-foreground text-background rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">1</span>
                      </div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <Avatar className="h-14 w-14 mx-auto mb-3">
                      <AvatarFallback className="bg-muted text-foreground">
                        {getInitials(monthlyRunners[2].name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{monthlyRunners[2].name.split(' ')[0]}</div>
                      <div className="text-xs text-muted-foreground">{monthlyRunners[2].distance} km</div>
                      <div className="w-8 h-8 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Rankings */}
            <div>
              <h2 className="font-medium mb-4">Complete Rankings</h2>
              {renderRunnersList(monthlyRunners)}
            </div>
          </TabsContent>

          <TabsContent value="alltime" className="space-y-8 mt-8">
            <div>
              <h2 className="font-medium mb-4">All-Time Champions</h2>
              {renderRunnersList(allTimeRunners)}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-8 mt-8">
            <div>
              <h2 className="font-medium mb-4">Current Challenges</h2>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="border border-border">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{challenge.title}</h3>
                          {challenge.completed && (
                            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              Completed
                            </div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-sm">
                          {challenge.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <div className="text-muted-foreground">{challenge.criteria}</div>
                            <div className="font-medium">{challenge.prize}</div>
                          </div>
                          {challenge.winner && (
                            <div className="text-right">
                              <div className="text-muted-foreground">Won by</div>
                              <div className="font-medium">{challenge.winner}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}