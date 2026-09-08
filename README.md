# ☕ Upsarpanch Chai & Cafe - Digital Party Catalogue & Booking Portal

A high-converting, mobile-first Party Package Catalogue & Slot Booking web application built for **Upsarpanch Chai & Cafe (Gopalpura Bypass Road, Jaipur)** using **Node.js** and **Express**.

Showcases their ₹1,999 Birthday, Anniversary & Kitty Party celebration package with real-time bill computation, 2-hour slot selector, and 1-tap WhatsApp booking dispatch.

---

## 🌟 Key Features

1. **Party Package Showcase (₹1,999)**:
   - 🛋️ **Private Decorated Space**: Full colorful balloon decoration and celebration ambiance.
   - 🕺💃 **Music & Smoke Effect**: High-energy music & cinematic fog/smoke during cake cutting.
   - 🍔☕🍟 **5-Member Feast**: 5 Cold Coffees, 5 Crispy Burgers, and 2 Sharing Plates of Loaded French Fries.
   - 🆓🎂 **Complimentary Cake**: 1 Pound Chocolate Cake (Worth ₹250–₹300) included FREE.
   - ⌚ **2 Hours Duration**: Full 120 minutes private celebration time.
   - ✨ *"Bas aap ready hokar friends ke saath aaiye… baaki sab hum handle kar lenge!"*

2. **Interactive Bill & Guest Calculator**:
   - Fixed base package of ₹1,999 for 2 to 5 guests.
   - Extra guests counter (+₹250/person with same food & beverage serving).
   - Real-time food serving count (coffees, burgers, fries) and grand total.

3. **Time Slot Selector**:
   - 7 standard 2-hour slots:
     - ⏰ 10:00 AM – 12:00 PM
     - ⏰ 12:00 PM – 02:00 PM
     - ⏰ 02:00 PM – 04:00 PM
     - ⏰ 04:00 PM – 06:00 PM
     - ⏰ 06:00 PM – 08:00 PM (Most Popular)
     - ⏰ 08:00 PM – 10:00 PM
     - ⏰ 10:00 PM – 12:00 AM

4. **1-Tap WhatsApp Booking Dispatcher**:
   - Pre-fills all customer selections (Name, Phone, Occasion, Date, Slot, Guest count, Total Amount, Cake name) into a WhatsApp message directly sent to `+91 9772995599`.
   - Also records bookings in `data/inquiries.json` for the cafe's internal management.

5. **UPI Advance Token Modal**:
   - Direct UPI Number copy button (`9772995599`) and scan guidance for slot token confirmation.

6. **House Rules & Warning Badges**:
   - 🚭 Smoking strictly prohibited.
   - 🚫 Alcohol strictly prohibited.
   - ⏰ 2-hour slot punctuality.
   - 💳 Advance booking required for slot lock.

7. **Print / PDF Brochure Mode**:
   - One-click "Brochure" button generates a print-ready PDF/paper catalogue for cafe tables or flyers.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

Or run in development auto-reload mode:
```bash
npm run dev
```

### 3. Open in Browser
Visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 Backend API Endpoints

- `GET /api/package`: Returns full package details, inclusions, prices, and cafe info.
- `GET /api/slots`: Returns available 2-hour time slots.
- `POST /api/inquire`: Records customer booking inquiries into `data/inquiries.json`.
- `GET /api/inquiries`: Lists all captured inquiries (Admin review).

---

## 📍 Cafe Contact & Address

- **Cafe Name**: Upsarpanch Chai & Cafe
- **Location**: Gopalpura Bypass Road, Jaipur - 302018 (Rajasthan)
- **Phone / WhatsApp**: +91 9772995599
- **Operating Hours**: 10:00 AM – 12:00 AM (Midnight)
