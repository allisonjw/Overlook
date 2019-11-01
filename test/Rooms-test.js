import {expect} from 'chai';
import Rooms from '../src/Rooms';

import roomsData from '../test-data/rooms-data.js';


describe('Rooms', () => {

  let rooms;

  beforeEach(() => {
    rooms = new Rooms(roomsData);
  })

  it('should be an instance of Rooms', () => {
    expect(rooms).to.be.an.instanceOf(Rooms);
  })


});