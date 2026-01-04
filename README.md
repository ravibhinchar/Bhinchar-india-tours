# ✈️ BhincharIndiaTours - Premium Travel Agency Platform

![BhincharIndiaTours](frontend/assets/images/logo-blue.svg)

> A modern, full-stack travel agency website featuring **User Authentication**, **AI Chat Support**, **Dynamic Tour Packages**, and a **Personalized User Dashboard**.

---

## 🌟 Features

### 🎨 Frontend (Client-Side)
*   **Premium UI/UX**: Glassmorphism effects, video backgrounds, and smooth parallax scrolling.
*   **Responsive Design**: Fully mobile-optimized with a **Sidebar Dashboard** (Desktop) and **Hamburger Menu** (Mobile).
*   **AI Chat Agent**: Floating chat widget powered by custom logic (simulated AI) to assist visitors.
*   **Auth System**: Secure **Login** and **Registration** pages with client-side validation.
*   **User Dashboard**:
    *   Personalized greeting.
    *   Profile details (Name, Email).
    *   "My Bookings" overview.
    *   Logout functionality.
*   **Destinations & Packages**: Dynamic searching and filtering of tour packages.

### ⚙️ Backend (Server-Side)
*   **Node.js & Express**: Robust REST API architecture.
*   **MongoDB Atlas**: Cloud database for storing Users, Tours, and Bookings.
*   **Authentication**: JWT (JSON Web Token) based stateless authentication.
*   **Security**: Password hashing with `bcryptjs`, CORS protection.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Custom + Variables), JavaScript (ES6+), IonIcons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js |
| **Tools** | Git, NPM, Postman |

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/ravibhinchar/Bhinchar-india-tours.git
cd Bhinchar-india-tours
```

### 2. Backend Setup
The backend runs on Port `5001`.

```bash
cd backend
npm install
# Create a .env file with your credentials (PORT, MONGO_URI, JWT_SECRET)
npm run dev
```

### 3. Frontend Setup
The frontend runs on Port `8080`.

Open a **new terminal** window:
```bash
# Go back to root if inside backend
cd ..
npx http-server frontend -p 8080 -c-1
```

### 4. Usage
*   Open [http://localhost:8080](http://localhost:8080) in your browser.
*   **Sign Up** for an account.
*   Explore the **Dashboard**.
*   Test the **Chat Widget**.

---

## 🌐 Deployment (Go Live)

### Backend (Render.com)
1.  Create a new Web Service on Render connected to this repo.
2.  Set Root Directory to `backend`.
3.  Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
4.  Get your **Live Backend URL**.

### Frontend (Vercel)
1.  Import this repo into Vercel.
2.  Set Root Directory to `frontend`.
3.  **Update `api.js`**: Before deploying, ensure `API_URL` points to your Render Backend URL, not localhost.
4.  Deploy!

---

## 📂 Project Structure

```
Bhinchar-india-tours/
├── backend/                # Node.js Server & Models
│   ├── config/             # DB Connection
│   ├── controllers/        # Auth & Tour Logic
│   ├── models/             # Mongoose Schemas (User, Tour)
│   ├── routes/             # API Routes
│   └── server.js           # Entry Point
│
├── frontend/               # Static Assets & Pages
│   ├── assets/             # CSS, JS, Images, Videos
│   │   ├── css/            # Global & Component Styles
│   │   └── js/             # Logic (api.js, profile.js, auth)
│   ├── index.html          # Landing Page
│   ├── login.html          # Login Page
│   ├── register.html       # Signup Page
│   └── profile.html        # User Dashboard (Sidebar Layout)
│
└── README.md               # Project Documentation
```

---

**Developed by Ravindra Bhinchar** © 2025
