# Big Bear Vans - Technical Documentation

## 1. Project Overview

**Big Bear Vans** is a high-end E-commerce and Service platform designed for custom van enthusiasts. The primary business goal is to facilitate **Custom Van Building** services and manage **Van Sales (Inventory)**. The platform provides a seamless bridge between a client's vision and the final physical build.

### Core Business Features:

* **Van Inventory & Sales:** A dedicated section for listing and selling pre-built vans.
* **Custom Build Services:** A complete showcase of portfolio projects to help clients understand build quality.
* **3D Van Configurator:** An interactive 3D tool (Three.js) that allows users to visualize their custom van choices in real-time.
* **Lead Management System:** Integrated inquiry and contact forms where customer data is captured and managed via the Admin Dashboard.
* **Custom Booking System:** A proprietary scheduling system integrated with **Google Calendar and Google Meet** for client consultations.
* **Educational Blog:** In-depth articles covering van components like kitchens, bathrooms, and electrical systems to assist client decision-making.

---

## 2. Tech Stack

### Frontend:

* **Framework:** React (v19)
* **Styling:** Tailwind CSS
* **3D Rendering:** Three.js, @react-three/fiber, @react-three/drei
* **State Management:** Redux Toolkit & Redux Persist
* **Animations:** GSAP, Framer Motion
* **UI Components:** Lucide React, SweetAlert2, Swiper

### Backend:

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JWT (JSON Web Tokens), BcryptJS, Google OAuth
* **File Handling:** Multer, Sharp (Image Optimization), AWS SDK (S3)

---

## 3. Folder Structure

The project is organized to separate business logic, UI components, and the 3D engine:

```text
/backend (Node.js API)
│   ├── /models       # Mongoose Schemas (Vans, Blog, Inquiry, Booking, Users)
│   ├── /routes       # API Endpoints (Admin, Public, Booking)
│   ├── /middleware   # Security, Authentication (JWT), and Validation
│   └── server.js     # Entry point
│
/frontend (React App)
├── /src
│   ├── /app                # Core logic and State Management
│   ├── /pages              # Main views (Home, Inventory, Portfolio, Admin)
│   ├── /website-components # Business-centric UI (Van cards, Inquiry forms, Blogs)
│   ├── /components         # 3D Configurator specific modules
│   ├── /hooks              # Custom React hooks for API and UI logic
│   ├── /data               # Local data constants and configuration
│   └── App.js              # Central Routing and Protected Route logic

```

---

## 4. Admin Functionality & Lead Tracking

The Admin Panel is a secure, protected environment for managing the business:

* **Full CRUD:** Manage Van listings, Portfolio items, Blog posts, and 3D configuration data.
* **Lead Management:** View all customer inquiries and contact requests.
* **Status Tracking:** Ability to update lead statuses (e.g., *New, Contacted, In Progress, Cancelled*).
* **Security:** Protected routes ensure only authorized administrators can access business data.

---

## 5. Deployment & Infrastructure

* **Frontend Hosting:** AWS Amplify
* **Backend Hosting:** AWS EC2
* **Object Storage:** AWS S3 (Used for storing 3D .glb models and high-resolution van images).
* **Database:** MongoDB Atlas

---

## 6. Local Installation

1. **Clone the repository.**
2. **Backend Setup:**
* Navigate to `/backend`, run `npm install`.
* Configure `.env` with `MONGO_URI`, `AWS_KEYS`, `JWT_SECRET`, and `GOOGLE_API_KEYS`.
* Start server: `npm run dev`.


3. **Frontend Setup:**
* Navigate to `/frontend`, run `npm install`.
* Start development server: `npm run dev`.
