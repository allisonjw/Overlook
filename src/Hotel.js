import domUpdates from './domUpdates.js';

class Hotel {
  constructor(usersData, bookingsData, roomsData, id) {
    this.users = usersData;
    this.bookings = bookingsData;
    this.rooms = roomsData;
    // this.user = this.findCustomerData(id);
  }

  findCustomerData(id) {
    return this.users.find(guest => guest.id === id);
  }

  findRoomsBooked(id) {
    return this.bookings.filter(bookings => bookings.userID === id);
  }


}
    
export default Hotel;