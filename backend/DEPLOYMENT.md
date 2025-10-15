# 🚀 Deployment Guide - Erode Runners Club Backend

## Option 1: Deploy with Docker Compose (Recommended)

### Prerequisites
- Server with Docker and Docker Compose installed
- Domain or ngrok URL for callback
- Open ports: 8000 (backend), 5432 (postgres - internal only)

### Steps

1. **Copy backend directory to your server**
```bash
scp -r backend/ user@your-server:/home/user/erode-runners-backend/
```

2. **SSH into your server**
```bash
ssh user@your-server
cd /home/user/erode-runners-backend
```

3. **Update .env file**
```bash
nano .env
# Update BACKEND_URL, FRONTEND_URL, and STRAVA_REDIRECT_URI with your domain
```

4. **Start the services**
```bash
docker-compose up -d
```

5. **Check logs**
```bash
docker-compose logs -f backend
```

6. **Verify it's running**
```bash
curl http://localhost:8000/api/health
```

### Accessing from Outside

If using ngrok:
```bash
ngrok http 8000
# Update BACKEND_URL in .env with the ngrok URL
# Update STRAVA_REDIRECT_URI to: https://your-ngrok-url.ngrok-free.dev/api/strava/callback
docker-compose restart backend
```

If using a domain:
- Point your domain to the server IP
- Set up nginx reverse proxy
- Enable SSL with Let's Encrypt

---

## Option 2: Deploy to Cloud Platforms

### Deploy to Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login and initialize**
```bash
railway login
railway init
```

3. **Add PostgreSQL**
```bash
railway add postgresql
```

4. **Deploy**
```bash
railway up
```

5. **Set environment variables** in Railway dashboard

### Deploy to Render

1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database
6. Configure environment variables

### Deploy to DigitalOcean App Platform

1. Create new app
2. Select backend directory
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

---

## Option 3: Manual Server Setup (Ubuntu/Debian)

### 1. Install Dependencies
```bash
sudo apt update
sudo apt install python3-pip python3-venv postgresql postgresql-contrib nginx
```

### 2. Set up PostgreSQL
```bash
sudo -u postgres psql

CREATE DATABASE eroderunnersclub;
CREATE USER eroderunnersclub WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE eroderunnersclub TO eroderunnersclub;
\q
```

### 3. Set up Python Environment
```bash
cd /opt
sudo mkdir erode-runners-backend
sudo chown $USER:$USER erode-runners-backend
cd erode-runners-backend

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Configure Environment
```bash
cp .env.example .env
nano .env
# Update DATABASE_URL with your PostgreSQL credentials
# Update other variables as needed
```

### 5. Create Systemd Service
```bash
sudo nano /etc/systemd/system/erode-runners.service
```

Add:
```ini
[Unit]
Description=Erode Runners Club Backend
After=network.target postgresql.service

[Service]
User=your-user
WorkingDirectory=/opt/erode-runners-backend
Environment="PATH=/opt/erode-runners-backend/venv/bin"
ExecStart=/opt/erode-runners-backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

### 6. Start Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable erode-runners
sudo systemctl start erode-runners
sudo systemctl status erode-runners
```

### 7. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/erode-runners
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/erode-runners /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. Enable SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔒 Security Checklist for Production

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Change `ADMIN_PASSWORD` to a strong password
- [ ] Change PostgreSQL password
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall (ufw)
- [ ] Enable rate limiting
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Configure backup for PostgreSQL
- [ ] Use environment variables (never commit secrets)
- [ ] Update `CORS` allowed origins to your frontend URL only

---

## 🧪 Testing the Deployment

### 1. Health Check
```bash
curl https://your-domain.com/api/health
```

### 2. Admin Login
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@eroderunnersclub.com",
    "password": "changeme123"
  }'
```

### 3. Create Test User
```bash
curl -X POST https://your-domain.com/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "test@example.com",
    "username": "testrunner",
    "password": "password123",
    "full_name": "Test Runner"
  }'
```

---

## 📊 Monitoring

### View Logs (Docker)
```bash
docker-compose logs -f backend
```

### View Logs (Systemd)
```bash
sudo journalctl -u erode-runners -f
```

### Database Connection
```bash
# Docker
docker exec -it erode_runners_postgres psql -U eroderunnersclub -d eroderunnersclub

# Manual
psql -U eroderunnersclub -d eroderunnersclub
```

---

## 🔄 Updates & Maintenance

### Update Code (Docker)
```bash
cd /path/to/backend
git pull  # or update files
docker-compose down
docker-compose up --build -d
```

### Update Code (Manual)
```bash
cd /opt/erode-runners-backend
git pull  # or update files
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart erode-runners
```

### Database Backup
```bash
# Docker
docker exec erode_runners_postgres pg_dump -U eroderunnersclub eroderunnersclub > backup.sql

# Manual
pg_dump -U eroderunnersclub eroderunnersclub > backup.sql
```

---

## 🆘 Troubleshooting

### Service Won't Start
```bash
# Check logs
docker-compose logs backend  # Docker
sudo journalctl -u erode-runners  # Manual

# Common issues:
# - Database not ready: wait a few seconds
# - Port already in use: check with netstat -tlnp
# - Permission issues: check file ownership
```

### Database Connection Failed
```bash
# Test connection
docker exec erode_runners_postgres pg_isready -U eroderunnersclub

# Check credentials in .env
# Ensure PostgreSQL is running
```

### Strava OAuth Not Working
- Verify STRAVA_REDIRECT_URI matches in Strava app settings
- Ensure it uses HTTPS in production
- Check Strava API settings at https://www.strava.com/settings/api

---

## 📞 Support

For deployment issues:
1. Check logs first
2. Verify all environment variables
3. Test database connection
4. Ensure ports are open
5. Check firewall settings

---

**Important**: Remember to update Strava API settings with your production callback URL!
