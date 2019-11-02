import $ from 'jquery';

const domUpdates = {

  mngrPageLoadHandler() {
    $('.section__main').show()
    $('.section__guest').hide();
    $('.section__bookings').hide();
    $('.header__guest-name').hide();
  },

  cstmrPageLoadHander() {
    $('.section__customer-newReservations').show();
    $('.section__customer-resHistory').hide();
    $('.section__customer-roomsTotal').hide();
  },

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

  displayMostPopularDate(mostPop) {
    $('.popular__booking--date').text(mostPop)
  },
  
  displayLeastPopularDate(leastPop) {
    $('.most__rooms--avail').text(leastPop)
  },
  
  displayGuestName(name) {
    $('#header__current-guest').text(name);
  },
  
  displayGuestList(usersData) {
    usersData.forEach(user => {
      $('.article__input-search').append(`<option value="${user.name}">${user.name}</option>`);
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