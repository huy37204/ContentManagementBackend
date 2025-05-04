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

## 📬 API Overview

These are the main API endpoints provided by the backend system:

### 🔐 Authentication

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/auth/login`  | Authenticate user       |
| POST   | `/auth/logout` | Logout user             |
| GET    | `/auth/me`     | Get logged-in user info |

### 📝 Contents

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/contents`             | Create new content          |
| GET    | `/contents`             | Get all contents            |
| GET    | `/contents/publish`     | Get all published contents  |
| GET    | `/contents/:id`         | Get content by ID           |
| GET    | `/contents/:id/publish` | Get published content by ID |
| PATCH  | `/contents/:id`         | Update content              |
| DELETE | `/contents/:id`         | Delete content              |

### 👤 Users

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Get all users     |
| GET    | `/users/:id` | Get user by ID    |
| PATCH  | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

## 3. Database Design

### 🧑 User Collection (MongoDB)

Each user document includes:

| Field       | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| `_id`       | ObjectId | Unique identifier                   |
| `email`     | String   | User's email                        |
| `name`      | String   | Full name                           |
| `password`  | String   | Hashed password                     |
| `role`      | String   | One of: `admin`, `editor`, `client` |
| `createdBy` | ObjectId | Reference to creator (Admin)        |
| `createdAt` | Date     | Timestamp of creation               |
| `updatedAt` | Date     | Last updated time                   |
| `updatedBy` | ObjectId | Reference to user who updated       |

---

### 📄 Content Collection

Each content document includes:

| Field       | Type         | Description                         |
| ----------- | ------------ | ----------------------------------- |
| `_id`       | ObjectId     | Unique identifier                   |
| `title`     | String       | Title of the content                |
| `blocks`    | Array<Block> | Content blocks (text, image, video) |
| `createdBy` | ObjectId     | User ID who created the content     |
| `createdAt` | Date         | Timestamp of creation               |
| `updatedAt` | Date         | Last updated time                   |
| `updatedBy` | ObjectId     | Reference to last editor            |

#### Content Block Schema:

````ts
type Block =
  | { type: "text"; _id: string; headings: string[]; paragraphs: string[] }
  | { type: "image"; _id: string; url: string } // S3
  | { type: "video"; _id: string; url: string }; // S3

## 🔄 Continuous Integration (CI)

This project uses **GitHub Actions** to automatically build and test the backend on every push to the `main` branch.

### 🛠 Workflow File: `.github/workflows/backend-ci.yml`

```yaml
name: Backend CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm run test
````

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
