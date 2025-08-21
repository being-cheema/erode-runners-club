import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ThemeSettings } from './ThemeSettings';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  ExternalLink, 
  LogOut,
  Edit,
  Link,
  Unlink,
  Smartphone,
  Mail
} from 'lucide-react';
import type { Screen } from '../App';

interface SettingsProps {
  onNavigate: (screen: Screen) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    raceReminders: true,
    blogUpdates: true,
    leaderboardChanges: false,
    trainingReminders: true,
    socialUpdates: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    statsVisible: true,
    activityVisible: false
  });

  const [isStravaConnected, setIsStravaConnected] = useState(true);

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleStravaToggle = () => {
    setIsStravaConnected(!isStravaConnected);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('profile')}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium">Settings</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Theme Settings */}
        <ThemeSettings />

        {/* Profile Settings */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="flex space-x-2">
                <Input 
                  id="fullName" 
                  defaultValue="Arun Kumar"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex space-x-2">
                <Input 
                  id="email" 
                  type="email"
                  defaultValue="arun.kumar@email.com"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <div className="flex space-x-2">
                <Input 
                  id="bio" 
                  defaultValue="Passionate runner from Erode"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2">
                <Input 
                  id="location" 
                  defaultValue="Erode, Tamil Nadu"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strava Integration */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Strava Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Connect to Strava</h3>
                <p className="text-sm text-muted-foreground">
                  Sync your running data automatically
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {isStravaConnected ? (
                  <>
                    <div className="text-xs bg-muted px-2 py-1 rounded">Connected</div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleStravaToggle}
                    >
                      <Unlink className="w-4 h-4 mr-1" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm"
                    onClick={handleStravaToggle}
                  >
                    <Link className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Race Reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified about upcoming races
                </p>
              </div>
              <Switch 
                checked={notifications.raceReminders}
                onCheckedChange={(value) => handleNotificationChange('raceReminders', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Blog Updates</h3>
                <p className="text-sm text-muted-foreground">
                  New articles and training tips
                </p>
              </div>
              <Switch 
                checked={notifications.blogUpdates}
                onCheckedChange={(value) => handleNotificationChange('blogUpdates', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Leaderboard Changes</h3>
                <p className="text-sm text-muted-foreground">
                  When your rank changes
                </p>
              </div>
              <Switch 
                checked={notifications.leaderboardChanges}
                onCheckedChange={(value) => handleNotificationChange('leaderboardChanges', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Training Reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Workout and rest day reminders
                </p>
              </div>
              <Switch 
                checked={notifications.trainingReminders}
                onCheckedChange={(value) => handleNotificationChange('trainingReminders', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Social Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Comments and community activity
                </p>
              </div>
              <Switch 
                checked={notifications.socialUpdates}
                onCheckedChange={(value) => handleNotificationChange('socialUpdates', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Public Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your profile
                </p>
              </div>
              <Switch 
                checked={privacy.profileVisible}
                onCheckedChange={(value) => handlePrivacyChange('profileVisible', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Show Statistics</h3>
                <p className="text-sm text-muted-foreground">
                  Display your running stats publicly
                </p>
              </div>
              <Switch 
                checked={privacy.statsVisible}
                onCheckedChange={(value) => handlePrivacyChange('statsVisible', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Activity Feed</h3>
                <p className="text-sm text-muted-foreground">
                  Show your recent activities
                </p>
              </div>
              <Switch 
                checked={privacy.activityVisible}
                onCheckedChange={(value) => handlePrivacyChange('activityVisible', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card className="border border-border">
          <CardContent className="p-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Smartphone className="w-5 h-5 mr-3" />
              App Version 1.0.0
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Mail className="w-5 h-5 mr-3" />
              Contact Support
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              Terms of Service
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              Privacy Policy
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border border-border">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => onNavigate('login')}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}