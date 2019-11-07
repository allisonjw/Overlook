import {expect} from 'chai';
import Manager from '../src/Manager';
import usersData from '../test-data/users-data.js';
import roomsData from '../test-data/rooms-data.js';
import bookingsData from '../test-data/bookings-data.js';

describe('Manager', () => {

  let manager;

  beforeEach(() => {
    manager = new Manager(usersData, bookingsData, roomsData);
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

  describe('findRoomsAvailableToday', () => {
    it('should return number of room available today', () => {
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
      expect(manager.getTotalRevenueToday('2019/11/18')).to.equal(340);
    });
  });

  describe('getPercentOfRoomsOccupied', () => {
    it('should return percent of rooms occupied for today', () => {
      expect(manager.getPercentOfRoomsOccupied('2019/11/18')).to.equal(6)
    });
  });

  describe('filterGuestByName', () => {
    it('should be able to search through all guest data', () => {
      expect(manager.filterGuestByName('Leatha Ullrich')).to.eql([{ id: 1, name: 'Leatha Ullrich' }])
    });
  });

  describe('deleteBookingID', () => {
    it('should be able to delete bookings', () => {
      expect(manager.deleteBookingID(1572293130160)).to.eql({ id: 1572293130160 })
    });
  });


});