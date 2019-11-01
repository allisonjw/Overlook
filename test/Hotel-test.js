import {expect} from 'chai';
import Hotel from '../src/Hotel';

import usersData from '../test-data/users-data.js';
import roomsData from '../test-data/rooms-data.js';
import bookingsData from '../test-data/bookings-data.js';

describe('Hotel', () => {

  let hotel;

  beforeEach(() => {
    hotel = new Hotel(usersData, roomsData, bookingsData);
  })

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  describe('filterCustomerData', () => {
    it('should be able to search through all guest data', () => {
      expect(hotel.filterCustomerData('Matilde Larson')).to.eql([{ id: 1, name: 'Matilde Larson' }])
    });
  });


});