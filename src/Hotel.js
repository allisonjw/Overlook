class Hotel {
  constructor(usersData, roomsData, bookingsData, id) {
    this.usersData = usersData;
    this.roomsData = roomsData;
    this.bookingsData = bookingsData;
    this.user = this.findCustomerData(id);
  }

  findCustomerData(id) {
    return this.usersData.find(usersData => usersData.id === id);
  }


}
    
export default Hotel;