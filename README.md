# User Management System (MERN + Redux)

## 🚀 Overview
This is a **MERN-based User Management System** built to **learn and explore React-Redux**. The project includes **user authentication, admin control, and profile management**, providing a hands-on experience with Redux for state management.

## 🎯 Features
✅ **User Features:**  
- 🔐 User login & signup (JWT Authentication)
- 🖼️ Profile picture upload & update (stored in MongoDB)
- 🏠 User homepage with profile management

✅ **Admin Features:**  
- 🔑 Admin login
- 📊 Admin dashboard with user management
- 🔍 Search, ✏️ Edit, 🗑️ Delete, ➕ Add users
- 🛠️ Full control over user data

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## 🔧 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/paralii/User-Management-System-MERN.git
   cd User-Management-System-MERN
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup:**
   ```sh
   cd frontend
   npm install
   npm start
   ```

4. **MongoDB Connection:**
   - Make sure you have MongoDB installed & running.
   - Update the **MongoDB URI** in the `backend/config/db.js` file.

## 📂 Folder Structure
```
User-Admin-Redux/
├── backend/     # Express.js API & Database Config
│   ├── models/  # MongoDB Models
│   ├── routes/  # API Routes
│   ├── middleware/  # JWT Auth Middleware
│   ├── config/  # Database Config
│   ├── server.js  # Express App Entry
│
├── frontend/    # React App with Redux
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/  # User & Admin Pages
│   │   ├── redux/  # Redux Store & Actions
│   │   ├── App.js
│   │   ├── index.js
│
└── README.md
```

## ❌ No Live Demo
This project is **not hosted** yet, as it was built purely for learning purposes.

## 🤝 Contribution
This is a **personal learning project**, so contributions are not required. However, feel free to fork and improve it! 🚀

## 📌 Author
👤 **PARALI**  
🔗 [GitHub](https://github.com/paralii)

---
✨ **This project was built for hands-on learning with Redux & MERN stack!** ✨

