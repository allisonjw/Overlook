import domUpdates from './domUpdates.js';

class Hotel {
  constructor(usersData, roomsData, bookingsData, id) {
    this.guest = usersData;
    this.rooms = roomsData;
    this.bookings = bookingsData;
    this.user = this.findCustomerData(id);
  }

  findCustomerData(id) {
    return this.guest.find(guest => guest.id === id);
  }

  findRoomsBooked(id) {
    return this.bookings.filter(bookings => bookings.userID === id);
  }


}
    
export default Hotel;