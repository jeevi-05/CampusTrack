# CampusTrack — Railway Docker Deployment Guide

## Final Folder Structure After All Changes

```
CampusTrack/
├── LostFoundProject/
│   └── lostFoundApplication/
│       ├── Dockerfile                          ✅ NEW
│       ├── .dockerignore                       ✅ NEW
│       └── src/main/
│           ├── resources/
│           │   └── application.properties      ✅ UPDATED
│           └── java/.../config/
│               └── SystemConfig.java           ✅ UPDATED (CORS fix)
└── lostfound-frontend/
    ├── Dockerfile                              ✅ NEW
    ├── .dockerignore                           ✅ NEW
    ├── nginx.conf                              ✅ NEW
    ├── package.json                            ✅ UPDATED (start script)
    └── src/Services/
        ├── axiosConfig.js                      ✅ NEW
        ├── LoginService.jsx                    ✅ UPDATED
        ├── LostItemService.jsx                 ✅ UPDATED
        ├── FoundItemService.jsx                ✅ UPDATED
        └── MatchItemService.jsx                ✅ UPDATED
```

---

## PHASE 1 — Push Code to GitHub

### 1. Initialize Git (if not already done)
```bash
cd C:\LostApplication\CampusTrack
git init
git remote add origin https://github.com/YOUR_USERNAME/campustrack.git
```

### 2. Commit and Push
```bash
git add .
git commit -m "feat: add Docker deployment config for Railway"
git branch -M main
git push -u origin main
```

---

## PHASE 2 — Railway Setup

### Step 1 — Create Railway Account
Go to https://railway.app and sign up with GitHub.

### Step 2 — Add MySQL Database
1. Click "New Project"
2. Click "Add a Service" → "Database" → "MySQL"
3. Wait for it to provision
4. Click the MySQL service → "Variables" tab
5. Copy these values (you'll need them):
   - MYSQL_URL  (looks like: mysql://user:pass@host:port/railway)
   - MYSQLDATABASE
   - MYSQLHOST
   - MYSQLPASSWORD
   - MYSQLPORT
   - MYSQLUSER

---

## PHASE 3 — Deploy Backend on Railway

### Step 1 — Create Backend Service
1. In your Railway project → "New Service" → "GitHub Repo"
2. Select your repo
3. Railway will ask "which folder?" → set Root Directory to:
   ```
   LostFoundProject/lostFoundApplication
   ```
4. Railway auto-detects the Dockerfile ✅

### Step 2 — Set Backend Environment Variables
Go to your backend service → "Variables" tab → Add these:

```
DB_URL         = jdbc:mysql://MYSQLHOST:MYSQLPORT/MYSQLDATABASE?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME    = MYSQLUSER (from Railway MySQL)
DB_PASSWORD    = MYSQLPASSWORD (from Railway MySQL)
JWT_SECRET     = myVeryLongSecretKeyThatIsAtLeast64CharactersLongForHS512AlgorithmAndMustBeSecure123456789
JWT_EXPIRATION = 86400000
FRONTEND_URL   = https://YOUR-FRONTEND-URL.railway.app  (fill after frontend deploys)
PORT           = 8080
```

> Replace MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD
> with the actual values from your Railway MySQL service.

### Step 3 — Deploy
Click "Deploy" — Railway builds the Docker image and starts the container.
After deploy, copy the backend URL (e.g., https://campustrack-backend.railway.app)

---

## PHASE 4 — Deploy Frontend on Railway

### Step 1 — Create Frontend Service
1. In same Railway project → "New Service" → "GitHub Repo"
2. Select same repo
3. Set Root Directory to:
   ```
   lostfound-frontend
   ```
4. Railway auto-detects the Dockerfile ✅

### Step 2 — Set Frontend Environment Variables
Go to frontend service → "Variables" tab → Add:

```
REACT_APP_API_URL = https://YOUR-BACKEND-URL.railway.app
```

> This is the backend Railway URL from Phase 3 Step 3.

### Step 3 — Set Docker Build Argument
In Railway frontend service → "Settings" → "Build" section:
Add build argument:
```
REACT_APP_API_URL = https://YOUR-BACKEND-URL.railway.app
```

### Step 4 — Deploy
Click "Deploy" — Railway builds the React app with the correct backend URL baked in.

---

## PHASE 5 — Connect Frontend ↔ Backend (CORS Fix)

After both services are deployed:

1. Go to your **Backend** service on Railway
2. Variables tab → Update:
   ```
   FRONTEND_URL = https://YOUR-FRONTEND-URL.railway.app
   ```
3. Redeploy the backend (Railway auto-redeploys on variable change)

This tells Spring Security's CORS config to allow requests from your frontend domain.

---

## PHASE 6 — Verify Deployment

Test these URLs in your browser:

```
# Backend health check
https://YOUR-BACKEND.railway.app/lostfound/login  → should return user data or 401

# Frontend
https://YOUR-FRONTEND.railway.app  → should show Login page
```

---

## DB_URL Format Reference

Railway MySQL URL format for Spring Boot:
```
jdbc:mysql://MYSQLHOST:MYSQLPORT/MYSQLDATABASE?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

Example:
```
jdbc:mysql://containers-us-west-1.railway.app:6543/railway?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Backend fails to start | Check DB_URL format — must include `?useSSL=false&allowPublicKeyRetrieval=true` |
| CORS error in browser | Make sure FRONTEND_URL in backend matches exact frontend Railway URL (no trailing slash) |
| WebSocket not connecting | Railway supports WebSocket — ensure backend URL uses `https://` not `http://` |
| React shows blank page | Check REACT_APP_API_URL is set as both env var AND build arg in Railway |
| 401 on all requests | Session cookies work cross-domain only if both services are on same domain or you switch to JWT tokens in headers |

---

## Cookie / Session Note

Your app uses Spring Session (JSESSIONID cookie) with `withCredentials: true`.
On Railway, frontend and backend are on **different domains**, so cookies won't work cross-domain by default.

**Quick fix** — In Railway, set a custom domain for both services under the same parent domain:
- backend.campustrack.com
- app.campustrack.com

Or use Railway's built-in domain and configure `SameSite=None; Secure` on the session cookie.

Add this to application.properties:
```properties
server.servlet.session.cookie.same-site=none
server.servlet.session.cookie.secure=true
```
