import Hotel from '../src/Hotel';
import Guest from './Guest';
import domUpdates from './domUpdates.js';


class Manager {
  constructor(usersData, bookingsData, roomsData, id) {
    this.users = usersData;
    this.bookings = bookingsData;
    this.rooms = roomsData;
    this.id = usersData.id;
    this.guest = new Guest(bookingsData, roomsData)
    // this.user = this.findGuestById(id)
    this.currentGuest;
  }

  findGuestById(id) {
    return this.users.find((user) => {
      return user.id === parseInt(id);
    });
  }

  getAllGuestBooking(id = this.id) {
    let myBookings = []
    this.bookings.forEach(booking => {
      if (booking.userID === id) {
        myBookings.push(booking)
      }
    })
    return myBookings
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

  getAPIFetchData(url, type) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.data = data[type];
        return this.data
      })
      .catch(err => console.log(err));
  }
}
      
export default Manager;