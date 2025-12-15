# StudyNotion – Full-Stack EdTech Platform

StudyNotion is a full-stack learning platform where students discover courses, watch lessons, and track progress while instructors create, price, and manage their content. This repo contains both the React frontend and the Node/Express backend so the product can ship as one cohesive system.

## Features
- Role-based auth (student/instructor) with JWT and protected routes
- Course management: create, edit, and organize sections and subsections
- Secure media handling via Cloudinary uploads
- Student experience: enroll, watch videos, track completion, and review courses
- Payments and receipts with Razorpay checkout and email notifications
- Dashboard views for progress, courses, and settings

## Tech Stack
- Frontend: React 18, React Router, Redux Toolkit, Tailwind CSS, Chart.js, Swiper
- Backend: Node.js, Express, MongoDB (Mongoose), Cloudinary, Razorpay, Nodemailer
- Tooling: concurrently for dual-run dev, Prettier, react-scripts build

## Project Structure
- `src/` – React app (routes, components, Redux slices, services)
- `server/` – Express API (routes, controllers, models, config)
- `public/` – static assets for the frontend

## Getting Started
Prereqs: Node 18+ and npm.

1) Install dependencies  
```bash
npm install
cd server && npm install
cd ..
```

2) Environment variables  
Create the following files:

- Frontend: `.env` at repo root  
```
REACT_APP_BASE_URL=http://localhost:4000/api/v1
RAZORPAY_KEY=your_razorpay_key
```

- Backend: `server/.env`  
```
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
FOLDER_NAME=studynotion
MAIL_HOST=your_smtp_host
MAIL_USER=your_smtp_user
MAIL_PASS=your_smtp_password
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

3) Run the stack  
- Start backend only: `cd server && npm run dev`  
- Start frontend only: `npm start`  
- Start both with one command: from repo root run `npm run dev`

4) Build frontend for production  
```bash
npm run build
```

## API Overview
Base URL is `REACT_APP_BASE_URL` (defaults to `/api/v1`). Key routes include:
- Auth: `/auth/login`, `/auth/signup`, `/auth/sendotp`, `/auth/reset-password`
- Courses: `/course/createCourse`, `/course/getCourseDetails`, `/course/getAllCourses`, `/course/updateCourseProgress`
- Payments: `/payment/capturePayment`, `/payment/verifyPayment`
- Profile: `/profile/getUserDetails`, `/profile/updateProfile`
- Contact: `/reach/contact`

## Testing the Happy Path
- Create an instructor, add a category, then create a course with sections/subsections (video uploads go to Cloudinary).  
- Browse as a student, purchase via Razorpay, verify enrollment, watch lessons, and confirm progress tracking and ratings.

<!-- ## Contributing
Issues and PRs are welcome. If you find a bug or have an idea, open an issue with steps to reproduce or a short proposal. Pull requests should include a brief summary of the change and any setup needed to test it. -->
# StudyNotion – Edtech Platform

I’m building StudyNotion as a practical, end-to-end learning platform. Students should be able to find a course, watch the lessons, and see their progress. Instructors should be able to publish, price, and manage content without fighting the tooling. Everything lives in this repo so the frontend and backend can grow together.

## What’s inside
- Separate frontend and backend workspaces
- Auth with roles to keep course access secure
- Course pages with video/content delivery and progress tracking
- Clean, extendable code so new features stay easy to ship

## Run it locally
1) Clone the repo.  
2) Install dependencies in both the frontend and backend folders.  
3) Add your env vars (database, storage, JWT/secret keys).  
4) Start the backend server, then run the frontend dev server.  
You should be able to browse courses and hit the core flows locally.

## Current state
The scaffolding is up and I’m actively building features. APIs, schema, and UI will keep moving as I test and iterate.

<!-- ## Contributing
Feedback and ideas are welcome. If you spot an issue or have a suggestion, open an issue or PR and I’ll take a look. -->
