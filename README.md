# 🏨 ADC Hotel Management System (Frontend)

**Check, Manage & Book — All in One Platform**

![ADC Hotel](https://raw.githubusercontent.com/ibayjimwell/adc-hotel-app/refs/heads/main/public/app-image.png)

🌐 **Live App:** [https://adc-hotel-app.vercel.app/](https://adc-hotel-app.vercel.app/)
🔌 **Backend API:** [https://github.com/ibayjimwell/adc-hotel-api](https://github.com/ibayjimwell/adc-hotel-api)

---

## 📖 Overview

The **ADC Hotel Management System** is a modern web application designed to handle day-to-day hotel operations efficiently. It connects to a custom-built REST API to manage:

* Guest records
* Room availability
* Reservations
* Check-ins & check-outs
* Billing & payments
* Hotel services

Built with a clean UI and real-world workflow in mind.

---

## 🚀 Tech Stack

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge\&logo=next.js\&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge\&logo=react\&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![API](https://img.shields.io/badge/Backend-ADC_Hotel_API-blue?style=for-the-badge)

---

## ✨ Features

### 👤 Guest Management

* Register and update guest information
* Search and view guest profiles

### 🛏 Room Management

* View rooms with type and status
* Track availability, occupied, and maintenance rooms

### 📅 Reservations

* Book single or multiple rooms
* Cancel reservations
* View all upcoming bookings

### 🏨 Check-in / Check-out

* Convert reservations to stays
* Real-time room status updates

### 🧾 Billing & Payments

* Auto invoice generation
* Record payments
* View stay charges

### 🛎 Hotel Services

* Add and manage extra services like breakfast and laundry

---

## 🔌 API Connection

This frontend works with the **ADC Hotel Management System API**.

🔗 Backend Repository:
👉 [https://github.com/ibayjimwell/adc-hotel-api](https://github.com/ibayjimwell/adc-hotel-api)

Make sure the API server is running before using the app locally.

---

## ⚙️ Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ibayjimwell/adc-hotel-app.git
cd adc-hotel-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

### 4️⃣ Start development server

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 👨‍💻 Author

**Jimwell Ibay**
Creator & Maintainer
GitHub: [https://github.com/ibayjimwell](https://github.com/ibayjimwell)

---

## 📌 Future Improvements

* Role-based access (Admin / Staff)
* Dashboard analytics
* Reports export
* Mobile responsive enhancements
