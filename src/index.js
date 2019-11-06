import $ from 'jquery';
import './css/base.scss';
import Manager from '../src/Manager';
import Guest from './Guest';
import domUpdates from './domUpdates.js';


import './images/big-leaf-bright-color-1029640.jpg';
import './images/beach-deck-dock-247447.jpg';
import './images/calm-clouds-exotic-297984.jpg';

let userID;  //(WIP) -HOW TO GET USERID
let manager;


let usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json());

let bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json());

let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json());
  
Promise.all([usersData, bookingsData, roomsData])
  .then(data => manager = new Manager(data[0].users, data[1].bookings, data[2].rooms))
  .then(data => openHotel(domUpdates.findCurrentDate()))
  .catch(error => console.log(error))
 
//LOGIN VALIDATION (WIP) - HOW TO GET USER ID//MOVE TO GUEST?
$('.login--btn').click((e) => {
  e.preventDefault();
  let username = $('#username').val();
  let password = $('#password').val();
  if (username === 'manager' && password === 'overlook2019') {
    window.location = './manager.html'
    
  } else if (username.includes('customer') && password === 'overlook2019') { 
    userID = Number(username.split('r')[1]);  
    window.location = './customer.html'
    customerHandler(userID)
  } else {
    $.trim(username, password) === " " 
    $('.requirements').fadeIn(300);
  }
  return userID
});

let today = domUpdates.findCurrentDate();
$('.main__date').html(domUpdates.displayCurrentDate());

const openHotel = (today) => {
  domUpdates.displayPercentRooms(manager.getPercentOfRoomsOccupied(today));
  domUpdates.displayAvailability(manager.findRoomsAvailableToday(today));
  domUpdates.displayRevenue(manager.getTotalRevenueToday(today));
  domUpdates.displayGuestList(manager.users)
  $('.users__bookings-total').append(`$${manager.guest.totalGuestRoomsSpent(33, today)}`)
  $('.users__past-bookings').append(domUpdates.displayPastReservations(manager.guest.pastGuestRoomBookings(33, today)))
  $('.users__upcoming-bookings').append(domUpdates.displayUpcomingReservations(manager.guest.futureGuestRoomBookings(33, today)))
}

//POST METHOD (WIP)
$('.book__room--btn').click((e) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      id: Date.now(),
      userID: userID,
      date: $('.search__date--btn').val(),
      roomNumber: parseInt(roomnumber)
    })
  }).then(response => console.log('Room Booked Successfully!', response))
    .catch(error => console.log('postError', error))
  $(e.target).html('SUCCESS!')
});
  

//SECTIONS TO HIDE ON PAGE LOAD
$('.section__guest, .section__bookings, .header__guest-name, .section__guest-resHistory, .section__guest-roomsTotal').hide();


//EVENT HANDLERS FOR DOM
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

const customerHandler = (userID) => {
  let userName = manager.users.find(user => user.id === userID);
  console.log(userName.name)
  //   let guest = new Guest(userName.id, userName.name);
  $('#header__current-customer').append(`${userName.name}!`);
}

//DROP DOWN CALENDAR //SEARCH ROOMS
$('.search__date--btn').click((e) => {
  e.preventDefault();  
  let date = $('.article__date-search').val();
  let fixedDate = domUpdates.fixDate(date);
  let roomsAvailData = manager.guest.roomsAvailableForDate(fixedDate);
  $('.article__room-type').attr('disabled', false);
  domUpdates.displayAvailableRoomsByType(roomsAvailData);
}); 

$('.article__room-type').on('change', () => {
  $('.article__type-filter').attr('disabled', false);
  let type = $('.article__room-type').find(':selected').val();
  let date = $('.article__date-search').val();
  let roomsByDate = manager.guest.roomsAvailableForDate(date);
  let roomsByType = manager.guest.filterRoomsByType(roomsByDate, type);
  domUpdates.displayAvailableRoomsByType(roomsByType, date);
});
  
$('.article__type-filter').on('change', () => {
  $('.book__room--btn').attr('disabled', false);
});
  
$('.book__room--btn').click((e) => {
  e.preventDefault();  
  $('.book__room--btn').attr('disabled', true);
  let date = $('.article__type-filter').find(':selected').data('date');
  let roomNumber = $('.article__type-filter').find(':selected').data('number')
    
  manager.guest.newGuestBooking(date, roomNumber);
});

//SEARCH GUEST, SHOW IN HEAD AND DISPLAY RELEVANT INFO
$('.search__guest--btn').click((e) => {
  e.preventDefault()
  let pickedGuest = $('.article__input-search').val;
  let foundGuest = manager.filterGuestByName(pickedGuest)
  manager.currentGuest = foundGuest;
  let guestID = manager.findGuestById();
  console.log(guestID)
  let name = $('.article__input-search option:selected').text()
  let guestTotal = manager.guest.totalGuestRoomsSpent(userID)
  handleGuestInfo(pickedGuest)
  domUpdates.displayGuestName(name);
  $('.ul__guest-bookings').html('');
  let allBookings = manager.getAllGuestBooking()
  console.log(allBookings)
  domUpdates.displayBookingsForGuest(allBookings);
  domUpdates.displayTotalRoomDollars(guestTotal)
});
  
const handleGuestInfo = (guestName) => {
  manager.filterGuestByName(guestName);
};

$('.logout__btn').click(() => {
  window.location = './index.html';
});




  