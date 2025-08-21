import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Activity, Target, Trophy } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    {
      title: "Welcome to Erode Runners Club",
      subtitle: "Run Together. Achieve More.",
      description: "Join our community of passionate runners and start your fitness journey.",
      icon: <Activity className="w-12 h-12" />
    },
    {
      title: "Track Your Progress",
      subtitle: "Every Step Counts",
      description: "Monitor your running stats and watch your progress with detailed analytics.",
      icon: <Target className="w-12 h-12" />
    },
    {
      title: "Compete & Win",
      subtitle: "Challenge Yourself",
      description: "Participate in races, climb leaderboards, and earn achievements.",
      icon: <Trophy className="w-12 h-12" />
    }
  ];

  const currentScreenData = screens[currentStep];

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl bg-muted">
              {currentScreenData.icon}
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-medium">
              {currentScreenData.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {currentScreenData.subtitle}
            </p>
            
            <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {currentScreenData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pb-12 px-8 space-y-8">
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-primary w-8' 
                  : 'bg-border w-1'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleNext}
          className="w-full h-12"
        >
          {currentStep === screens.length - 1 ? 'Get Started' : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}