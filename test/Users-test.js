import {expect} from 'chai';
import Users from '../src/Users';

import usersData from '../test-data/users-data.js';

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users(usersData, 1);
  })

  it('should be an instance of Users', () => {
    expect(users).to.be.an.instanceOf(Users);
  })


});
