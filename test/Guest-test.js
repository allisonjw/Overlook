import {expect} from 'chai';
import Guest from '../src/Guest';

import usersData from '../test-data/users-data.js';

describe('Guest', () => {

  let guest;

  beforeEach(() => {
    guest = new Guest(usersData, 1);
  })

  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest);
  })


});
