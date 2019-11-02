import {expect} from 'chai';
import Manager from '../src/Manager';

import usersData from '../test-data/users-data.js';
import roomsData from '../test-data/rooms-data.js';
import bookingsData from '../test-data/bookings-data.js';

describe('Manager', () => {

  let manager;

  beforeEach(() => {
    manager = new Manager(usersData, roomsData, bookingsData, 1);
  })

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceof(Manager);
  });

  describe('findCustomer', () => {
    it('should be able to search through all guest data', () => {
      expect(manager.findCustomer(1)).to.eql({ id: 1, name: 'Leatha Ullrich' })
    });
  });


});