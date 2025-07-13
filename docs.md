Create a complete, production-quality full-stack web application using the following stack:

- Framework: Next.js with TypeScript
- Styling: Tailwind CSS, with all colors defined in the Tailwind `global.css` or `tailwind.config.js` so that light and dark themes are supported
- Backend-as-a-Service: Supabase

Use modern best practices including:

- Smart and dumb component separation
- Context + custom hooks for shared logic (auth, notifications, data fetching)
- Real-time updates with Supabase subscriptions (WebSocket)
- Folder structure that separates components, contexts, hooks, utils, services, and pages cleanly
- Fully typed with TypeScript
- Reusable UI components using Tailwind and conditionally rendered based on state

---

### 🔐 Auth Features

Implement user authentication using Supabase Auth:

- Sign up
- Sign in
- Password reset
- Email confirmation
- Persistent user session
- Automatically redirect to login if unauthenticated
- Store user info in context and expose via hook

---

### 🧠 Database Schema

Use Supabase and create the following tables:

1. **Users Table**

- id (UUID, primary key, manually assigned)
- email (unique, not null)
- first_name (not null)
- last_name (not null)
- phone (not null)
- created_at (timestamp, not null)
- updated_at (timestamp, not null)

2. **Checkin Table**

- id (UUID, primary key)
- user_id (foreign key to users, not null)
- day (date, not null)
- checkin_time (timestamp, not null)
- notification_status (ENUM: not_sent, sent, failed, not null)

3. **Checkout Table**

- id (UUID, primary key)
- user_id (foreign key to users, not null)
- day (date, not null)
- checkout_time (timestamp, not null)
- notification_status (ENUM: not_sent, sent, failed, not null)

---

### 🖥️ Frontend UI

Pages:

#### 1. `/login`, `/signup`, `/reset-password`

Use Supabase Auth for all forms and show error states and success messages using good UX practices.

#### 2. `/` Homepage

Display current logged-in user's info (first name, last name, phone, email). Fetch from Supabase.

#### 3. `/attendance` Page

This is the main application page with the following layout and behavior:

##### Layout:

- Sidebar for navigation
- Page title and day selector
- Two horizontal tabs: **Check-In** and **Check-Out**

##### Shared UI Components:

- Day Selector: Allows selecting today or past dates only.
- Toggle: Enables auto-notification or manual.
- Smart Table:
  - Dynamically updates based on selected tab and date.
  - Columns: name, phone, time, notification status, "Send Notification" button
  - Real-time updates using Supabase WebSockets when:
    - A user checks in/out
    - Notification is sent/failed
- WebSocket listeners should live in the context.

##### Notification Functionality:

- Manual sending of notification (email and SMS)
- If auto-notification is enabled, it should trigger automatically upon check-in/check-out
- Notification status should be updated live via WebSocket
- Notification sending is done via two services:
  - **Brevo** for emails
  - **Twilio** for SMS

---

### 📡 Notification Architecture

#### Notification Strategy:

Create a unified `useNotification()` hook that internally uses:

1. `useBrevo()`

   - Sends emails using Brevo API
   - Handles errors, retries, and logs

2. `useTwilio()`
   - Sends SMS using Twilio API
   - Handles errors, retries, and logs

These hooks should:

- Be isolated to their respective services
- Allow toggling between auto and manual mode
- Return `status`, `send()`, `loading`, and `error` states

The `useNotification()` hook coordinates both based on preferences:

- Automatically sends email and SMS if auto mode is enabled
- Exposes `sendNotification(userId: string, type: 'checkin' | 'checkout')` function
- Updates the `notification_status` in the DB upon success/failure

---

### 💡 Architectural Requirements

1. **Context + Hook System**

   - `useAuth`: Handles auth state, login/logout, get user data
   - `useAttendance`: Handles data fetching for check-in/check-out
   - `useBrevo`: Sends email via Brevo
   - `useTwilio`: Sends SMS via Twilio
   - `useNotification`: Aggregates both and handles logic

2. **Folder Structure**

```

/src
/components
/common (buttons, layout)
/attendance (checkinTable.tsx, checkoutTable.tsx, etc.)
/contexts
authContext.tsx
attendanceContext.tsx
notificationContext.tsx
/hooks
useAuth.ts
useAttendance.ts
useNotification.ts
useBrevo.ts
useTwilio.ts
/pages
index.tsx
login.tsx
signup.tsx
reset-password.tsx
attendance.tsx
/utils
supabaseClient.ts
dateHelpers.ts
notificationHelpers.ts
brevoClient.ts
twilioClient.ts
/styles
global.css
/types
db.ts (Supabase types)
notification.ts

```

3. **Styling**
   - Tailwind only
   - Use `tailwind.config.js` to extend colors if needed
   - Create dark mode theme toggle in the UI, using `media` or `class` strategy

---

### 🧪 Additional Notes

- All Supabase-related data should be fetched using `@supabase/supabase-js`
- Use `@headlessui/react` or similar libraries for accessible UI
- Implement optimistic UI updates where possible
- Validate forms with Zod or similar
- Ensure mobile responsiveness

Please generate all necessary files, components, and logic.
