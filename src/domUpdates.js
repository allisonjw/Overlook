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
  
  displayGuestName(name) {
    $('#header__current-guest').append(name);
  },
  
  displayGuestList(usersData) {
    usersData.forEach(users => {
      $('.article__input-search').append(`<option value="${users.name}">${users.name}</option>`);
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

  displayUpcomingReservations() {

  },

  displayPastReservations(past) {
    $('.users__past-bookings').append(`${past}`)
  },

  displayTotalRoomDollars(total) {
    $('.users__bookings-total').append(`$${total}`)
    $('.guest__total').append(`$${total}`)
  },

  displayBookingsForGuest(bookingsData) {
    $('.ul__guest-bookings').html('');
    bookingsData.forEach(booking => {
      let bookingsList = $(`<li><h6>Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li></ul>`);
      $('.ul__guest-bookings').append(bookingsList);
    });
  },

  displayNewBookingForGuest(date, roomNumber) {
    let newBooking = $(`<li><h6>Date: ${date}<br> Room Number: ${roomNumber}</h6></li>`);
    $('.ul__guest-bookings').prepend(newBooking);
  },

  displayAvailableRoomsByType(roomsData, today) {
    roomsData.forEach(room => {
      let roomsList = $(`<option data-date='${today}' data-number='${room.number}' data-type='${room.roomType}' data-numBeds='${room.numBeds}' data-bedSize='${room.bedSize}' data-bidet='${room.bidet}'>A ${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s), has bidet: ${room.bidet}</option>`)
      $('.article__type-filter').append(roomsList);
    });
  }

}

export default domUpdates;