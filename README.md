
# 🚀 Welcome! To **Shrink.it – Smart URL Shortener**

Shrink.it is a powerful full-stack URL Shortening and Link Management system that allows users to create short links, track clicks, generate QR codes, and manage URLs — all with a secure authentication system and a beautiful UI.

---

## 🌐 Live Links

### **Frontend (Netlify)**

➡️ [https://shrinkit.netlify.app/](https://shrinkit.netlify.app/)


## 🎥 Presentation Video

➡️ *Add your demo video link here*

---

## 📌 Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Endpoints](#endpoints)
* [Technologies Used](#technologies-used)
* [Contributing](#contributing)
* [License](#license)
* [Screenshots](#screenshots)

---

## ✨ Features

1. **User Authentication (JWT Based)**

   * Signup, login
   * Google Login
   * GitHub Login

2. **URL Shortening**

   * Convert long URLs to short URLs
   * Redirect instantly on visit

3. **Click Tracking**

   * Every redirect increases click count
   * Dashboard shows total links + clicks

4. **Personal Dashboard**

   * View all your shortened URLs
   * Copy short URL
   * Delete URL
   * Track clicks

5. **QR Code Generator**

   * Create QR code for any URL
   * Download or scan

6. **Admin Panel**

   * View all users
   * View all URLs
   * Delete users
   * Check user-specific activity

7. **Fully Responsive UI**

   * Mobile-friendly
   * Hamburger menu
   * Smooth animation & clean dark theme

---

## 🛠 Installation

### **1. Clone Repository**

```bash
git clone https://github.com/8309h/shrinkit.git
```

---

### **2. Setup Backend**

```bash
cd Backend
npm install
```

---

### **3. Add Environment Variables**

Create a `.env` file inside `/Backend`:

```
PORT=8080
mongodbUrl=<your_mongo_db_uri>

normalkey=<jwt_secret_key>
refreshkey=<refresh_secret_key>

GOOGLE_CLIENT_ID=<google_id>
GOOGLE_CLIENT_SECRET=<google_secret>
GOOGLE_REDIRECT_URL=<your_redirect>

GITHUB_CLIENT_ID=<github_id>
GITHUB_CLIENT_SECRET=<github_secret>
GITHUB_REDIRECT_URL=<your_redirect>
```

---

### **4. Start Backend**

```bash
node index.js
```

Backend runs on:

```
http://localhost:8080
```

---

### **5. Start Frontend**

Open `frontend/index.html` or use Live Server.

---

## 🚀 Usage

* Register or login
* Enter a long URL
* Click **Shrink** → short URL generated
* Copy or open short URL
* Dashboard shows:

  * Number of links
  * Total click count
  * URL list
* Delete unwanted URLs
* Admin has extended controls

---

## 📡 Endpoints

### **Authentication**

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/user/signup` | Register new user |
| POST   | `/user/login`  | Login             |
| GET    | `/auth/google` | Google OAuth      |
| GET    | `/auth/github` | GitHub OAuth      |

---

### **URL Management**

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/url/create`           | Create short URL            |
| GET    | `/url/my`               | Fetch logged-in user's URLs |
| GET    | `/url/all`              | Fetch all URLs (Admin)      |
| DELETE | `/url/delete/:shortUrl` | Delete URL                  |
| GET    | `/url/:shortUrl`        | Redirect to original        |

---

### **Admin**

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| GET    | `/user/allusers`   | Get all users |
| DELETE | `/user/delete/:id` | Delete user   |

---

## 🛠 Technologies Used

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt
* QRCode Library
* CORS

### **Frontend**

* HTML
* CSS
* JavaScript
* SweetAlert
* Tailwind (Partial)
* FontAwesome Icons

### **Deployment**

* **Netlify** (Frontend)
* **Render / Cyclic** (Backend)

---

## 🤝 Contributing

Contributions are welcome!

* Open an issue
* Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📸 Screenshots

(Add your own images inside `screenshots/` folder and update the paths)

### 🏠 Homepage

```
./screenshots/home.png
```

### 🔐 Login Page

```
./screenshots/login.png
```

### ✨ Dashboard

```
./screenshots/dashboard.png
```

### 🔗 URL Shortening

```
./screenshots/short-url.png
```

### 📊 Admin Panel

```
./screenshots/admin.png
```

---

