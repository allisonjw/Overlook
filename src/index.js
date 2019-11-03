import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel';
import Manager from '../src/Manager';
import Guest from '../src/Guest';
import domUpdates from './domUpdates.js';


import './images/big-leaf-bright-color-1029640.jpg';
import './images/beach-deck-dock-247447.jpg';

let currentUserID
let manager


Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
]).then(data => manager = new Manager(data[0].users, data[1].bookings, data[2].rooms))
  .then(data => openHotel(findCurrentDate()))
  .then(data => console.log(manager))
  .catch(error => console.log(error));

$('.customer__login--btn').click((e) => {
  e.preventDefault();
  currentUserID = parseInt($('.customer__username').val());
});

const openHotel = (today) => {
  domUpdates.displayDate(findCurrentDate(today))
  domUpdates.displayPercentRooms(manager.getPercentOfRoomsOccupied(today));
  domUpdates.displayAvailability(manager.findRoomsAvailableToday(today));
  domUpdates.displayRevenue(manager.getTotalRevenueToday(today));
  domUpdates.displayGuestList(manager.guest)
}

const findCurrentDate = () => {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  return `${year}/${month}/${day}`;
};

$('.customer__login--btn').click((e) => {
  e.preventDefault();
  currentUserID = parseInt($('.customer__username').val());
});

$('.section__guest').hide();
$('.section__bookings').hide();
$('.header__guest-name').hide();
$('.section__customer-resHistory').hide();
$('.section__customer-roomsTotal').hide();

$('.manager__login--btn').click(() => {
  window.location = "./manager.html";
});

$('.customer__login--btn').click(() => {
  window.location = "./customer.html";
});

$('.main__btn').click(()  => {
  $('.main__btn').addClass('main__btn-clicked');
  $('.roomServices__btn').removeClass('roomServices__btn-clicked');
  $('.bookings__btn').removeClass('bookings__btn-clicked');
  $('.guest__btn').removeClass('guest__btn-clicked');
  domUpdates.mainBtnHandler()
});

$('.bookings__btn').click(() => {
  $('.main__btn').removeClass('main__btn-clicked');
  $('.roomServices__btn').removeClass('roomServices__btn-clicked');
  $('.bookings__btn').addClass('bookings__btn-clicked');
  $('.guest__btn').removeClass('guest__btn-clicked');
  domUpdates.bookingsBtnHandler()
});

$('.guest__btn').click(() => {
  $('.main__btn').removeClass('main__btn-clicked');
  $('.roomServices__btn').removeClass('roomServices__btn-clicked');
  $('.bookings__btn').removeClass('bookings__btn-clicked');
  $('.guest__btn').addClass('guest__btn-clicked');
  domUpdates.guestBtnhandler()
});

$('.search__guest--btn').click((e) => {
  e.preventDefault()
  let pickGuest = $('.article__input-search').val();
  let name = $('.article__input-search option:selected').text()
  handleGuestInfo(pickGuest)
  domUpdates.displayGuestName(name);
});

$('.add__guest--btn').click((e) => {
  e.preventDefault()
  let newGuest = $('.article__input-add').val();
  let newGuestName = $('.article__input-add').val();
  domUpdates.displayGuestName(newGuestName);
  handleGuestInfo(newGuest)
});

const handleGuestInfo = (guestName) => {
  manager.findCustomer(guestName);
}

$('.logout__btn').click(() => {
  document.location.reload();
});




  