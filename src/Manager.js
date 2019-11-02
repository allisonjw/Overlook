import domUpdates from './domUpdates.js';
import Hotel from '../src/Hotel';
import Users from '../src/Users';

class Manager extends Hotel {
  constructor(usersData, roomsData, bookingsData, id, today) {
    super(usersData, roomsData, bookingsData, id);
    this.usersData = usersData;
    this.roomsData = roomsData;
    this.bookingsData = bookingsData;
    this.id = id;
    this.today = today;
  }

  findCustomerById(id = this.id) {
    return this.usersData.find(usersData => usersData.id === id)
  }
  
  findRoomsAvailableToday(today) {
    let roomsBooked = this.bookingsData.filter(booking => booking.date === today);
    return this.roomsData.length - roomsBooked.length;
  }
  
  findRoomsBookedTotal(today) {
    let bookedRooms = this.bookingsData.filter(booking => booking.date === today)
    return bookedRooms.reduce((acc, bookedRoom) => {
      this.roomsData.forEach((room) => {
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
    let percent = this.bookingsData.filter(booking => booking.date === today).length / this.roomsData.length * 100
    return parseFloat(percent.toFixed())
  }

  filterCustomerByName(name) {
    return this.usersData.filter(usersData => usersData.name === name);
  }

  getCustomer(name) {
    if (this.filterCustomerByName(name)) {
      this.users = new Users(this.filterCustomerByName(name).id, name);
    } else {
      domUpdates.displayGetError()
    }
  }
}
      
export default Manager;