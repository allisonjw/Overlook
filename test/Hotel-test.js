import {expect} from 'chai';
import Hotel from '../src/Hotel';

import usersData from '../test-data/users-data.js';
import roomsData from '../test-data/rooms-data.js';
import bookingsData from '../test-data/bookings-data.js';

describe('Hotel', () => {

  let hotel;

  beforeEach(() => {
    hotel = new Hotel(usersData, roomsData, bookingsData, 1);
  })

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  describe('findCustomerData', () => {
    it('should be able to search through all guest data', () => {
      expect(hotel.findCustomerData(1)).to.eql({ id: 1, name: 'Leatha Ullrich' })
    });
  });

  describe('findRoomsBooked', () => {
    it('should be able to search through all guest data', () => {
      expect(hotel.findRoomsBooked(1)).to.eql([{
        id: 1572293130160,
        userID: 1,
        date: '2019/11/18',
        roomNumber: 5,
        roomServiceCharges: []
      }])
    });
  });


});