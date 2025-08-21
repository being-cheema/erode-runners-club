import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { User, MapPin, Calendar, Activity, Trophy, Target, Settings, ExternalLink, Edit } from 'lucide-react';
import type { Screen } from '../App';

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const userProfile = {
    name: 'Arun Kumar',
    email: 'arun.kumar@email.com',
    bio: 'Passionate runner from Erode. Love early morning runs and challenging myself with new distances.',
    location: 'Erode, Tamil Nadu',
    joinDate: 'January 2024',
    stats: {
      totalDistance: 387.2,
      totalRuns: 89,
      racesCompleted: 12,
      personalBests: {
        fiveK: '24:32',
        tenK: '52:15',
        halfMarathon: '1:58:43'
      }
    },
    achievements: [
      { id: '1', name: 'First 5K', date: 'Jan 2024' },
      { id: '2', name: '100K Month', date: 'Mar 2024' },
      { id: '3', name: 'Speed Demon', date: 'May 2024' },
      { id: '4', name: 'Half Marathon', date: 'Jun 2024' },
      { id: '5', name: 'Consistency', date: 'Jul 2024' },
      { id: '6', name: 'Early Bird', date: 'Aug 2024' }
    ],
    stravaConnected: true
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Profile</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('settings')}
            className="p-2"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Profile Header */}
        <Card className="border border-border">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-muted text-foreground">
                  AK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="font-medium">{userProfile.name}</h2>
                  <Button variant="ghost" size="sm" className="p-1 -m-1">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{userProfile.bio}</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                  {userProfile.stravaConnected && (
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Connected to Strava</span>
                      <div className="text-xs bg-muted px-2 py-1 rounded">Verified</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-medium mb-1">{userProfile.stats.totalDistance}</div>
              <div className="text-sm text-muted-foreground">Total KM</div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-medium mb-1">{userProfile.stats.totalRuns}</div>
              <div className="text-sm text-muted-foreground">Total Runs</div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-medium mb-1">{userProfile.stats.racesCompleted}</div>
              <div className="text-sm text-muted-foreground">Races Done</div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-medium mb-1">#6</div>
              <div className="text-sm text-muted-foreground">Club Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Bests */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Personal Bests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">5K Run</div>
                  <div className="text-sm text-muted-foreground">Personal Record</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{userProfile.stats.personalBests.fiveK}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">10K Run</div>
                  <div className="text-sm text-muted-foreground">Personal Record</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{userProfile.stats.personalBests.tenK}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">Half Marathon</div>
                  <div className="text-sm text-muted-foreground">Personal Record</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{userProfile.stats.personalBests.halfMarathon}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Badges */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {userProfile.achievements.map((achievement) => (
                <div key={achievement.id} className="text-center">
                  <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-2">
                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onNavigate('stats')}
          >
            <Activity className="w-5 h-5 mr-3" />
            View Detailed Statistics
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onNavigate('training')}
          >
            <Target className="w-5 h-5 mr-3" />
            My Training Plans
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onNavigate('races')}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Upcoming Races
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-5 h-5 mr-3" />
            Account Settings
          </Button>
        </div>
      </div>
    </div>
  );
}