import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Monitor, Palette } from 'lucide-react';

export function ThemeSettings() {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const colorSchemeOptions = [
    { value: 'default' as const, label: 'Default', color: 'bg-foreground' },
    { value: 'blue' as const, label: 'Blue', color: 'bg-blue-500' },
    { value: 'green' as const, label: 'Green', color: 'bg-green-500' },
    { value: 'purple' as const, label: 'Purple', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme(option.value)}
                  className="flex flex-col items-center space-y-2 h-auto py-3"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{option.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Color Scheme</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {colorSchemeOptions.map((option) => (
              <Button
                key={option.value}
                variant={colorScheme === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setColorScheme(option.value)}
                className="flex items-center space-x-2 justify-start"
              >
                <div className={`w-4 h-4 rounded-full ${option.color}`} />
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}