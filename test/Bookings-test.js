import {expect} from 'chai';
import Bookings from '../src/Bookings';

import bookingsData from '../test-data/bookings-data.js';

describe('Bookings', () => {

  let bookings;

  beforeEach(() => {
    bookings = new Bookings(bookingsData);
  })

  it('should be an instance of Bookings', () => {
    expect(bookings).to.be.an.instanceOf(Bookings);
  })


});