//МЕНЮ
//Всплывающее окно с временным паролем
var btnNewPassword = document.querySelector(".menu__supportButton");
var popNewPassword = document.querySelector(".pop--password");
var btnNewPasswordClose = popNewPassword.querySelector(".pop__buttonClose");
var overlay = document.querySelector(".overlay");

btnNewPassword.addEventListener("click", function(event) {
  event.preventDefault();

  popNewPassword.classList.add("pop--active");
  overlay.classList.add("overlay--active");

  overlay.addEventListener("click", function(event) {
    event.preventDefault();
    popNewPassword.classList.remove("pop--active");
    overlay.classList.remove("overlay--active");
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popNewPassword.classList.contains("pop--active")) {
        popNewPassword.classList.remove("pop--active");
        overlay.classList.remove("overlay--active");
      }
    }
  });

  btnNewPasswordClose.addEventListener("click", function(event) {
    event.preventDefault();
    popNewPassword.classList.remove("pop--active");
    overlay.classList.remove("overlay--active");
  });
});

// копирование пароля в буфер обмена

var btnCopy = document.querySelector('.pop__btnCopy');

if (btnCopy) {
  btnCopy.addEventListener('click', function() {

    var popPassword = document.querySelector('.js__password');

    var range = document.createRange();
    range.selectNode(popPassword);
    window.getSelection().addRange(range);

    try {
      document.execCommand('copy');
    } catch (err) {
      console.log('Can`t copy, boss');
    }

    window.getSelection().removeAllRanges();
  });
}


//разворачивание/сворачивание бокового меню
function menuOpen(button) {
  var menu = button.parentElement;

  if (menu.classList.contains("menu--closed")) {
    menu.classList.remove("menu--closed");
    menu.classList.add("menu--opened");
  } else {
    menu.classList.add("menu--closed");
    menu.classList.remove("menu--opened");
  }

}

// //Прилипание шапки при прокрутке

// var headerFixed = (function() {
//
//   var docElem = document.documentElement,
//     header = document.querySelector(".header"),
//     didScroll = false,
//     changeHeaderOn = 10;
//
//   function init() {
//     window.addEventListener("scroll", function(event) {
//       if (!didScroll) {
//         didScroll = true;
//         setTimeout(scrollPage, 250);
//       }
//     }, false);
//   }
//
//   function scrollPage() {
//     var sy = scrollY();
//     if (sy >= changeHeaderOn) {
//       header.classList.add("header--fix");
//     } else {
//       header.classList.remove("header--fix");
//     }
//     didScroll = false;
//   }
//
//   function scrollY() {
//     return window.pageYOffset || docElem.scrollTop;
//   }
//
//   init();
//
// })();
