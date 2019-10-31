import $ from 'jquery';

const domUpdates = {

  pageLoadHandler() {
    // $('main').hide();
    $('.section__guest').hide();
    $('.section__bookings').hide();
    $('.header__guest-name').hide();
    $('.splash-container').fadeOut(3000);
    $('main').fadeIn(3000);
    $('header').fadeIn(3000);
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
  
  displayGuestList(guestData) {
    guestData.forEach(guest => {
      $('.article__input-search').append(`<option value="${guest.name}">${guest.name}</option>`);
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

  roomServicesBtnHandler() {
    $('.section__main').hide();
    $('.section__bookings').hide();
    $('.section__guest').hide();
    // $('.header__guest-name').hide();
  },
}

export default domUpdates;