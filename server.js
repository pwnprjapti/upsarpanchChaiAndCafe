const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists for bookings
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const inquiriesFile = path.join(dataDir, 'inquiries.json');
if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2));
}

// Package Data
const packageData = {
  cafeName: "Upsarpanch Chai & Cafe",
  location: "Gopalpura Bypass Road, Jaipur - 302018",
  googleMapsUrl: "https://maps.google.com/?q=Gopalpura+Bypass+Road+Jaipur",
  phone: "9772995599",
  whatsappNumber: "919772995599",
  packageTitle: "Birthday / Anniversary & Kitty Party Package",
  tagline: "Bas aap ready hokar friends ke saath aaiye… baaki sab hum handle kar lenge! ✨",
  basePrice: 1999,
  baseGuests: 5,
  minPriceGuestsNote: "Chahe aap 2 log aayein ya 5… price fix hai ₹1999 🙏",
  extraGuestPrice: 250,
  extraGuestNote: "Extra guests- ₹250/- per person (same serving)",
  duration: "2 Hours",
  complimentaryCake: {
    title: "1 Pound Chocolate Cake",
    value: "Worth ₹250 – ₹300",
    isFree: true,
    tag: "Complementary from our side 😊"
  },
  inclusions: [
    {
      id: "space",
      icon: "🛋️",
      title: "Private Decorated Space",
      subtitle: "Full Balloon Decoration",
      description: "Cozy, private party space fully decorated with aesthetic balloons, warm cafe lights, and celebration backdrop."
    },
    {
      id: "music-smoke",
      icon: "🕺💃🎶",
      title: "Music & Smoke Effect",
      subtitle: "Cake Cutting Celebration",
      description: "Special party music cue and dramatic ambient smoke effect during the cake cutting ceremony to make photos pop!"
    },
    {
      id: "food",
      icon: "🍔☕🍟",
      title: "Food Feast for 5 Members",
      subtitle: "Cafe Special Serving",
      description: "Includes 5 rich Cold Coffees ☕, 5 Delicious Burgers 🍔, and 2 Large Sharing Plates of Crispy French Fries 🍟."
    },
    {
      id: "cake",
      icon: "🎂",
      title: "1 Pound Chocolate Cake FREE",
      subtitle: "Worth ₹250–₹300 Included",
      description: "Delicious chocolate cake complementary from Upsarpanch Cafe so you don't even have to order a cake separately!"
    },
    {
      id: "duration",
      icon: "⌚",
      title: "2 Hours Private Slot",
      subtitle: "Uninterrupted Vibes",
      description: "Full 120 minutes dedicated to celebrate, capture Instagram reels, eat, dance, and chill with your group."
    }
  ],
  timeSlots: [
    { id: "slot-1", time: "10:00 AM – 12:00 PM", label: "Morning Slot" },
    { id: "slot-2", time: "12:00 PM – 02:00 PM", label: "Afternoon Slot" },
    { id: "slot-3", time: "02:00 PM – 04:00 PM", label: "Post Lunch Slot" },
    { id: "slot-4", time: "04:00 PM – 06:00 PM", label: "Evening Sunset Slot" },
    { id: "slot-5", time: "06:00 PM – 08:00 PM", label: "Prime Evening Slot" },
    { id: "slot-6", time: "08:00 PM – 10:00 PM", label: "Dinner Slot" },
    { id: "slot-7", time: "10:00 PM – 12:00 AM", label: "Late Night Party Slot" }
  ],
  warnings: [
    { icon: "🚭", text: "Smoking strictly prohibited inside the cafe premises." },
    { icon: "🚫", text: "Alcohol and drinks strictly prohibited." }
  ],
  importantNotes: [
    "Your booking will be confirmed after advance booking only 🙏",
    "Please arrive 10 minutes prior to your booked slot for smooth seating.",
    "Cake cutting music and smoke effect are managed seamlessly by our cafe team."
  ]
};

// API: Get Package Info
app.get('/api/package', (req, res) => {
  res.json({ success: true, data: packageData });
});

// API: Get Available Slots
app.get('/api/slots', (req, res) => {
  res.json({ success: true, slots: packageData.timeSlots });
});

// API: Record Booking Inquiry
app.post('/api/inquire', (req, res) => {
  try {
    const { name, phone, date, slot, guests, occasion, notes, calculatedTotal } = req.body;

    if (!name || !phone || !date || !slot) {
      return res.status(400).json({
        success: false,
        message: "Kripya name, phone, date aur time slot zaroor bharein."
      });
    }

    const newInquiry = {
      id: "UPS-" + Date.now().toString().slice(-6),
      timestamp: new Date().toISOString(),
      name,
      phone,
      date,
      slot,
      guests: Number(guests) || 5,
      occasion: occasion || "Birthday Party",
      notes: notes || "",
      calculatedTotal: calculatedTotal || packageData.basePrice,
      status: "pending_advance"
    };

    const raw = fs.readFileSync(inquiriesFile, 'utf8');
    const inquiries = JSON.parse(raw || '[]');
    inquiries.unshift(newInquiry);
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2));

    res.json({
      success: true,
      message: "Booking request saved successfully!",
      bookingId: newInquiry.id,
      inquiry: newInquiry
    });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// API: View all inquiries (For Cafe Admin)
app.get('/api/inquiries', (req, res) => {
  try {
    const raw = fs.readFileSync(inquiriesFile, 'utf8');
    const inquiries = JSON.parse(raw || '[]');
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: "Could not read inquiries" });
  }
});

// Fallback to index.html for any unmatched route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`☕ Upsarpanch Chai & Cafe Catalogue running on http://localhost:${PORT}`);
});
