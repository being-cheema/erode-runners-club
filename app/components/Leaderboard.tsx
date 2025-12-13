import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Trophy, Medal, Award, Crown, Zap, Target } from 'lucide-react';
import leaderboardData from '../data/leaderboard.json';

interface Runner {
  id: string;
  name: string;
  distance: number;
  pace: string;
  avatar?: string;
  rank: number;
  rankChange: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  criteria: string;
  prize: string;
  winner?: { userId: string; name: string };
  status?: string;
}

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'alltime' | 'challenges'>('monthly');

  const monthlyRunners: Runner[] = leaderboardData.monthlyLeaderboard as Runner[];
  const allTimeRunners: Runner[] = leaderboardData.allTimeLeaderboard as Runner[];
  const challenges: Challenge[] = leaderboardData.challenges as Challenge[];

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
                {runner.rankChange > 0 && (
                  <div className="text-xs text-muted-foreground">↑ +{runner.rankChange}</div>
                )}
                {runner.rankChange < 0 && (
                  <div className="text-xs text-muted-foreground">↓ {runner.rankChange}</div>
                )}
                {runner.rankChange === 0 && (
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
                          {challenge.status === 'completed' && (
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
                              <div className="font-medium">{challenge.winner.name}</div>
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