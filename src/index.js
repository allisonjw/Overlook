import $ from 'jquery';
import domUpdates from './domUpdates.js';
import './css/base.scss';

import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

const findCurrentDate = () => {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  return `${year}/${month}/${day}`;
};

// let username = $('#customer__username')

// $('.login__btn').on('click', () => {
//   if (username === 'manager') {
//     window.navigate = "./manager.html";
//   } else {
//     window.navigate = "./customer.html";
//   }
// });

$('main').hide()
$('header').hide()
  
$('.login__btn').click(()  => {
  domUpdates.pageLoadHandler();
  $('.splash__container').hide();
  $('main').show();
  $('header').show()
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
  
// const handleGuestInfo = (guestName) => {
//   hotel.findCustomer(guestName);
// }