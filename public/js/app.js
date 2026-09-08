/**
 * Upsarpanch Chai & Cafe - Party Catalogue Client Application
 * Features:
 * - Live Bill & Food Serving Calculator
 * - Interactive Time Slot Picker
 * - Direct WhatsApp Dispatcher
 * - Canvas Confetti Celebration
 * - UPI Modal & Print Brochure Trigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constants
  const BASE_PRICE = 1999;
  const BASE_GUESTS = 5;
  const EXTRA_PERSON_PRICE = 250;
  const CAFE_PHONE = '9772995599';
  const WHATSAPP_NUMBER = '919772995599';

  // State
  let state = {
    occasion: 'Birthday Party',
    guests: 5,
    date: getFormattedTodayDate(),
    slot: '06:00 PM – 08:00 PM',
    cakeName: '',
    specialNotes: ''
  };

  // DOM Elements - Calculator
  const guestCountDisplay = document.getElementById('guestCountDisplay');
  const decreaseGuestsBtn = document.getElementById('decreaseGuests');
  const increaseGuestsBtn = document.getElementById('increaseGuests');
  const extraCountDisplay = document.getElementById('extraCountDisplay');
  const extraPriceDisplay = document.getElementById('extraPriceDisplay');
  const grandTotalDisplay = document.getElementById('grandTotalDisplay');
  const totalGuestsPreview = document.getElementById('totalGuestsPreview');
  const foodCoffeeCount = document.getElementById('foodCoffeeCount');
  const foodBurgerCount = document.getElementById('foodBurgerCount');
  const foodFriesCount = document.getElementById('foodFriesCount');
  const bookingDateInput = document.getElementById('bookingDateInput');
  const occasionChips = document.getElementById('occasionChips');

  // DOM Elements - Booking Form
  const bookingForm = document.getElementById('bookingForm');
  const custNameInput = document.getElementById('custName');
  const custPhoneInput = document.getElementById('custPhone');
  const partyOccasionSelect = document.getElementById('partyOccasion');
  const bookingDateSelect = document.getElementById('bookingDate');
  const chosenSlotSelect = document.getElementById('chosenSlot');
  const formGuestsInput = document.getElementById('formGuests');
  const cakeNameInput = document.getElementById('cakeName');
  const specialNotesInput = document.getElementById('specialNotes');

  // DOM Elements - Slots & Modals
  const slotCards = document.querySelectorAll('.slot-card');
  const selectedSlotText = document.getElementById('selectedSlotText');
  const printCatalogueBtn = document.getElementById('printCatalogueBtn');
  const showUpiModalBtn = document.getElementById('showUpiModalBtn');
  const upiModal = document.getElementById('upiModal');
  const closeUpiModal = document.getElementById('closeUpiModal');
  const copyUpiBtn = document.getElementById('copyUpiBtn');

  // Set default dates
  if (bookingDateInput) bookingDateInput.value = state.date;
  if (bookingDateSelect) bookingDateSelect.value = state.date;

  // Helper: Format Today's Date YYYY-MM-DD
  function getFormattedTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Calculate & Update UI
  function updateCalculation() {
    const totalGuests = state.guests;
    let extraGuests = 0;
    let totalAmount = BASE_PRICE;

    if (totalGuests > BASE_GUESTS) {
      extraGuests = totalGuests - BASE_GUESTS;
      totalAmount = BASE_PRICE + (extraGuests * EXTRA_PERSON_PRICE);
    }

    // Food Servings
    // 5 base: 5 coffee, 5 burger, 2 fries
    // Each extra guest gets 1 coffee + 1 burger. Every 2-3 extra guests get an extra plate of fries.
    const coffees = totalGuests;
    const burgers = totalGuests;
    const fries = 2 + Math.floor(extraGuests / 2.5);

    // Update Calc Display
    if (guestCountDisplay) guestCountDisplay.textContent = totalGuests;
    if (extraCountDisplay) extraCountDisplay.textContent = extraGuests;
    if (extraPriceDisplay) extraPriceDisplay.textContent = `₹${extraGuests * EXTRA_PERSON_PRICE}`;
    if (grandTotalDisplay) grandTotalDisplay.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
    if (totalGuestsPreview) totalGuestsPreview.textContent = totalGuests;
    if (foodCoffeeCount) foodCoffeeCount.textContent = coffees;
    if (foodBurgerCount) foodBurgerCount.textContent = burgers;
    if (foodFriesCount) foodFriesCount.textContent = fries;

    // Sync with Booking Form inputs
    if (formGuestsInput && Number(formGuestsInput.value) !== totalGuests) {
      formGuestsInput.value = totalGuests;
    }
  }

  // Event Listeners: Guest Stepper
  if (decreaseGuestsBtn) {
    decreaseGuestsBtn.addEventListener('click', () => {
      if (state.guests > 2) {
        state.guests--;
        updateCalculation();
      }
    });
  }

  if (increaseGuestsBtn) {
    increaseGuestsBtn.addEventListener('click', () => {
      if (state.guests < 30) {
        state.guests++;
        updateCalculation();
      }
    });
  }

  if (formGuestsInput) {
    formGuestsInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val >= 1) {
        state.guests = val;
        updateCalculation();
      }
    });
  }

  // Occasion Chips
  if (occasionChips) {
    const chips = occasionChips.querySelectorAll('.chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.occasion = chip.getAttribute('data-value');
        if (partyOccasionSelect) partyOccasionSelect.value = state.occasion;
      });
    });
  }

  if (partyOccasionSelect) {
    partyOccasionSelect.addEventListener('change', (e) => {
      state.occasion = e.target.value;
      if (occasionChips) {
        const chips = occasionChips.querySelectorAll('.chip');
        chips.forEach(chip => {
          if (chip.getAttribute('data-value') === state.occasion) {
            chip.classList.add('active');
          } else {
            chip.classList.remove('active');
          }
        });
      }
    });
  }

  // Booking Date Sync
  if (bookingDateInput) {
    bookingDateInput.addEventListener('change', (e) => {
      state.date = e.target.value;
      if (bookingDateSelect) bookingDateSelect.value = state.date;
    });
  }

  if (bookingDateSelect) {
    bookingDateSelect.addEventListener('change', (e) => {
      state.date = e.target.value;
      if (bookingDateInput) bookingDateInput.value = state.date;
    });
  }

  // Time Slot Selection
  slotCards.forEach(card => {
    card.addEventListener('click', () => {
      slotCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const chosen = card.getAttribute('data-slot');
      state.slot = chosen;
      if (selectedSlotText) selectedSlotText.textContent = chosen;
      if (chosenSlotSelect) chosenSlotSelect.value = chosen;
    });
  });

  if (chosenSlotSelect) {
    chosenSlotSelect.addEventListener('change', (e) => {
      state.slot = e.target.value;
      if (selectedSlotText) selectedSlotText.textContent = state.slot;
      slotCards.forEach(card => {
        if (card.getAttribute('data-slot') === state.slot) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  }

  // Handle Form Submission: Send to Backend & WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = custNameInput.value.trim();
      const phone = custPhoneInput.value.trim();
      const occasion = partyOccasionSelect.value;
      const date = bookingDateSelect.value;
      const slot = chosenSlotSelect.value;
      const guests = parseInt(formGuestsInput.value, 10) || 5;
      const cakeName = cakeNameInput.value.trim();
      const notes = specialNotesInput.value.trim();

      if (!name || !phone || !date || !slot) {
        alert('Kripya sabhi zaroori fields (Naam, Mobile, Date, Slot) bharein.');
        return;
      }

      // Calculate Total
      let extraCount = 0;
      let grandTotal = BASE_PRICE;
      if (guests > BASE_GUESTS) {
        extraCount = guests - BASE_GUESTS;
        grandTotal = BASE_PRICE + (extraCount * EXTRA_PERSON_PRICE);
      }

      // 1. Submit Inquiry to Node.js backend
      try {
        fetch('/api/inquire', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            occasion,
            date,
            slot,
            guests,
            notes: notes + (cakeName ? ` [Cake Text: ${cakeName}]` : ''),
            calculatedTotal: grandTotal
          })
        }).catch(err => console.log('Inquiry background log:', err));
      } catch (err) {
        // Continue even if network error
      }

      // 2. Launch celebratory confetti
      triggerConfetti();

      // 3. Format WhatsApp Message
      let msg = `🎉 *PARTY PACKAGE BOOKING INQUIRY* 🎉\n`;
      msg += `☕ *Upsarpanch Chai & Cafe, Jaipur*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `👤 *Customer Name:* ${name}\n`;
      msg += `📱 *Phone:* ${phone}\n`;
      msg += `🎈 *Occasion:* ${occasion}\n`;
      msg += `📅 *Date:* ${date}\n`;
      msg += `⏰ *Slot:* ${slot} (2 Hours)\n`;
      msg += `👥 *Total Guests:* ${guests} ${extraCount > 0 ? `(5 Base + ${extraCount} Extra)` : `(Fixed Package)`}\n`;
      msg += `💰 *Estimated Total:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
      msg += `🎂 *Complementary Cake:* 1 lb Chocolate Cake (FREE)\n`;
      if (cakeName) {
        msg += `✍️ *Name on Cake:* ${cakeName}\n`;
      }
      if (notes) {
        msg += `📝 *Special Request:* ${notes}\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `🛋️ Private Space + Balloon Decor + Music & Smoke Effect\n`;
      msg += `*Please confirm slot availability and share advance payment QR.* 🙏`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      // Alert & Redirect to WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
    });
  }

  // Print Catalogue
  if (printCatalogueBtn) {
    printCatalogueBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // UPI Modal Handlers
  if (showUpiModalBtn && upiModal) {
    showUpiModalBtn.addEventListener('click', () => {
      upiModal.classList.add('active');
    });
  }

  if (closeUpiModal && upiModal) {
    closeUpiModal.addEventListener('click', () => {
      upiModal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === upiModal) {
      upiModal.classList.remove('active');
    }
  });

  // Copy UPI Number
  if (copyUpiBtn) {
    copyUpiBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(CAFE_PHONE).then(() => {
        copyUpiBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyUpiBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      }).catch(() => {
        alert(`UPI Number: ${CAFE_PHONE}`);
      });
    });
  }

  // Initialize calculation on load
  updateCalculation();

  // Pure Canvas Confetti Function (Offline-ready, ultra-smooth)
  function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const numberOfPieces = 120;
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#fbbf24', '#ec4899', '#3b82f6'];

    for (let i = 0; i < numberOfPieces; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 20,
        velY: (Math.random() - 0.7) * 22,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      let activePieces = 0;
      pieces.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.velY += 0.4; // gravity
        p.velX *= 0.98; // air drag
        p.rotation += p.rotSpeed;
        p.opacity = Math.max(0, 1 - (elapsed / 2500));

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          activePieces++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (activePieces > 0 && elapsed < 2800) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }
});
