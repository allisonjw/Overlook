import Hotel from '../src/Hotel';

class Manager extends Hotel {
  constructor(usersData, roomsData, bookingsData, id) {
    super(usersData, roomsData, bookingsData);
    this.usersData = usersData;
    this.roomsData = roomsData;
    this.bookingsData = bookingsData;
    this.id = id;
  
  }

  findCustomer(id = this.id) {
    return this.usersData.find(usersData => usersData.id === id)
  }
  
  findRoomsAvailableToday(today) {
    let roomsBooked = this.bookings.filter(booking => booking.date === today);
    return this.rooms.length - roomsBooked.length;
  }
  
  findRoomsBookedTotal(today) {
    let bookedRooms = this.bookings.filter(booking => booking.date === today)
    return bookedRooms.reduce((acc, roomBooked) => {
      this.rooms.forEach((room) => {
        if (room.number === roomBooked.roomNumber) {
          return acc += room.costPerNight
        }
      })
      return parseFloat(acc.toFixed(2))
    }, 0)
  }
 
  findRoomservicesTotal(today) {
    let orderTotal = this.roomServices.filter(order => order.date === today)
    return orderTotal.reduce((acc, room) => {
      acc += room.totalCost;
      return acc
    }, 0)
  }

  getTotalRevenueToday(today) {
    let total = this.findRoomsBookedTotal(today) + this.findRoomservicesTotal(today)
    return parseFloat(total.toFixed())
  }

  getPercentOfRoomsOccupied(today) {
    let percent = this.bookings.filter(booking => booking.date === today).length / this.rooms.length * 100
    return parseFloat(percent.toFixed())
  }
}
      
export default Manager;