// ROOM PRICES
const roomPrices = {
    "Deluxe Room": 3000,
    "Executive Suite": 5000,
    "Presidential Suite": 9000
};

// ELEMENTS
const dateInputs = document.querySelectorAll('input[type="date"]');
const checkInInput = dateInputs[0];
const checkOutInput = dateInputs[1];
const roomSelect = document.querySelector("select");
const form = document.querySelector("form");

// TOTAL DISPLAY
const totalDisplay = document.createElement("h3");
totalDisplay.style.color = "#e74c3c";
form.parentNode.insertBefore(totalDisplay, form);

// CALCULATE PRICE
function calculateTotal() {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    const roomType = roomSelect.value;

    if (checkInInput.value && checkOutInput.value && checkOut > checkIn) {
        const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        const total = nights * roomPrices[roomType];

        totalDisplay.textContent = `Total Price: ₹${total} (${nights} nights)`;
    } else {
        totalDisplay.textContent = "";
    }
}

// EVENTS
checkInInput.addEventListener("change", calculateTotal);
checkOutInput.addEventListener("change", calculateTotal);
roomSelect.addEventListener("change", calculateTotal);

// FORM VALIDATION
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const guests = document.querySelector('input[type="number"]').value;

    if (!name || !email || !guests || !checkInInput.value || !checkOutInput.value) {
        alert("Please fill all fields.");
        return;
    }

    if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    alert("Booking Successful!\n" + totalDisplay.textContent);
});

// IMAGE CAROUSEL
const roomSections = document.querySelectorAll("div");

roomSections.forEach(section => {
    const images = section.querySelectorAll("img");

    if (images.length > 1) {
        let currentIndex = 0;

        images.forEach((img, index) => {
            img.style.display = index === 0 ? "inline-block" : "none";
        });

        setInterval(() => {
            images[currentIndex].style.display = "none";
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = "inline-block";
        }, 2000);
    }
});
