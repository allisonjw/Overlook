import $ from 'jquery';

import './css/base.scss';

import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

let username = $('#customer__username')

$('.login__btn').on('click', () => {
  if (username === 'manager') {
    window.navigate = "./manager.html";
  } else {
    window.navigate = "./customer.html";
  }
});