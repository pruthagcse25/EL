const roomPrices = {
    "Deluxe Room": 3000,
    "Executive Suite": 5000,
    "Presidential Suite": 9000
};

const checkInInput = document.getElementById("checkin");
const checkOutInput = document.getElementById("checkout");
const roomSelect = document.getElementById("room");
const form = document.getElementById("bookingForm");

const totalDisplay = document.createElement("h3");
totalDisplay.style.color = "#e74c3c";
totalDisplay.style.marginBottom = "15px";

form.parentNode.insertBefore(totalDisplay, form);

function calculateTotal() {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    const roomType = roomSelect.value;

    if (
        checkInInput.value &&
        checkOutInput.value &&
        checkOut > checkIn
    ) {
        const nights =
            (checkOut - checkIn) / (1000 * 60 * 60 * 24);

        const total = nights * roomPrices[roomType];

        totalDisplay.textContent =
            `Total Price: ₹${total} (${nights} night${nights > 1 ? "s" : ""})`;
    } else {
        totalDisplay.textContent = "";
    }
}

checkInInput.addEventListener("change", calculateTotal);
checkOutInput.addEventListener("change", calculateTotal);
roomSelect.addEventListener("change", calculateTotal);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const guests = document.getElementById("guests").value;

    if (
        !name ||
        !email ||
        !guests ||
        !checkInInput.value ||
        !checkOutInput.value
    ) {
        alert("Please fill all fields.");
        return;
    }

    if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    alert(
        `Booking Successful!\n\n` +
        `Guest: ${name}\n` +
        `Room: ${roomSelect.value}\n` +
        `${totalDisplay.textContent}`
    );

    form.reset();
    totalDisplay.textContent = "";
});

const roomSections = document.querySelectorAll(".room");

roomSections.forEach(section => {
    const images = section.querySelectorAll("img");

    if (images.length > 1) {
        let currentIndex = 0;

        images.forEach((img, index) => {
            img.style.display =
                index === 0 ? "inline-block" : "none";
        });

        setInterval(() => {
            images[currentIndex].style.display = "none";

            currentIndex =
                (currentIndex + 1) % images.length;

            images[currentIndex].style.display =
                "inline-block";
        }, 2000);
    }
});
