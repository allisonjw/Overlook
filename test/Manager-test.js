import chai, {expect} from 'chai';
import Manager from '../src/Manager';
import domUpdates from '../src/domUpdates.js';
import usersData from '../test-data/users-data.js';
import roomsData from '../test-data/rooms-data.js';
import bookingsData from '../test-data/bookings-data.js';
import spies from 'chai-spies';
chai.use(spies);

describe('Manager', () => {

  let manager;

  beforeEach(() => {
    manager = new Manager(usersData, bookingsData, roomsData, 1);
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceof(Manager);
  });

  describe('findGuestById', () => {
    it('should be able to search through all guest data', () => {
      expect(manager.findGuestById(1)).to.eql({ id: 1, name: 'Leatha Ullrich' })
    });
  });

  describe('getAllGuestBooking', () => {
    it('should be to return all guest bookings', () => {
      expect(manager.getAllGuestBooking(2)).to.eql([
        { userID: 2, date: '2019/11/11', roomNumber: 2, id: 1572998363243 },
        { userID: 2, date: '2019/11/11', roomNumber: 24, id: 1572998379769 }
      ])
    });
  });

  describe('findRoomsAvailableToday', () => {
    it('should return number of room available today', () => {
      chai.spy.on(domUpdates, 'displayAvailability', () => 14)  
      manager.findRoomsAvailableToday();
      //   expect(domUpdates.displayAvailability).to.have.been.called(1);
      expect(manager.findRoomsAvailableToday('2019/11/18')).to.eql(15);
    });
  });

  describe('findRoomsBookedTotal', () => {
    it('should return total revenue of rooms booked today', () => {
      expect(manager.findRoomsBookedTotal('2019/11/18')).to.equal(340.17);
    });
  });
 
  describe('getTotalRevenueToday', () => {
    it('should return total revenue for today', () => {
      chai.spy.on(domUpdates, 'displayRevenue', () => 340)  
      manager.getTotalRevenueToday();
      //   expect(domUpdates.displayRevenue).to.have.been.called(1);
      expect(manager.getTotalRevenueToday('2019/11/18')).to.equal(340);
    });
  });

  describe('getPercentOfRoomsOccupied', () => {
    it('should return percent of rooms occupied for today', () => {
      chai.spy.on(domUpdates, 'displayPercentRooms', () => 7)  
      manager.getPercentOfRoomsOccupied();
      //   expect(domUpdates.displayPercentRooms).to.have.been.called(1);
      expect(manager.getPercentOfRoomsOccupied('2019/11/18')).to.equal(6)
    });
  });

  describe('filterGuestByName', () => {
    it('should be able to search through all guest data', () => {
      expect(manager.filterGuestByName('Leatha Ullrich')).to.eql([{ id: 1, name: 'Leatha Ullrich' }])
    });
  });

  describe('findBooking', () => {
    it('should be able to find a specific booking id by date and room number', () => {
      expect(manager.findBooking(48,'2019/11/14', 18)).to.equal(1572293130161)
    })
  });

 


});