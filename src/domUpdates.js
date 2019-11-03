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
    // $('.header__guest-name').hide();
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
    // $('.header__guest-name').hide();
  },

}

export default domUpdates;