import $ from 'jquery';
import domUpdates from './domUpdates.js';
import './css/base.scss';
import Hotel from './Hotel';

import './images/big-leaf-bright-color-1029640.jpg';
import './images/beach-deck-dock-247447.jpg';

let currentUserID;

let usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(json => json.users);

let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(json => json.rooms);

let bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(json => json.bookings);

let hotel, users, manager, rooms, bookings;

$('.customer__login--btn').on('click', (e) => {
  e.preventDefault();
  currentUserID = parseInt($('.customer__username').val());
  hotel = new Hotel(usersData, roomsData, bookingsData, currentUserID);
  users = new Users(roomsData, bookingsData, currentUserID);
  manager = new Manager(usersData, roomsData, bookingsData, currentUserID);
  rooms = new Rooms(roomsData, currentUserID);
  bookings = new Bookings(bookingsData, currentUserID);
  openHotel()
});

Promise.all([usersData, roomsData, bookingsData])
  .then(data => {
    usersData = data[0];
    roomsData = data[1];
    bookingsData = data[2];
  })
  .catch(error => console.log(error));

const openHotel = (today) => {
  domUpdates.displayDate(findCurrentDate())
//   domUpdates.displayPercentRooms(hotel.getPercentOfRoomsOccupied(today));
//   domUpdates.displayAvailability(hotel.findRoomsAvailableToday(today));
//   domUpdates.displayRevenue(hotel.getTotalRevenueToday(today));
//   domUpdates.displayMostPopularDate(hotel.getMostPopularBookingDate());
//   domUpdates.displayLeastPopularDate(hotel.getLeastPopularBookingDate());
//   domUpdates.displayGuestList(hotel.guest)
}

const findCurrentDate = () => {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  return `${year}/${month}/${day}`;
};

$('.manager__login--btn').on('click', () => {
  window.location = "./manager.html";
//   domUpdates.mngrPageLoadHandler();
});

$('.customer__login--btn').on('click', () => {
  window.location = "./customer.html";
  //   domUpdates.cstmrPageLoadHandler();

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

$('.logout__btn').click(() => {
  document.location.reload();
});
  
// const handleGuestInfo = (guestName) => {
//   hotel.findCustomer(guestName);
// }