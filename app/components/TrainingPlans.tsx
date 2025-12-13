import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Target, Clock, Activity, CheckCircle2, Calendar } from 'lucide-react';
import trainingData from '../data/trainingPlans.json';

interface TrainingPlan {
  id: string;
  name: string;
  raceType: string;
  level: string;
  duration: string;
  description: string;
  weeks: Week[];
}

interface Week {
  weekNumber: number;
  weekGoal?: string;
  totalDistance?: number;
  workouts: Workout[];
}

interface Workout {
  day: string;
  type: string;
  distance?: string;
  pace?: string;
  description: string;
  completed?: boolean;
}

export function TrainingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const trainingPlans: TrainingPlan[] = trainingData.trainingPlans;

  const getWorkoutIcon = (type: Workout['type']) => {
    switch (type) {
      case 'Run':
        return <Activity className="w-4 h-4 text-foreground" />;
      case 'Rest':
        return <div className="w-4 h-4 rounded-full bg-muted" />;
      case 'Cross-Train':
        return <Target className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  if (selectedPlan) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-6 py-8 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPlan(null)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Button>
          <h1 className="text-xl font-medium">{selectedPlan.name}</h1>
          <p className="text-muted-foreground mt-1">{selectedPlan.description}</p>
          <div className="flex items-center space-x-3 mt-4 text-sm">
            <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
              {selectedPlan.raceType}
            </div>
            <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
              {selectedPlan.level}
            </div>
            <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
              {selectedPlan.duration}
            </div>
          </div>
        </div>

        <div className="px-6 py-8 space-y-8">
          {/* Week Selector */}
          <div className="flex space-x-2 overflow-x-auto">
            {selectedPlan.weeks.map((week) => (
              <Button
                key={week.weekNumber}
                variant={selectedWeek === week.weekNumber ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedWeek(week.weekNumber)}
                className="whitespace-nowrap"
              >
                Week {week.weekNumber}
              </Button>
            ))}
          </div>

          {/* Weekly Schedule */}
          {selectedPlan.weeks
            .filter(week => week.weekNumber === selectedWeek)
            .map((week) => (
              <div key={week.weekNumber} className="space-y-4">
                <h2 className="font-medium">Week {week.weekNumber} Schedule</h2>
                {week.workouts.map((workout, index) => (
                  <Card key={index} className={`border border-border ${workout.completed ? 'bg-muted/50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {workout.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-foreground" />
                          ) : (
                            getWorkoutIcon(workout.type)
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{workout.day}</h3>
                            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {workout.type}
                            </div>
                          </div>
                          {workout.distance && (
                            <div className="text-sm text-muted-foreground mb-1">
                              {workout.distance} {workout.pace && `• ${workout.pace}`}
                            </div>
                          )}
                          <p className="text-sm">{workout.description}</p>
                          {!workout.completed && (
                            <Button size="sm" className="mt-3">
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}

          {/* Progress Overview */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Week {selectedWeek} Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-medium">
                    {selectedPlan.weeks.find(w => w.weekNumber === selectedWeek)?.workouts.filter(w => w.completed).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium">
                    {selectedPlan.weeks.find(w => w.weekNumber === selectedWeek)?.workouts.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Workouts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <h1 className="text-xl font-medium">Training Plans</h1>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Filters */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-8">
            {trainingPlans.map((plan) => (
              <Card key={plan.id} className="border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
                        {plan.raceType}
                      </div>
                      <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
                        {plan.level}
                      </div>
                      <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
                        {plan.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        {plan.weeks.length} weeks • {plan.weeks.reduce((total, week) => total + week.workouts.length, 0)} workouts
                      </div>
                      <Button 
                        onClick={() => setSelectedPlan(plan)}
                        size="sm"
                      >
                        Start Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {['beginner', 'intermediate', 'advanced'].map((levelFilter) => (
            <TabsContent key={levelFilter} value={levelFilter} className="space-y-4 mt-8">
              {trainingPlans.filter(plan => plan.level.toLowerCase() === levelFilter).map((plan) => (
                <Card key={plan.id} className="border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">{plan.name}</h3>
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
                          {plan.raceType}
                        </div>
                        <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
                          {plan.level}
                        </div>
                        <div className="bg-muted px-2 py-1 rounded text-muted-foreground">
                          {plan.duration}
                        </div>
                      </div>

                      <Button 
                        onClick={() => setSelectedPlan(plan)}
                        className="w-full"
                      >
                        Start Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}