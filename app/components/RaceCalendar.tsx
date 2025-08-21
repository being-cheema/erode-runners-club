import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, MapPin, ArrowRight } from 'lucide-react';

interface Race {
  id: string;
  name: string;
  date: Date;
  time: string;
  distance: string;
  location: string;
  description: string;
  registered: number;
  maxParticipants: number;
}

export function RaceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const mockRaces: Race[] = [
    {
      id: '1',
      name: '5K Morning Challenge',
      date: new Date(2025, 7, 22),
      time: '06:00 AM',
      distance: '5K',
      location: 'Erode Sports Complex',
      description: 'Start your day with an energizing 5K run through the scenic routes of Erode.',
      registered: 45,
      maxParticipants: 100
    },
    {
      id: '2',
      name: 'Half Marathon Elite',
      date: new Date(2025, 7, 29),
      time: '05:30 AM',
      distance: '21K',
      location: 'Kaveri Riverfront',
      description: 'Challenge yourself with our signature half marathon along the beautiful Kaveri riverfront.',
      registered: 78,
      maxParticipants: 150
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getRaceForDay = (day: number) => {
    return mockRaces.find(race => 
      race.date.getDate() === day && 
      race.date.getMonth() === currentDate.getMonth() &&
      race.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const race = getRaceForDay(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() &&
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => race && setSelectedRace(race)}
          className={`aspect-square flex flex-col items-center justify-center text-sm relative rounded-lg transition-colors border ${
            isToday 
              ? 'bg-primary text-primary-foreground border-primary' 
              : race 
                ? 'border-border hover:bg-muted' 
                : 'border-transparent hover:bg-muted'
          }`}
        >
          <span>{day}</span>
          {race && !isToday && (
            <div className="absolute bottom-1 w-1 h-1 bg-foreground rounded-full"></div>
          )}
        </button>
      );
    }

    return days;
  };

  if (selectedRace) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-6 py-8 border-b border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRace(null)}
              className="p-2 -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-medium">Race Details</h1>
          </div>
        </div>

        <div className="px-6 py-8 space-y-8">
          <div>
            <h2 className="text-2xl font-medium mb-4">{selectedRace.name}</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{selectedRace.date.toLocaleDateString()} at {selectedRace.time}</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{selectedRace.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-medium">{selectedRace.distance}</div>
                <div className="text-sm text-muted-foreground">Distance</div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-medium">{selectedRace.registered}</div>
                <div className="text-sm text-muted-foreground">Registered</div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">About this race</h3>
            <p className="text-muted-foreground leading-relaxed">
              {selectedRace.description}
            </p>
          </div>

          <Button className="w-full h-12">
            Register Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-8 border-b border-border">
        <h1 className="text-xl font-medium">Races</h1>
      </div>

      <div className="px-6 py-8 space-y-8">
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-lg font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-medium mb-4">Upcoming Races</h2>
          <div className="space-y-3">
            {mockRaces.map(race => (
              <Card key={race.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{race.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {race.date.toLocaleDateString()} • {race.distance}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRace(race)}
                      className="p-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}