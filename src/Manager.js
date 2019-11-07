import Hotel from '../src/Hotel';
import Guest from './Guest';
import domUpdates from './domUpdates.js';


class Manager {
  constructor(usersData, bookingsData, roomsData, id) {
    this.users = usersData;
    this.bookings = bookingsData;
    this.rooms = roomsData;
    this.id = id;
    this.guest = new Guest(bookingsData, roomsData, id)
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

  findBooking(userID, date, room ) {
    let cat = this.guest.futureGuestRoomBookings(userID, date, room).find(booking => booking.roomNumber === room && booking.date === date)
    console.log(cat)
  }

  
  deleteBooking(id) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    }).then(() => {
      alert('Booking Deleted!');
    }).catch(() => 'Delete failed to happen');
  }

}
      
export default Manager;