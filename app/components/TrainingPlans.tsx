import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Target, Clock, Activity, CheckCircle2, Calendar } from 'lucide-react';

interface TrainingPlan {
  id: string;
  name: string;
  raceType: '5K' | '10K' | 'Half Marathon' | 'Marathon';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  weeks: Week[];
}

interface Week {
  week: number;
  workouts: Workout[];
}

interface Workout {
  day: string;
  type: 'Run' | 'Rest' | 'Cross-Train';
  distance?: string;
  pace?: string;
  description: string;
  completed?: boolean;
}

export function TrainingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const trainingPlans: TrainingPlan[] = [
    {
      id: '1',
      name: '5K for Beginners',
      raceType: '5K',
      level: 'Beginner',
      duration: '8 weeks',
      description: 'Perfect for first-time runners. Build up to running 5K continuously with walk-run intervals.',
      weeks: [
        {
          week: 1,
          workouts: [
            { day: 'Monday', type: 'Run', distance: '2 km', pace: 'Easy + Walk', description: 'Run 1 min, walk 2 min (repeat 6x)', completed: true },
            { day: 'Tuesday', type: 'Rest', description: 'Complete rest or gentle stretching' },
            { day: 'Wednesday', type: 'Run', distance: '2 km', pace: 'Easy + Walk', description: 'Run 1 min, walk 2 min (repeat 6x)' },
            { day: 'Thursday', type: 'Cross-Train', description: '20 min walking or cycling' },
            { day: 'Friday', type: 'Rest', description: 'Complete rest' },
            { day: 'Saturday', type: 'Run', distance: '2.5 km', pace: 'Easy + Walk', description: 'Run 1.5 min, walk 2 min (repeat 5x)' },
            { day: 'Sunday', type: 'Rest', description: 'Complete rest or gentle yoga' }
          ]
        },
        {
          week: 2,
          workouts: [
            { day: 'Monday', type: 'Run', distance: '2.5 km', pace: 'Easy + Walk', description: 'Run 2 min, walk 2 min (repeat 5x)' },
            { day: 'Tuesday', type: 'Rest', description: 'Complete rest or gentle stretching' },
            { day: 'Wednesday', type: 'Run', distance: '2.5 km', pace: 'Easy + Walk', description: 'Run 2 min, walk 2 min (repeat 5x)' },
            { day: 'Thursday', type: 'Cross-Train', description: '25 min walking or cycling' },
            { day: 'Friday', type: 'Rest', description: 'Complete rest' },
            { day: 'Saturday', type: 'Run', distance: '3 km', pace: 'Easy + Walk', description: 'Run 2.5 min, walk 1.5 min (repeat 5x)' },
            { day: 'Sunday', type: 'Rest', description: 'Complete rest or gentle yoga' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: '10K Intermediate',
      raceType: '10K',
      level: 'Intermediate',
      duration: '10 weeks',
      description: 'For runners who can comfortably run 5K. Build endurance and speed for a strong 10K finish.',
      weeks: [
        {
          week: 1,
          workouts: [
            { day: 'Monday', type: 'Run', distance: '4 km', pace: 'Easy', description: 'Easy conversational pace' },
            { day: 'Tuesday', type: 'Cross-Train', description: '30 min cycling or swimming' },
            { day: 'Wednesday', type: 'Run', distance: '3 km', pace: 'Tempo', description: '10 min warm-up, 10 min tempo, 10 min cool-down' },
            { day: 'Thursday', type: 'Rest', description: 'Complete rest or yoga' },
            { day: 'Friday', type: 'Run', distance: '3 km', pace: 'Easy', description: 'Easy recovery run' },
            { day: 'Saturday', type: 'Cross-Train', description: 'Strength training or yoga' },
            { day: 'Sunday', type: 'Run', distance: '6 km', pace: 'Long', description: 'Long slow distance run' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Half Marathon Advanced',
      raceType: 'Half Marathon',
      level: 'Advanced',
      duration: '12 weeks',
      description: 'For experienced runners targeting a sub-1:45 half marathon. Includes speed work and tempo runs.',
      weeks: [
        {
          week: 1,
          workouts: [
            { day: 'Monday', type: 'Run', distance: '8 km', pace: 'Easy', description: 'Easy base building run' },
            { day: 'Tuesday', type: 'Run', distance: '6 km', pace: 'Intervals', description: '6 x 800m at 5K pace, 400m recovery' },
            { day: 'Wednesday', type: 'Cross-Train', description: '45 min cycling or swimming' },
            { day: 'Thursday', type: 'Run', distance: '10 km', pace: 'Tempo', description: '3 km warm-up, 5 km tempo, 2 km cool-down' },
            { day: 'Friday', type: 'Rest', description: 'Complete rest or gentle yoga' },
            { day: 'Saturday', type: 'Run', distance: '5 km', pace: 'Easy', description: 'Easy shakeout run' },
            { day: 'Sunday', type: 'Run', distance: '16 km', pace: 'Long', description: 'Long run at conversational pace' }
          ]
        }
      ]
    }
  ];

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
                key={week.week}
                variant={selectedWeek === week.week ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedWeek(week.week)}
                className="whitespace-nowrap"
              >
                Week {week.week}
              </Button>
            ))}
          </div>

          {/* Weekly Schedule */}
          {selectedPlan.weeks
            .filter(week => week.week === selectedWeek)
            .map((week) => (
              <div key={week.week} className="space-y-4">
                <h2 className="font-medium">Week {week.week} Schedule</h2>
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
                    {selectedPlan.weeks.find(w => w.week === selectedWeek)?.workouts.filter(w => w.completed).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium">
                    {selectedPlan.weeks.find(w => w.week === selectedWeek)?.workouts.length || 0}
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