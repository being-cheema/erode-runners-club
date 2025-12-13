# API Data Structure Guide

This folder contains all the JSON data structures that represent the frontend's data models. Use these as reference to design your backend API responses.

## 📁 Files Overview

### 1. **users.json** - User Management
- Current logged-in user profile and stats
- Community user listings
- User identification and basic info

**Key Endpoints:**
- `GET /api/user/profile` - Current user details
- `GET /api/users` - List all community users
- `GET /api/users/{userId}` - Specific user profile

---

### 2. **leaderboard.json** - Rankings & Challenges
Contains three sections:

#### Monthly Leaderboard
- `monthlyLeaderboard` - Current month rankings
- Fields: rank, distance, pace, rank changes

#### All-Time Leaderboard
- `allTimeLeaderboard` - Lifetime rankings
- Fields: total distance, total runs, all-time pace

#### Challenges
- `challenges` - Community challenges/competitions
- Status: completed, ongoing
- Prize tracking and winners

**Key Endpoints:**
- `GET /api/leaderboard/monthly` - Monthly rankings
- `GET /api/leaderboard/alltime` - All-time rankings
- `GET /api/leaderboard/challenges` - All challenges
- `GET /api/leaderboard/challenges/{id}` - Specific challenge

---

### 3. **races.json** - Race Management
Organized into:

#### Upcoming Races
- Race details: name, date, time, location
- Registration status and capacity
- Entry fees and deadlines
- Course maps and organizer info

#### Past Races
- Results and completion rates
- Participation numbers
- Average finish times

**Key Endpoints:**
- `GET /api/races` - All races
- `GET /api/races?status=upcoming` - Only upcoming
- `GET /api/races?status=past` - Only past
- `GET /api/races/{raceId}` - Specific race details
- `POST /api/races/{raceId}/register` - Register for race
- `GET /api/races/{raceId}/results` - Race results

---

### 4. **statistics.json** - Performance Metrics
Contains monthly stats tracking:

- `currentMonthStats` - Key metrics (distance, pace, runs, calories)
- `monthlyComparison` - Month-over-month trends
- `recentAchievements` - Recent PRs and milestones
- `weeklyGoals` - User's weekly targets and progress
- `weeklyRunData` - Weekly aggregated stats

**Key Endpoints:**
- `GET /api/statistics/monthly` - Current month stats
- `GET /api/statistics/monthly/{month}` - Specific month
- `GET /api/statistics/weekly` - Weekly breakdown
- `GET /api/statistics/trends` - Historical trends
- `GET /api/statistics/achievements` - All achievements
- `GET /api/statistics/goals` - User's goals and progress

---

### 5. **blogs.json** - Blog & Articles
Blog post management:

- Post metadata: title, excerpt, content
- Author information
- Publish dates and read time
- Categories: Training, Nutrition, Gear, Race Recap
- Engagement metrics: likes, views

**Key Endpoints:**
- `GET /api/blogs` - All blog posts
- `GET /api/blogs?category=Training` - Posts by category
- `GET /api/blogs/{postId}` - Single blog post
- `GET /api/blogs/{postId}/comments` - Blog comments
- `POST /api/blogs/{postId}/like` - Like a post
- `POST /api/blogs` - Create new post (admin)

---

### 6. **trainingPlans.json** - Training Programs
Structured training plans:

- Plan metadata: name, level, duration, target
- Week-by-week breakdown
- Daily workouts with:
  - Type: Run, Rest, Cross-Train
  - Distance and pace
  - Duration and intensity
  - Completion status

**Key Endpoints:**
- `GET /api/training-plans` - All available plans
- `GET /api/training-plans/{planId}` - Single plan
- `GET /api/training-plans/{planId}/weeks/{weekNum}` - Specific week
- `POST /api/training-plans/{planId}/start` - Enroll in plan
- `PUT /api/training-plans/{planId}/workouts/{workoutId}/complete` - Mark complete
- `GET /api/training-plans/my-plans` - User's enrolled plans

---

### 7. **dashboard.json** - Dashboard Data
Aggregated homepage data:

- `nextEvent` - Upcoming race/event
- `monthlyProgress` - Distance goal progress
- `userStats` - Quick stats (rank, runs, consistency)
- `recentActivity` - Last 3 activities
- `topCommunityMembers` - Top 3 leaderboard members
- `latestBlog` - Recent blog post
- `quickActions` - Navigation shortcuts

**Key Endpoints:**
- `GET /api/dashboard` - Complete dashboard data
- `GET /api/dashboard/summary` - Quick summary
- `GET /api/dashboard/activity` - Recent activities

---

### 8. **activities.json** - Run Logging
Detailed activity/run data:

- Activity metadata: date, type, name
- Performance metrics: distance, pace, duration
- Heart rate data: avg, max
- Environmental data: weather, route
- Engagement: notes, completion status

**Key Endpoints:**
- `GET /api/activities` - User's all activities
- `GET /api/activities?type=run` - Filter by type
- `GET /api/activities/{activityId}` - Single activity
- `POST /api/activities` - Log new activity
- `PUT /api/activities/{activityId}` - Edit activity
- `DELETE /api/activities/{activityId}` - Delete activity
- `GET /api/activities/stats` - Activity aggregated stats

---

## 🔑 Common Fields & Patterns

### Date/Time Formats
```json
{
  "date": "2025-08-14",           // ISO 8601 date
  "time": "06:00 AM",              // HH:MM AM/PM format
  "publishDate": "2025-08-12",      // For blogs
  "duration": 3090,                 // Seconds (for calculations)
  "durationFormatted": "51:30"      // HH:MM display format
}
```

### Distance Units
```json
{
  "distance": 8.5,
  "unit": "km",
  "distanceUnit": "km"  // Can also be "miles"
}
```

### Pace Format
```json
{
  "pace": "6:05",        // MM:SS per km
  "paceUnit": "/km"      // or "/mile"
}
```

### User Reference
```json
{
  "userId": "user_001",
  "name": "Arun Kumar",
  "avatar": "AK"  // Initials
}
```

### Status Values
- Activities: `completed`, `in-progress`, `abandoned`
- Races: `registration_open`, `registration_closed`, `ongoing`, `completed`
- Blog: `published`, `draft`, `archived`
- Challenges: `ongoing`, `completed`
- Training Plans: `not_started`, `in_progress`, `completed`

---

## 🔄 API Response Pattern (Suggested)

```typescript
// Success Response
{
  "success": true,
  "data": { /* actual data */ },
  "meta": {
    "timestamp": "2025-08-14T10:30:00Z",
    "version": "1.0"
  }
}

// Paginated Response
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 156,
    "totalPages": 8
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": { /* specific field errors */ }
  }
}
```

---

## 🔐 Authentication

Suggested endpoints:
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password recovery

---

## 📊 Query Parameters

Suggested filter/search patterns:
```
GET /api/blogs?category=Training&page=1&limit=10&sort=-publishDate
GET /api/races?status=upcoming&date_from=2025-08-01&date_to=2025-12-31
GET /api/activities?type=run&date_from=2025-08-01&user_id=user_001
GET /api/leaderboard/monthly?limit=100&offset=0&period=2025-08
```

---

## 🧪 Notes for Backend Implementation

1. **User Relationships**: Each activity, run, blog comment should link to a user ID
2. **Time Zones**: Store all dates in UTC, format for display in client
3. **Caching**: Consider caching leaderboards (update hourly/daily)
4. **Real-time Updates**: Leaderboard and activity feeds may need WebSocket for live updates
5. **File Uploads**: Blog images and user avatars may need file storage service
6. **Rate Limiting**: Implement for activity logging and API endpoints
7. **Data Validation**: Validate all running metrics (pace, distance, heart rate)

---

## 📝 Example Integration

```typescript
// Frontend usage example (pseudo-code)
const dashboard = await fetch('/api/dashboard').then(r => r.json());
// Returns data matching dashboard.json structure

const stats = await fetch('/api/statistics/monthly').then(r => r.json());
// Returns data matching statistics.json structure
```

---

**Questions?** Check the respective JSON file for exact field names, data types, and structure!
