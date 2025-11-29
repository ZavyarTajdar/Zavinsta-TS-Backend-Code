# ZavInsta – Instagram Style Backend (TypeScript + Node.js + Express + MongoDB)

A clean and scalable backend built with **TypeScript**, **Express**, **MongoDB**, and **JWT authentication**.  
This project includes a complete folder structure for an Instagram-like app:  
User Auth, Posts, Likes, Comments and Media Upload (Cloudinary + Multer).

---

## 🚀 Features

- Full TypeScript support  
- User authentication (Register / Login)  
- JWT-based protected routes  
- Post creation with image upload  
- Like / Unlike system  
- Comments on posts  
- Follow / Unfollow users  
- Clean and scalable folder structure  
- ES Modules support  
- MongoDB with Mongoose  
- Cloudinary upload support  
- Error handling + async wrapper  
- Ready production build (dist folder)

---

## 📁 Project Structure

├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.ts
└── server.ts


## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Cloudinary**
- **Multer**
- **bcrypt**

---

## 📦 Installation & Setup

### 1. Clone the repo

https://github.com/yourusername/zavinsta-ts-backend.git


### 2. Install Dependencies

npm install

### 3. Dev Dependencies

npm install -D @types/node @types/express @types/jsonwebtoken @types/multer @types/cors @types/bcrypt ts-node-dev nodemon


---

## 🛠️ Create `.env` File

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx


---

## ▶️ Run the Project

### Development mode:
npm run dev


### Start built app:
npm start
