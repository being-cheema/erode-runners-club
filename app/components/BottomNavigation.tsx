import React from 'react';
import { Button } from './ui/button';
import { Home, Calendar, BarChart3, Trophy, FileText, User } from 'lucide-react';
import { motion } from 'motion/react';
import type { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navigationItems = [
    { screen: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { screen: 'races' as Screen, icon: Calendar, label: 'Races' },
    { screen: 'stats' as Screen, icon: BarChart3, label: 'Stats' },
    { screen: 'leaderboard' as Screen, icon: Trophy, label: 'Ranking' },
    { screen: 'blogs' as Screen, icon: FileText, label: 'Blog' },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border"
    >
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            
            return (
              <motion.div
                key={item.screen}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(item.screen)}
                  className={`w-full flex flex-col items-center space-y-1 py-3 px-2 h-auto relative ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                      style={{ transform: 'translateX(-50%)' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}