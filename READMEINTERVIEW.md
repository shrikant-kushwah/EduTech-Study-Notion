# StudyNotion Interview Q&A

## High-level
- **What is StudyNotion?**  
  A full-stack edtech platform where instructors create and sell courses and students enroll, watch videos, and track progress. Frontend is React; backend is Node/Express with MongoDB.

- **Why full-stack monorepo?**  
  To keep frontend and backend versions in sync, reduce API drift, and ship features across both layers together.

- **How is auth handled?**  
  JWT-based auth with role checks for students vs. instructors. Cookies store tokens; protected routes guard sensitive pages.

- **How do students pay for courses?**  
  Razorpay checkout is initiated from the frontend; the backend creates orders and verifies signatures before enrollment and sends confirmation emails.

## Feature-focused Q&A (with examples)
- **How does role-based access work?**  
  JWT tokens include the user role; middleware rejects mismatched roles. Example: a student calling `/course/createCourse` gets 403, while an instructor with a valid JWT proceeds to create sections/subsections.

- **How are courses structured and edited?**  
  Course → Sections → Subsections (lessons). Example: “React Basics” owns sections like “Intro” and “Components”, each with Cloudinary-hosted videos. Mongoose references let us reorder or update subsections without rewriting the whole course.

- **How is content delivered securely?**  
  Instructors upload via `express-fileupload`; assets go to Cloudinary and URLs are stored on the course/subsection. Frontend players fetch only for enrolled users; progress updates call `/course/updateCourseProgress`.

- **How is student progress tracked?**  
  `CourseProgress` stores completed subsection IDs per user/course. Example: finishing “Props” triggers an update, marking the lesson complete and refreshing the progress ring and sidebar checkmarks.

- **How do payments work end-to-end?**  
  Frontend requests `/payment/capturePayment` → opens Razorpay with returned `order_id` → on success posts `/payment/verifyPayment` with `payment_id` and `signature`. Backend HMAC-verifies using `RAZORPAY_SECRET`, enrolls the student, and sends a receipt email. Example: a ₹499 purchase of “React Basics” immediately shows up under “Enrolled Courses” after verification.

- **How are emails templated?**  
  Nodemailer with SMTP env creds; templates live in `server/mail/templates`. Example: `paymentSuccessEmail.js` sends order details; `passwordUpdate.js` confirms account changes.

- **How does the dashboard personalize data?**  
  Instructor dashboards show their courses and revenue stats; student dashboards show enrollments and per-course progress. Example: an instructor sees student counts per course; a student sees a progress bar that reflects `CourseProgress`.

- **How are ratings and reviews enforced?**  
  One rating per student per course; backend recalculates averages. Example: posting a 5-star rating updates the course’s displayed average via `RatingStars`.

## Frontend
- **Why React and Redux Toolkit?**  
  React for component-driven UI, Router for SPA navigation, and Redux Toolkit for predictable state (auth, cart, profile, courses) with minimal boilerplate.

- **How are API calls organized?**  
  `src/services/apis.js` holds endpoints; `src/services/operations/*` wraps `apiConnector` for specific flows (auth, courses, payments). This keeps components thin.

- **How is styling done?**  
  Tailwind CSS for utility-first styling; components use shared primitives (e.g., `IconBtn`, `Tab`, `Footer`, `Navbar`).

- **How is course playback handled?**  
  Video data and progress come from the backend. The player UI in `ViewCourse` reads the active lecture, marks completion via `/course/updateCourseProgress`, and shows progress indicators.

## Backend
- **What does the API stack look like?**  
  Express with modular routes (`/auth`, `/course`, `/payment`, `/profile`, `/reach`). MongoDB via Mongoose models (User, Course, Section, Subsection, Category, Rating/Review, CourseProgress).

- **How are files and media handled?**  
  Uploads use `express-fileupload` and go to Cloudinary (`config/cloudinary.js`). Stored URLs are saved in course/subsection records.

- **How are payments secured?**  
  Backend creates a Razorpay order and later verifies the `razorpay_signature` using the secret before enrolling users and sending email receipts.

- **How is email delivered?**  
  `utils/mailSender` uses Nodemailer with SMTP creds from env. Templates live in `server/mail/templates`.

## Data and domain
- **How is course structure modeled?**  
  Course → Sections → Subsections. CourseProgress tracks per-user completion. Ratings/Reviews are tied to courses and users.

- **How is access controlled for content?**  
  JWT + role middleware gate instructor-only routes (create/edit course, sections, subsections) and student-only actions (enroll, progress updates).

## Ops and configuration
- **What environment variables are required?**  
  Backend: `PORT`, `MONGODB_URL`, `JWT_SECRET`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME`, `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`, `RAZORPAY_KEY`, `RAZORPAY_SECRET`.  
  Frontend: `REACT_APP_BASE_URL`, `RAZORPAY_KEY`.

- **How do you run the project locally?**  
  `npm install && cd server && npm install`, set env files, then `npm run dev` from repo root to start client and server concurrently.

- **What are common failure points and mitigations?**  
  - Missing env vars → documented required keys.  
  - Payment signature mismatch → backend verifies HMAC before enrollment.  
  - Upload failures → Cloudinary config and temp dir settings validated on boot.  
  - CORS/auth issues → cors configured; protected routes check JWT.

## Testing and verification
- **How do you test the happy path?**  
  Create instructor → add category → create course with sections/subsections (upload media) → login as student → pay via Razorpay → verify enrollment → play lessons and ensure progress updates → leave a rating.

- **How do you validate payments end-to-end?**  
  Mock or use test Razorpay keys, check order creation, complete checkout, confirm signature verification, ensure enrollment and receipt email are sent, and verify cart reset on frontend.

- **How do you ensure protected pages stay secure?**  
  Manually test role-guarded routes; confirm unauthorized calls return 401/403 and frontend redirects away from restricted views.

## Architecture and rationale
- **Why JWT instead of sessions?**  
  Simpler for SPA + API, works with stateless scaling, and keeps client/server decoupled.

- **Why Cloudinary for media?**  
  Handles transcoding/storage/CDN so the app doesn’t manage heavy media pipelines.

- **Why Razorpay?**  
  Native support for INR payments and straightforward order/signature flow for this region-focused product.

## Extensibility
- **How would you add subscriptions?**  
  Introduce a plan model, create recurring orders/webhooks with Razorpay subscriptions, and gate content via active subscription checks instead of per-course purchases.

- **How would you add analytics?**  
  Instrument key events (enrollments, video starts/completions, drop-off) with an event collector; visualize via Chart.js components already present in the dashboard.

## Debugging
- **Where do you log or inspect errors?**  
  Backend uses console logging today; add structured logging (winston/pino) for production. Frontend surfaces toast errors and logs API failures to the console during dev.

