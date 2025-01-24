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
  
  // Get current hotel status
  function getHotelStatus() {
    return hotel.floors.map((floor, index) => ({
      floor: index + 1,
      rooms: floor.map(room => ({
        number: room.number,
        available: room.available,
      })),
    }));
  }
  
  // Book rooms
  function bookRooms(numberOfRooms) {
    // Check same-floor availability first
    for (const floor of hotel.floors) {
      const availableRooms = floor.filter(room => room.available);
      if (availableRooms.length >= numberOfRooms) {
        availableRooms.slice(0, numberOfRooms).forEach(room => (room.available = false));
        return {
          message: 'Booking successful!',
          roomsBooked: availableRooms.slice(0, numberOfRooms).map(room => room.number),
        };
      }
    }
  
    // Check across multiple floors
    let totalRooms = [];
    for (const floor of hotel.floors) {
      const availableRooms = floor.filter(room => room.available);
      totalRooms = totalRooms.concat(availableRooms);
  
      if (totalRooms.length >= numberOfRooms) {
        totalRooms.slice(0, numberOfRooms).forEach(room => (room.available = false));
        return {
          message: 'Booking successful across floors!',
          roomsBooked: totalRooms.slice(0, numberOfRooms).map(room => room.number),
        };
      }
    }
  
    return { message: 'Not enough rooms available to complete the booking.' };
  }
  
  // Randomize room availability
  function randomizeOccupancy() {
    hotel.floors.forEach(floor => {
      floor.forEach(room => {
        room.available = Math.random() > 0.5;
      });
    });
  }
  
  // Reset all bookings
  function resetBookings() {
    hotel.floors.forEach(floor => {
      floor.forEach(room => {
        room.available = true;
      });
    });
  }
  
  module.exports = {
    getHotelStatus,
    bookRooms,
    randomizeOccupancy,
    resetBookings,
  };
  