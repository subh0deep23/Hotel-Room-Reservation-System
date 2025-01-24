// --- Initialize Hotel Structure ---
const hotel = {
  floors: Array.from({ length: 10 }, (_, i) => {
    const floorNumber = i + 1;
    const isTopFloor = floorNumber === 10;
    const roomsPerFloor = isTopFloor ? 7 : 10;

    return Array.from({ length: roomsPerFloor }, (_, j) => ({
      number: isTopFloor ? 1001 + j : floorNumber * 100 + (j + 1),
      available: true,
    }));
  }),
};

// --- Display Hotel Structure ---
function displayHotel() {
  const hotelDiv = document.getElementById("hotel-structure");
  hotelDiv.innerHTML = ""; // Clear the structure

  hotel.floors.forEach((floor, floorIndex) => {
    floor.forEach((room) => {
      const roomDiv = document.createElement("div");
      roomDiv.className = `room ${room.available ? "" : "booked"}`;
      roomDiv.textContent = room.number;
      hotelDiv.appendChild(roomDiv);
    });
  });
}

// --- Booking Logic ---
function bookRooms(numberOfRooms) {
  if (numberOfRooms < 1 || numberOfRooms > 5) {
    alert("You can only book between 1 and 5 rooms.");
    return;
  }

  // Same-floor booking
  for (const floor of hotel.floors) {
    const availableRooms = floor.filter((room) => room.available);
    if (availableRooms.length >= numberOfRooms) {
      const bookedRooms = availableRooms.slice(0, numberOfRooms);
      bookedRooms.forEach((room) => (room.available = false));
      alert(
        `Rooms booked: ${bookedRooms.map((room) => room.number).join(", ")}`
      );
      displayHotel();
      return;
    }
  }

  // Cross-floor booking
  let totalRooms = [];
  for (const floor of hotel.floors) {
    const availableRooms = floor.filter((room) => room.available);
    totalRooms = totalRooms.concat(availableRooms);
    if (totalRooms.length >= numberOfRooms) {
      const bookedRooms = totalRooms.slice(0, numberOfRooms);
      bookedRooms.forEach((room) => (room.available = false));
      alert(
        `Rooms booked across floors: ${bookedRooms
          .map((room) => room.number)
          .join(", ")}`
      );
      displayHotel();
      return;
    }
  }

  alert("Not enough rooms available.");
}

// --- Randomize Room Occupancy ---
function randomizeOccupancy() {
  hotel.floors.forEach((floor) => {
    floor.forEach((room) => {
      room.available = Math.random() > 0.5; // 50% chance of being unavailable
    });
  });
  alert("Room statuses randomized.");
  displayHotel();
}

// --- Reset All Bookings ---
function resetBookings() {
  hotel.floors.forEach((floor) => {
    floor.forEach((room) => {
      room.available = true;
    });
  });
  alert("All rooms have been reset.");
  displayHotel();
}

// --- Event Listeners ---
document.getElementById("book-btn").addEventListener("click", () => {
  const numRooms = parseInt(document.getElementById("num-rooms").value, 10);
  bookRooms(numRooms);
});

document
  .getElementById("randomize-btn")
  .addEventListener("click", randomizeOccupancy);

document.getElementById("reset-btn").addEventListener("click", resetBookings);

// --- Initialize the Display ---
displayHotel();
