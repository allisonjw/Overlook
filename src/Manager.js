import Guest from './Guest';
import domUpdates from './domUpdates.js';

class Manager {
  constructor(usersData, bookingsData, roomsData, id, today) {
    this.users = usersData;
    this.guest = new Guest(bookingsData, roomsData)
    this.bookings = bookingsData;
    this.rooms = roomsData;
    this.id = id;
    this.today = today;
    this.user = this.findGuestById(id)
  }

  findGuestById(id) {
    return this.users.find(guest => guest.id === id)
  }
  
  findRoomsAvailableToday(today) {
    let roomsBooked = this.bookings.filter(booking => booking.date === today);
    return this.rooms.length - roomsBooked.length;
  }
  
  findRoomsBookedTotal(today) {
    let bookedRooms = this.bookings.filter(booking => booking.date === today)
    return bookedRooms.reduce((acc, bookedRoom) => {
      this.rooms.forEach((room) => {
        if (room.number === bookedRoom.roomNumber) {
          return acc += room.costPerNight
        }
      })
      return parseFloat(acc.toFixed(2))
    }, 0)
  }

  getTotalRevenueToday(today) {
    return parseFloat(this.findRoomsBookedTotal(today).toFixed())
  }

  getPercentOfRoomsOccupied(today) {
    let percent = this.bookings.filter(booking => booking.date === today).length / this.rooms.length * 100
    return parseFloat(percent.toFixed())
  }

  filterGuestByName(name) {
    return this.users.filter(guest => guest.name === name);
  }

  getGuest(name) {
    if (this.filterGuestByName(name)) {
      this.guest = new Guest(this.filterGuestByName(name).id, name);
    } else {
      domUpdates.displayGetError()
    }
  }
}
      
export default Manager;