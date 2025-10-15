# 🏃‍♂️ Erode Runners Club Backend

FastAPI backend with PostgreSQL, Strava OAuth integration, and automated daily data synchronization.

## 🚀 Features

- **JWT Authentication**: Secure email/password authentication
- **Admin Panel**: Admin-only user creation and management
- **Strava Integration**: OAuth2 flow for connecting Strava accounts
- **Automated Sync**: Daily sync at 11 PM IST for all connected users
- **RESTful API**: Complete API for activities, leaderboard, statistics, blog, and races
- **PostgreSQL Database**: Robust relational database with SQLAlchemy ORM
- **Docker Support**: Full containerization with docker-compose

## 📋 Prerequisites

- Docker & Docker Compose
- Strava API credentials (Client ID & Secret)

## 🛠️ Setup & Installation

### 1. Environment Configuration

The `.env` file is already configured with your Strava credentials:

```env
DATABASE_URL=postgresql://eroderunnersclub:securepassword@postgres:5432/eroderunnersclub

# JWT
SECRET_KEY=erode-runners-club-super-secret-key-2025-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Strava API
STRAVA_CLIENT_ID=168531
STRAVA_CLIENT_SECRET=ba9808f501510a97a4d6f2ff968cb7de7f3116bc
STRAVA_REDIRECT_URI=https://caustically-unmesmeric-catherine.ngrok-free.dev/api/strava/callback

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
ADMIN_EMAIL=admin@eroderunnersclub.com

# App
BACKEND_URL=https://caustically-unmesmeric-catherine.ngrok-free.dev
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### 2. Start the Application

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f backend
```

The backend will be available at: **http://localhost:8000**

### 3. Access API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Authentication Flow

### Admin Login
```bash
POST /api/auth/login
{
  "email": "admin@eroderunnersclub.com",
  "password": "changeme123"
}
```

Returns JWT token for authenticated requests.

### Create User (Admin Only)
```bash
POST /api/admin/users
Headers: Authorization: Bearer <admin_token>
{
  "email": "user@example.com",
  "username": "runner123",
  "password": "securepass",
  "full_name": "John Doe",
  "is_admin": false
}
```

## 🔗 Strava Integration

### 1. Connect Strava Account

```bash
# Get Strava OAuth URL
GET /api/strava/connect
Headers: Authorization: Bearer <user_token>

# Returns: { "auth_url": "https://www.strava.com/oauth/authorize?..." }
```

User opens the `auth_url` in browser, authorizes, and gets redirected to callback.

### 2. Link Account (After OAuth)

```bash
POST /api/strava/link
Headers: Authorization: Bearer <user_token>
{
  "code": "<authorization_code_from_callback>"
}
```

This will:
- Exchange code for access token
- Store Strava credentials
- Trigger initial activity sync (90 days)

### 3. Manual Sync

```bash
POST /api/strava/sync
Headers: Authorization: Bearer <user_token>
```

## ⏰ Automated Daily Sync

The system automatically syncs all connected users' data at **11 PM IST** every day.

- Runs via APScheduler
- Syncs activities from the last 7 days
- Updates leaderboard automatically
- Handles token refresh automatically

## 📊 API Endpoints

### Dashboard
```bash
GET /api/dashboard
# Returns: user stats, weekly/monthly distance, upcoming races, recent activities, rank
```

### Activities
```bash
GET /api/activities?page=1&page_size=20
GET /api/activities/recent?limit=5
```

### Leaderboard
```bash
GET /api/leaderboard?month=1&year=2025
# Returns ranked users by distance for the month
```

### Statistics
```bash
GET /api/statistics
GET /api/statistics/monthly
GET /api/statistics/weekly
```

### Blog (Admin Only for Create/Update/Delete)
```bash
GET /api/blog
GET /api/blog/{slug}
POST /api/blog
PUT /api/blog/{post_id}
DELETE /api/blog/{post_id}
```

### Races (Admin Only for Create/Update/Delete)
```bash
GET /api/races
GET /api/races/{race_id}
POST /api/races
PUT /api/races/{race_id}
DELETE /api/races/{race_id}
```

## 🗄️ Database Schema

### Users
- id, email, username, hashed_password
- strava_athlete_id, strava_access_token, strava_refresh_token
- profile_picture, bio
- is_admin, is_active

### Activities
- Strava activity data (distance, time, pace, elevation)
- Performance metrics (speed, heart rate, cadence)
- Location and map data

### Blog Posts
- title, slug, content, excerpt
- category, tags
- author, published status

### Races
- name, description, location, date
- distance, elevation, race_type
- registration details

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f postgres

# Rebuild
docker-compose up --build

# Access database
docker exec -it erode_runners_postgres psql -U eroderunnersclub -d eroderunnersclub

# Backend shell
docker exec -it erode_runners_backend bash
```

## 🔧 Development

### Local Development (Without Docker)

```bash
# Install dependencies
pip install -r requirements.txt

# Set up PostgreSQL locally and update .env

# Run migrations (if using Alembic)
alembic upgrade head

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | Required |
| SECRET_KEY | JWT secret key | Required |
| STRAVA_CLIENT_ID | Strava API Client ID | Required |
| STRAVA_CLIENT_SECRET | Strava API Secret | Required |
| STRAVA_REDIRECT_URI | OAuth callback URL | Required |
| ADMIN_EMAIL | Default admin email | Required |
| ADMIN_PASSWORD | Default admin password | Required |

## 🛡️ Security Notes

**⚠️ IMPORTANT FOR PRODUCTION:**

1. **Change SECRET_KEY**: Generate a secure random key
2. **Change ADMIN_PASSWORD**: Use a strong password
3. **Use HTTPS**: Enable SSL/TLS in production
4. **Database Password**: Change default PostgreSQL password
5. **Environment Variables**: Never commit real credentials to git

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart services
docker-compose restart
```

### Strava API Issues
- Verify Client ID and Secret
- Check redirect URI matches exactly
- Ensure rate limits aren't exceeded (200 requests/15 min)

### Scheduler Not Running
```bash
# Check backend logs
docker-compose logs backend | grep scheduler
```

## 📚 Tech Stack

- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: ORM
- **Pydantic**: Data validation
- **JWT**: Authentication
- **APScheduler**: Task scheduling
- **httpx**: Async HTTP client
- **Docker**: Containerization

## 🤝 Integration with Frontend

The frontend should:
1. Store JWT token after login
2. Include token in all authenticated requests: `Authorization: Bearer <token>`
3. Handle Strava OAuth flow
4. Poll or refresh data periodically

## 📞 Support

For issues or questions:
- Check logs: `docker-compose logs`
- Review API docs: http://localhost:8000/docs
- Verify environment variables in `.env`

---

Built with ❤️ for Erode Runners Club
