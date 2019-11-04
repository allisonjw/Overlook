import $ from 'jquery';

const domUpdates = {

  displayDate(today) {
    $('.main__date').text(today);
  },

  displayPercentRooms(percentage) {
    $('.main__room-percent').append(percentage);
  },

  displayAvailability(available) {
    $('.main__rooms-available').text(available);
  },

  displayRevenue(revenue) {
    $('.main__revenue').append(`$${revenue}`);
  },
  
  displayGuestName(name) {
    $('#header__current-guest').text(name);
  },
  
  displayGuestList(usersData) {
    usersData.forEach(users => {
      $('.article__input-search').append(`<option value="${users.name}">${users.name}</option>`);
    })
  },

  displayGuestError() {
    $('.article__input-search').val()
    $('.guest__search--error').show();
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
    $('.section__customer-newReservations').show();
    $('.section__customer-resHistory').hide();
    $('.section__customer-roomsTotal').hide();
  },

  pastReservationHandler() {
    $('.section__customer-newReservations').hide();
    $('.section__customer-resHistory').show();
    $('.section__customer-roomsTotal').hide();
  },

  totalSpentHandler() {
    $('.section__customer-newReservations').hide();
    $('.section__customer-resHistory').hide();
    $('.section__customer-roomsTotal').show();
  },


  displayUpcomingReservations() {

  },

  displayPastReservations(past) {
    $('.users__past-bookings').text(past)
  },

  displayTotalRoomDollars(total) {
    $('.section__customer-roomsTotal').append(`$${total}`)
  },

  displayBookingsForGuest(bookingsData) {
    $('.article__input-bookings').html('');
    bookingsData.forEach(booking => {
      let bookingsList = $(`<li><h6>Date: ${booking.date}<br> Room Number: ${booking.roomNumber}</h6></li>`);
      $('.article__input-bookings').append(bookingsList);
    });
  },

  displayNewBookingForGuest(today, roomNumber) {
    let newBooking = $(`<li><h6>Date: ${today}<br> Room Number: ${roomNumber}</h6></li>`);
    $('.article__input-bookings').prepend(newBooking);
  },

  displayAvailableRoomsByType(roomsData, today) {
    roomsData.forEach(room => {
      let roomsList = $(`<option data-date='${today}' data-number='${room.number}' data-type='${room.roomType}' data-numBeds='${room.numBeds}' data-bedSize='${room.bedSize}' data-bidet='${room.bidet}'>A ${room.roomType} with ${room.numBeds} ${room.bedSize} bed(s), has bidet: ${room.bidet}</option>`)
      $('#available-rooms').append(roomsList);
    });
  },

  displayGuestTotalBill(guest, total) {
    $('#guest-name-bill').html(guest);
    $('#guest-amount-bill').html(`$${total}`);
  }

}

export default domUpdates;