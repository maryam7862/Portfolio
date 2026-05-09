# Portfolio Website — Developer Documentation

**Author:** Maryam Saleem

**Project Type:** Full-Stack Portfolio Website

**Tech Stack:** HTML, CSS, JavaScript, Node.js, Express, MongoDB

---

## 1. Project Overview

This project is a modern single-page portfolio website built to showcase personal information, skills, education, projects, and a functional contact system. It includes a frontend experience optimized for responsive devices and a backend API to receive and store user messages securely.

The system allows visitors to:

- View portfolio content in distinct sections
- Submit messages using a contact form
- Save contact messages in a MongoDB database

---

## 2. Objectives

- Build a responsive and visually appealing portfolio website
- Implement smooth single-page navigation
- Integrate a backend API for form submission
- Store user messages in a database
- Deploy frontend and backend independently

---

## 3. System Architecture

Frontend (HTML/CSS/JavaScript)
↓
HTTP Request (Fetch API)
↓
Backend (Node.js + Express)
↓
MongoDB Database

---

## 4. Project Structure

```
portfolio-website/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── .env
│
├── README.md
```

---

## 5. Frontend Documentation

### 5.1 `index.html`

- Defines the website structure and content sections
- Includes navigation links for smooth scrolling
- Contains sections for Home, About, Education, Skills, Projects, and Contact

### 5.2 `style.css`

- Controls visual styling and responsive layout
- Implements gradient backgrounds, hover states, and card design
- Uses media queries for mobile-friendly spacing and typography

### 5.3 `script.js`

- Handles contact form submission
- Uses the Fetch API to post data to the backend
- Example request:
  ```js
  fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  ```

---

## 6. Backend Documentation

### 6.1 `server.js`

- Entry point for the backend application
- Initializes Express server and middleware
- Connects to MongoDB
- Registers API routes

### 6.2 `config/db.js`

- Configures MongoDB connection using Mongoose
- Loads database URI from environment variables
- Handles connection success and error logging

### 6.3 `models/Contact.js`

- Defines the Mongoose schema for contact messages
- Schema fields:
  - `name`: String
  - `email`: String
  - `message`: String

### 6.4 `routes/contactRoutes.js`

- Handles contact form POST requests at `/api/contact`
- Validates request payload
- Creates and saves new contact documents in MongoDB
- Returns success or error responses

---

## 7. Database Design

**Database:** MongoDB

**Collection:** `contacts`

| Field   | Type   |
| ------- | ------ |
| name    | String |
| email   | String |
| message | String |

---

## 8. API Documentation

### POST `/api/contact`

**Request Body**

```json
{
  "name": "Maryam",
  "email": "example@gmail.com",
  "message": "Hello"
}
```

**Response**

```json
{
  "message": "Message sent successfully"
}
```

---

## 9. Installation & Setup

### 9.1 Clone Repository

```bash
git clone <repo-link>
cd portfolio-website
```

### 9.2 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_connection_string
```

Run the backend server:

```bash
node server.js
```

### 9.3 Frontend Setup

Open `frontend/index.html` in a browser to view the site locally.

---

## 10. Deployment

### Frontend Deployment

- Recommended platform: Netlify, Vercel, or GitHub Pages
- Deploy the `frontend` folder as a static site

### Backend Deployment

- Recommended platform: Render, Heroku, or Railway
- Connect the repository and configure environment variables
- Add `MONGO_URI` in deployment settings

---

## 11. Integration

After deploying the backend, update the frontend API endpoint in `frontend/script.js`:

```js
fetch("https://your-backend.onrender.com/api/contact");
```

---

## 12. Features

- Responsive portfolio UI
- Animated background and modern styling
- Smooth scrolling navigation
- Project and skills showcase
- Contact form integrated with backend
- MongoDB database storage for messages

---

## 13. Known Issues

- Backend startup may be slower on free-tier hosting
- CORS errors if the frontend and backend URLs are not configured correctly
- MongoDB connection failures if the `MONGO_URI` is invalid

---

## 14. Future Improvements

- Add user authentication for admin access
- Create an admin dashboard to view and manage messages
- Add email notifications for new contacts
- Implement dark/light mode toggle
- Expand the project gallery with images and filters

---

## 15. Conclusion

This portfolio website demonstrates practical full-stack development skills, including frontend design, backend API development, and database integration. It is suitable as a professional portfolio project and a foundation for future enhancements.

If you want, I can also convert this into a PDF report, produce architecture diagrams, or create a presentation slide deck.
