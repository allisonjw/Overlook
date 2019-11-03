import {expect} from 'chai';
import Guest from '../src/Guest';

// import usersData from '../test-data/users-data.js';
import roomsData from '../test-data/rooms-data.js';
import bookingsData from '../test-data/bookings-data.js';

describe('Guest', () => {

  let guest;

  beforeEach(() => {
    guest = new Guest(bookingsData, roomsData, 1);
  });

  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest);
  });

  describe('pastGuestRoomBookings', () => {
    it('should be show rooms available for a specific date', () => {
      expect(guest.pastGuestRoomBookings(1, '2019/11/18')).to.eql([{
        id: 1572293130160,
        userID: 1,
        date: '2019/11/18',
        roomNumber: 5,
        roomServiceCharges: []
      }])
    });
  });

  describe('futureGuestRoomBookings', () => {
    it.skip('should be show rooms available for a specific date', () => {
      expect(guest.futureGuestRoomBookings(1)).to.eql([{}])
    });
  });

  describe('totalGuestRoomsSpent', () => {
    it.skip('should be show the total amount the guest has spent on rooms', () => {
      expect(guest.totalGuestRoomsSpent(1)).to.equal()
    });
  });
  
  describe('roomsAvailableForDate', () => {
    it('should be show rooms available for a specific date', () => {
      expect(guest.roomsAvailableForDate('2019/11/18')).to.eql([{
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 358.4,
        "numBeds": 1,
        "number": 1,
        "roomType": "residential suite"
      },
      {
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 477.38,
        "numBeds": 2,
        "number": 2,
        "roomType": "suite"
      },
      {
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 491.14,
        "numBeds": 1,
        "number": 3,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 429.44,
        "numBeds": 1,
        "number": 4,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 397.02,
        "numBeds": 1,
        "number": 6,
        "roomType": "junior suite"
      },
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 231.46,
        "numBeds": 2,
        "number": 7,
        "roomType": "single room",
      },
      {
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 261.26,
        "numBeds": 1,
        "number": 8,
        "roomType": "junior suite"
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 200.39,
        "numBeds": 1,
        "number": 9,
        "roomType": "single room"
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 497.64,
        "numBeds": 1,
        "number": 10,
        "roomType": "suite"
      },
      {
        "bedSize": "twin",
        "bidet": true,
        "costPerNight": 207.24,
        "numBeds": 2,
        "number": 11,
        "roomType": "single room"
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 172.09,
        "numBeds": 2,
        "number": 12,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 423.92,
        "numBeds": 2,
        "number": 13,
        "roomType": "single room"
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 457.88,
        "numBeds": 1,
        "number": 14,
        "roomType": "residential suite"
      },
      {
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 294.56,
        "numBeds": 1,
        "number": 15,
        "roomType": "residential suite"
      }]);
    });
  });

  describe('filterRoomsByType', () => {
    it('should be able to filter rooms by suite type', () => {
      expect(guest.filterRoomsByType('2019/11/18', 'suite')).to.eql([{
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 477.38,
        "numBeds": 2,
        "number": 2,
        "roomType": "suite"
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 497.64,
        "numBeds": 1,
        "number": 10,
        "roomType": "suite"
      }]);
    }); 
    it('should be able to filter rooms by residential suite type', () => {
      expect(guest.filterRoomsByType('2019/11/18', 'residential suite')).to.eql([{
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 358.4,
        "numBeds": 1,
        "number": 1,
        "roomType": "residential suite"
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 457.88,
        "numBeds": 1,
        "number": 14,
        "roomType": "residential suite"
      },
      {
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 294.56,
        "numBeds": 1,
        "number": 15,
        "roomType": "residential suite"
      }]);
    });  
    it('should be able to filter rooms by single room type', () => {  
      expect(guest.filterRoomsByType('2019/11/18', 'single room')).to.eql([{
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 491.14,
        "numBeds": 1,
        "number": 3,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 429.44,
        "numBeds": 1,
        "number": 4,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 231.46,
        "numBeds": 2,
        "number": 7,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 200.39,
        "numBeds": 1,
        "number": 9,
        "roomType": "single room"
      },
      {
        "bedSize": "twin",
        "bidet": true,
        "costPerNight": 207.24,
        "numBeds": 2,
        "number": 11,
        "roomType": "single room"
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 172.09,
        "numBeds": 2,
        "number": 12,
        "roomType": "single room"
      },
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 423.92,
        "numBeds": 2,
        "number": 13,
        "roomType": "single room"
      }]);
    });  
    it('should be able to filter rooms by junior suite type', () => {  
      expect(guest.filterRoomsByType('2019/11/18', 'junior suite')).to.eql([{
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 397.02,
        "numBeds": 1,
        "number": 6,
        "roomType": "junior suite",
      },
      {
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 261.26,
        "numBeds": 1,
        "number": 8,
        "roomType": "junior suite"
      }])
    });
  });

  describe('newGuestBooking', () => {
    it.skip('should be able make a new booking', () => {
      expect(guest.newGuestBooking('2019/11/18')).to.eql([{}])
    });
  });


});
