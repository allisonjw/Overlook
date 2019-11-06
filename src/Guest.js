import Manager from '../src/Manager';
import domUpdates from './domUpdates.js';


class Guest {
  constructor(bookingsData, roomsData, id) {
    this.bookings = bookingsData;
    this.rooms = roomsData;
    this.id = id;
  }

  pastGuestRoomBookings(id, today) {
    return this.bookings.filter(booking => booking.userID === id && booking.date < today)
  }

  futureGuestRoomBookings(id, today) {
    return this.bookings.filter(booking => booking.userID === id && booking.date >= today)
  }

  totalGuestRoomsSpent(id) {
    return this.pastGuestRoomBookings(id).reduce((sum, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          return sum += room.costPerNight
        }  
      })
      return parseFloat(sum.toFixed(2))
    }, 0)
  }

  roomsAvailableForDate(today) {
    let roomNum = this.bookings.filter(booking => booking.date === today).map(room =>room.roomNumber)
    return this.rooms.filter(room => !roomNum.includes(room.number))
  }

  filterRoomsByType(today, type) {
    let availRoomsToday = this.roomsAvailableForDate(today);
    return availRoomsToday.filter(room => room.roomType === type);
  }

  newGuestBooking(id, date, roomNumber) {
    let newBooking = {
      userID: id,
      date: date,
      roomNumber: roomNumber
    };
    return newBooking;
  }
}

export default Guest;