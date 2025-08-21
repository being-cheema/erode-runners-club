import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AuthScreens } from './components/AuthScreens';
import { Dashboard } from './components/Dashboard';
import { RaceCalendar } from './components/RaceCalendar';
import { Statistics } from './components/Statistics';
import { Leaderboard } from './components/Leaderboard';
import { BlogsSection } from './components/BlogsSection';
import { TrainingPlans } from './components/TrainingPlans';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { BottomNavigation } from './components/BottomNavigation';
import { ThemeProvider } from './components/ThemeProvider';
import { PWAProvider } from './components/PWAProvider';
import { PageTransition } from './components/AnimationProvider';

export type Screen = 
  | 'onboarding' 
  | 'login' 
  | 'signup' 
  | 'forgot-password'
  | 'dashboard' 
  | 'races' 
  | 'stats' 
  | 'leaderboard' 
  | 'blogs'
  | 'training'
  | 'profile'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleCompleteOnboarding = () => {
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
      case 'login':
      case 'signup':
      case 'forgot-password':
        return <AuthScreens type={currentScreen} onAuth={handleAuth} onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} />;
      case 'races':
        return <RaceCalendar />;
      case 'stats':
        return <Statistics />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'blogs':
        return <BlogsSection />;
      case 'training':
        return <TrainingPlans />;
      case 'profile':
        return <Profile onNavigate={setCurrentScreen} />;
      case 'settings':
        return <Settings onNavigate={setCurrentScreen} />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = isAuthenticated && !['onboarding', 'login', 'signup', 'forgot-password', 'settings'].includes(currentScreen);

  return (
    <ThemeProvider>
      <PWAProvider>
        <div className="min-h-screen bg-background">
          <div className="max-w-md mx-auto bg-card min-h-screen relative">
            <main className={`${showBottomNav ? 'pb-20' : ''}`}>
              <PageTransition key={currentScreen}>
                {renderScreen()}
              </PageTransition>
            </main>
            {showBottomNav && (
              <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
            )}
          </div>
        </div>
      </PWAProvider>
    </ThemeProvider>
  );
}