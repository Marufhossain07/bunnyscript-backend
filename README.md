# BunnyScript Social Media Assignment

## Tech Stack

Frontend
- Next.js
- TypeScript
- Redux Toolkit
- RTK Query

Backend
- Node.js
- Express
- Prisma
- PostgreSQL (Neon)

Authentication
- JWT
- HTTP-only Cookies

Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon

---

## Features

- User Registration
- Login & Logout
- Protected Routes
- Create/Edit/Delete Posts
- Public & Private Posts
- Image Upload (ImgBB)
- Like/Unlike Posts
- Comments
- Replies
- Like/Unlike Comments
- Like/Unlike Replies

---

## Architecture Decisions

- Used RTK Query for API communication and caching.
- Used Prisma ORM for database management.
- JWT stored in HTTP-only cookies for better security.
- PostgreSQL chosen for relational data.
- Images are stored on ImgBB while only URLs are stored in the database.

---

## Running Locally

Frontend

npm install
npm run dev

Backend

npm install
npx prisma generate
npx prisma migrate dev
npm run dev
