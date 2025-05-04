# 🧠 Content Management Backend

This is the backend service for the Content Management System, built using **NestJS**, **MongoDB**, and **Redis**. It provides APIs for content CRUD operations, authentication, file uploads to S3, and real-time communication using WebSockets.

---

## 🚀 Features

- JWT-based authentication with access/refresh tokens
- RESTful API for managing contents, users, and roles
- Upload and retrieve media files via S3-compatible storage
- Real-time updates via WebSocket (Gateway)
- Redis integration for caching or token blacklist

---

## 🧩 Technologies Used

- **NestJS** – Node.js framework for scalable server-side apps
- **MongoDB** – NoSQL database for storing contents & users
- **Redis** – In-memory store for caching and sessions
- **AWS S3 (or compatible)** – For file storage
- **Mongoose** – ODM for MongoDB
- **Jest** – Unit testing

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/huy37204/ContentManagementBackend.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
MONGODB_URI=mongodb://localhost:27017/content-management
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
REDIS_HOST=localhost
REDIS_PORT=6379
AWS_REGION=your-region-bucket
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
REDIS_URL=redis://localhost:6379
```

### 4. Run seed

```bash
npm run seed
```

## 👤 Sample Accounts (Seeded Users)

The following accounts are available after running the seeder:

### 🔧 Admins

| Email              | Password |
| ------------------ | -------- |
| admin@example.com  | admin123 |
| admin1@example.com | admin123 |
| admin2@example.com | admin123 |

### 📝 Editors

| Email              | Password  |
| ------------------ | --------- |
| editor@example.com | editor123 |

### 👥 Clients

| Email              | Password  |
| ------------------ | --------- |
| client@example.com | client123 |

### 6. Run redis

If you don't have redis, download through https://github.com/microsoftarchive/redis/releases<br>
If you already have, please run <b>redis_server.exe</b>

## 🧪 Running Tests

```bash
npm run test
```

## 🚴 Running the App Locally

### Development mode:

```bash
npm run start:dev
```

### Production mode:

```bash
npm run build
npm run start:prod
```

## 📁 Folder Structure

```bash
src/
├── auth/
├── users/
├── contents/
├── common/
├── main.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
├── app.controller.spec.ts
└── main.ts
```

## 📹 Video Demo

Watch the demo video here:  
▶️ [Click to watch on YouTube](https://www.youtube.com/watch?v=2qURYZtp5g8)

## 👨‍💻 Maintainer

Tran Nhat Huy

Email: huy37204@gmail.com
