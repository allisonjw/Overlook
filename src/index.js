import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel';
import Manager from '../src/Manager';
import Guest from '../src/Guest';
import domUpdates from './domUpdates.js';


import './images/big-leaf-bright-color-1029640.jpg';
import './images/beach-deck-dock-247447.jpg';
import './images/calm-clouds-exotic-297984.jpg';

let guestID;
let manager;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
  

]).then(data => manager = new Manager(data[0].users, data[1].bookings, data[2].rooms))
  .then(data => console.log(manager.guest))
  .then(data => console.log(manager))
  .then(data => openHotel(findCurrentDate()))
  .catch(error => console.log(error))
 

$('.login--btn').click((e) => {
  e.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();
  if (username === 'manager' && password === 'overlook2019') {
    window.location = './manager.html'
  } else if (username.includes('customer') && password === 'overlook2019') {
    window.location = './customer.html'
  } else {
    $('.requirements').addClass();
  }
})

const openHotel = (today) => {
  domUpdates.displayDate(findCurrentDate(today))
  domUpdates.displayPercentRooms(manager.getPercentOfRoomsOccupied(today));
  domUpdates.displayAvailability(manager.findRoomsAvailableToday(today));
  domUpdates.displayRevenue(manager.getTotalRevenueToday(today));
  domUpdates.displayGuestList(manager.users)
  $('.users__past-bookings').text(manager.guest.pastGuestRoomBookings());
//   domUpdates.displayUpcomingReservations(manager.guest.futureGuestRoomBookings());
  domUpdates.displayTotalRoomDollars(manager.guest.totalGuestRoomsSpent());
}

const findCurrentDate = () => {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  return `${year}/${month}/${day}`;
};

$('.section__guest').hide();
$('.section__bookings').hide();
$('.header__guest-name').hide();
$('.section__guest-resHistory').hide();
$('.section__guest-roomsTotal').hide();

$('.main__btn').click(()  => {
  $('.main__btn').addClass('main__btn-clicked');
  $('.bookings__btn').removeClass('bookings__btn-clicked');
  $('.guest__btn').removeClass('guest__btn-clicked');
  domUpdates.mainBtnHandler()
});

$('.bookings__btn').click(() => {
  $('.main__btn').removeClass('main__btn-clicked');
  $('.bookings__btn').addClass('bookings__btn-clicked');
  $('.guest__btn').removeClass('guest__btn-clicked');
  domUpdates.bookingsBtnHandler()
});

$('.guest__btn').click(() => {
  $('.main__btn').removeClass('main__btn-clicked');
  $('.bookings__btn').removeClass('bookings__btn-clicked');
  $('.guest__btn').addClass('guest__btn-clicked');
  domUpdates.guestBtnhandler()
});

$('.search__guest--btn').click((e) => {
  e.preventDefault()
  let id = $('.article__input-search').val;
  let guestID = manager.findGuestById(id);
  console.log(guestID)
  let pickGuest = $('.article__input-search').val();
  let name = $('.article__input-search option:selected').text()
  let guestBookings = manager.guest.pastGuestRoomBookings(guestID)
  let guestTotal = manager.guest.totalGuestRoomsSpent(guestID)
  handleGuestInfo(pickGuest)
  domUpdates.displayGuestName(name);
  domUpdates.displayBookingsForGuest(guestBookings);
  domUpdates.displayTotalRoomDollars(guestTotal)
});

$('.newRes__btn').click(() => {
  $('.newRes__btn').addClass('newRes__btn-clicked');
  $('.resHistory__btn').removeClass('resHistory__btn-clicked');
  $('.roomsTotal__btn').removeClass('roomsTotal__btn-clicked');
  domUpdates.reservationBtnHandler()
});

$('.resHistory__btn').click(() => {
  $('.newRes__btn').removeClass('newRes__btn-clicked');
  $('.resHistory__btn').addClass('resHistory__btn-clicked');
  $('.roomsTotal__btn').removeClass('roomsTotal__btn-clicked');
  domUpdates.pastReservationHandler()
});

$('.roomsTotal__btn').click(() => {
  $('.newRes__btn').removeClass('newRes__btn-clicked');
  $('.resHistory__btn').removeClass('resHistory__btn-clicked');
  $('.roomsTotal__btn').addClass('roomsTotal__btn-clicked');
  domUpdates.totalSpentHandler()
});

const handleGuestInfo = (guestName) => {
  manager.filterGuestByName(guestName);
}

$('.logout__btn').click(() => {
  window.location = './index.html';
});




  