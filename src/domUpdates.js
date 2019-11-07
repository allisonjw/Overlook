import $ from 'jquery';

const domUpdates = {

  fixDate(date) {
    let splitDate = date.split('-');
    return `${splitDate[0]}/${splitDate[1]}/${splitDate[2]}`
  },

  findCurrentDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    return `${year}/${month}/${day}`;
  },

  displayCurrentDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let currentDate = new Date();
    return `${days[currentDate.getDay()]} -
    ${months[currentDate.getMonth()]} ${currentDate.getDate()},${currentDate.getFullYear()}`;
  },  

  displayPercentRooms(percentage) {
    $('.main__room-percent').append(percentage);
  },

  displayAvailability(available) {
    $('.main__rooms-available').append(available);
  },

  displayRevenue(revenue) {
    $('.main__revenue').append(`$${revenue}`);
  },
  
  displayGuestNameManager(name) {
    $('#header__current-guest').append(name);
  },

  displayGuestNameCustomer(name) {
    $('#header__current-customer').append(name);
  },
  
  displayGuestList(usersData) {
    usersData.forEach(users => {
      $('.article__input-search').append(`<option value="${users.id}" id="${users.id}-option">${users.id} ${users.name}</option>`);
    })
  },

  displayLoginError() {
    $('.requirements').addClass();
  },

  mainBtnHandler() {
    $('.section__guest').hide();
    $('.section__bookings').hide();
    $('.section__main').show();
  },

  guestBtnhandler() {
    $('.section__main').hide();
    $('.section__bookings').hide();
    $('.section__guest').show();
    $('.header__guest-name').show();
  },

  bookingsBtnHandler() {
    $('.section__main').hide();
    $('.section__bookings').show();
    $('.section__guest').hide();
  },

  reservationBtnHandler() {
    $('.section__guest-newReservations').show();
    $('.section__guest-resHistory').hide();
    $('.section__guest-roomsTotal').hide();
  },

  pastReservationHandler() {
    $('.section__guest-newReservations').hide();
    $('.section__guest-resHistory').show();
    $('.section__guest-roomsTotal').hide();
  },

  totalSpentHandler() {
    $('.section__guest-newReservations').hide();
    $('.section__guest-resHistory').hide();
    $('.section__guest-roomsTotal').show();
  },

  displayUpcomingReservations(newBookings) {
    newBookings.forEach(booking => {
      let upcomingRes = $(`
      <div class="div_guest-new--bookings"><h4>CONFIRMATION NUMBER: ${booking.id}</h4>
      <p>${booking.date}</p><p>ROOM NUMBER: ${booking.roomNumber}</p>
      </div>`)
      $('.users__upcoming-bookings').append(upcomingRes)
    });
  },

  displayPastReservations(bookingsData) {
    bookingsData.forEach(booking => {
      let pastRes = $(`
      <div class="div_guest-past--bookings"><h4>CONFIRMATION NUMBER: ${booking.id}</h4>
      <p>${booking.date}</p><p>ROOM NUMBER: ${booking.roomNumber}</p>
      </div>`)
      $('.users__past-bookings').append(pastRes);
    });
  },

  displayTotalRoomDollars(total) {
    $('.users__bookings-total').append(`$${total}`)
    $('.guest__total').append(`$${total}`)
  },

//(WIP)FOR MNGR TO VIEW GUEST BOOKINGS
  displayBookingsForGuest(bookingsData) {
    bookingsData.forEach(booking => {
      let bookingsList = $(`<li><h6>Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li></ul>`);
      $('.ul__guest-bookings').append(bookingsList);
    });
  },

  //displays on customer for 'Pick Avail Room'
  displayAvailableRoomsByType(roomsData, today) {
    roomsData.forEach(room => {
      let roomsList = $(`<option data-date='${today}' data-number='${room.number}' data-type='${room.roomType}' data-numBeds='${room.numBeds}' data-bedSize='${room.bedSize}' data-bidet='${room.bidet}'>A ${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s), has bidet: ${room.bidet}</option>`)
      $('.article__avail-rooms').append(roomsList);
    });
  }

}

export default domUpdates;