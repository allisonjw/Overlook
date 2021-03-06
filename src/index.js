import $ from 'jquery';
import './css/base.scss';
import Manager from '../src/Manager';
import Guest from './Guest';
import domUpdates from './domUpdates.js';


import './images/big-leaf-bright-color-1029640.jpg';
import './images/beach-deck-dock-247447.jpg';
import './images/calm-clouds-exotic-297984.jpg';

let userID; 
let manager;
let guestID; 
let currentGuest;


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
    localStorage.setItem('userID', userID)  
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
  userID = parseInt(localStorage.getItem('userID'))
  domUpdates.displayPercentRooms(manager.getPercentOfRoomsOccupied(today));
  domUpdates.displayAvailability(manager.findRoomsAvailableToday(today));
  domUpdates.displayRevenue(manager.getTotalRevenueToday(today));
  domUpdates.displayGuestList(manager.users)
  $('.users__bookings-total').append(`$${manager.guest.totalGuestRoomsSpent(userID, today)}`);
  $('.users__past-bookings').append(domUpdates.displayPastReservations(manager.guest.pastGuestRoomBookings(userID, today)));
  $('.users__upcoming-bookings').append(domUpdates.displayUpcomingReservations(manager.guest.futureGuestRoomBookings(userID, today)));
}

//POST METHOD (WIP)
$('.book__room--btn').click((e, userID) => {
  e.preventDefault();
  userID = parseInt(localStorage.getItem('userID'))
  let dateVal = $('.article__date-search').val();
  let date = domUpdates.fixDate(dateVal);
  // let bookingDate = $('.article__avail-rooms').find(':selected').data('date')
  let roomNumber = $('.article__avail-rooms').find(':selected').data('number');
  let postBody = manager.guest.makeNewBooking(userID, date, roomNumber);

  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', { 
    method: 'Post', 
    headers: { 
      'Content-Type': "application/json" 
    }, 
    body: JSON.stringify(postBody)
  })
    .then(response => console.log('Thanks for your Reservation!!', response))
    .catch(error => console.log('There was error with your Reservation', error))
});


//DELETE METHOD
const deleteUserBooking = (deleteBody) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(deleteBody)
    })
    .then(response => console.log('Delete Processed', response))
    .catch(error => console.log('Delete Fail', error))
}

//CREATE THE BODY FOR DELETE
$('.delete__booking--btn').click((e) => {
  e.preventDefault();
  let deleteConfirm = $('#cancel-booking').val();
  guestID = $('.article__input-search').val();
  let selectedGuest = manager.findGuestById(guestID);
  let findUserBookingID = manager.guest.futureGuestRoomBookings(selectedGuest.id, today).map(booking => booking.id)
  if (findUserBookingID.includes(Number(deleteConfirm))) { 
    let deleteBody = manager.deleteBookingID(deleteConfirm);
    deleteUserBooking(deleteBody)
  }
}); 

//SECTIONS TO HIDE ON PAGE LOAD
$('.section__guest, .article__bookRoom-container, .section__bookings, .header__guest-name, .section__guest-resHistory, .section__guest-roomsTotal').hide();

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

$('.access__booking--btn').click(() => {
  $('.article__bookRoom-container').show();
  $('.article__enterBookForm-container').hide() 
})

$('.access__booking--btn').click(() => {
  userID = parseInt(localStorage.getItem('userID'))
  let userName = manager.users.find(user => user.id === userID);
  currentGuest = manager.findGuestById(userID) 
  guestID = $('.article__input-search').val();
  handleGuestInfo(name)
  domUpdates.displayGuestNameCustomer(userName.name);
});
  
$('.search__date--btn').click((e) => {
  e.preventDefault();  
  let date = $('.article__date-search').val();
  let fixedDate = domUpdates.fixDate(date);
  let roomsAvailData = manager.guest.roomsAvailableForDate(fixedDate);
  $('.article__room-type').attr('disabled', false);
  domUpdates.displayAvailableRoomsByType(roomsAvailData);
}); 

$('.article__room-type').on('change', () => {
  $('.article__avail-rooms').attr('disabled', false);
  let type = $('.article__room-type').find(':selected').val();
  let date = $('.article__date-search').val();
  let roomsByDate = manager.guest.roomsAvailableForDate(date);
  let roomsByType = manager.guest.filterRoomsByType(roomsByDate, type);
  domUpdates.displayAvailableRoomsByType(roomsByType, date);
});
  
$('.article__avail-rooms').on('change', () => {
  $('.book__room--btn').attr('disabled', false);
});

$('.search__guest--btn').click((e) => {
  e.preventDefault()
  guestID = $('.article__input-search').val();
  let name = $('.article__input-search option:selected').text().split(' ')[1]
  handleGuestInfo(name)
  let selectedGuest = manager.findGuestById(guestID) 
  domUpdates.displayGuestNameManager(name);
  $('.guest__total').append(`$${manager.guest.totalGuestRoomsSpent(selectedGuest.id, today)}`);
  $('.ul__guest-bookings').html('');
  $('.ul__guest-bookings').append(domUpdates.displayBookingsForGuest(manager.guest.futureGuestRoomBookings(selectedGuest.id, today)));
});
  
const handleGuestInfo = (guestName) => {
  manager.filterGuestByName(guestName);
};

$('.logout__btn').click(() => {
  window.location = './index.html';
});




  