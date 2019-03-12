

//открытие подробных оценок
function openResult(btn) {
  var popResult = document.querySelector(".pop--result");
  var overlay = document.querySelector(".overlay");
  var btnResultClose = popResult.querySelector(".pop__buttonClose");

  popResult.classList.add("pop--active");
  overlay.classList.add("overlay--active");

  $('.result__list').slick({
    asNavFor: '.result__list--referee',
    mobileFirst: true,
    slidesToShow: 7,
    infinite: false
  });

  $('.result__list--referee').slick({
    asNavFor: '.result__list',
    mobileFirst: true,
    arrows: false,
    slidesToShow: 7,
    infinite: false
  });


  overlay.addEventListener("click", function(event) {
    event.preventDefault();
    popResult.classList.remove("pop--active");
    overlay.classList.remove("overlay--active");
  });

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (popResult.classList.contains("pop--active")) {
        popResult.classList.remove("pop--active");
        overlay.classList.remove("overlay--active");
      }
    }
  });

  btnResultClose.addEventListener("click", function(event) {
    event.preventDefault();
    popResult.classList.remove("pop--active");
    overlay.classList.remove("overlay--active");
  });
}



//Прилипание шапки при прокрутке

// var HeaderFixed = (function() {
//
//   var docElem = document.documentElement,
//     header = document.querySelector(".menu"),
//     didScroll = false,
//     changeHeaderOn = 200;
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
//       header.classList.add("menu--fix");
//     } else {
//       header.classList.remove("menu--fix");
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


function nominationChoice(nominationItem) {
  var nomination = nominationItem.parentElement.parentElement;
  var nomChoice = nomination.querySelector(".nomination__choice");
  // var nomList = nomination.querySelector(".nomination__list");
  // var nomListAll = document.querySelectorAll(".nomination__list");

  nomChoice.innerHTML = nominationItem.innerText;
}

function sortingChoice(sortingItem) {
  var sorting = sortingItem.parentElement.parentElement;
  var sortChoice = sorting.querySelector(".sorting__choice");
  // var sortList = sorting.querySelector(".sorting__list");
  // var sortListAll = document.querySelectorAll(".sorting__list");

  sortChoice.innerHTML = sortingItem.innerText;
}














// подготовка к отправке на сервер введенных чисел
function setRating(input) {
  // var form = input.form;
  var form = document.querySelector(".js_refereeForm");
  var formId = form.id;
  var inputId = input.name;
  var inputRating = input.value;

  if (!(inputRating == "0")) {
    var text = {
      "set_rating": {
        "performance_id": formId,
        "criteria_id": inputId,
        "rating": inputRating
      }
    }
    var json = JSON.stringify(text);
    ajaxRating(json);
    input.classList.add("scoring__input--inactive");
  }
}

// подготовка к отправке комментария на сервер
function setNote(input) {
  var form = document.querySelector(".js_refereeForm");

  // var form = input.form;
  var formId = form.id;
  var inputNote = input.value;

  var text = {
    "set_note": {
      "performance_id": formId,
      "note": inputNote
    }
  }

  var json = JSON.stringify(text);
  ajaxRating(json);
}

var inputsMainValue = [];
//создание исходного "эталонного" массива
function getInputsMainValue() {
  var inputsMain = document.querySelectorAll(".scoring__input");
  inputsMainValue = [];
  for (var i = 0; i < inputsMain.length; i++) {
    inputsMainValue.push(inputsMain[i].value);
  }
  var test = inputsMainValue[0];
  return inputsMainValue;
}
getInputsMainValue();

  //если нужно внести изменения
  var btnYes = document.querySelector(".scoring__button--yes");

  if (btnYes) {
    var scoringQues = document.querySelector(".scoring__pop");
    var scoringText = scoringQues.querySelector(".scoring__question");

    btnYes.addEventListener("click", function(event) {
      var checkInput = document.getElementById("check");

      setRating(checkInput);
      getInputsMainValue();

      event.preventDefault();
      scoringQues.classList.remove("scoring__pop--active");
      scoringText.innerHTML = "";

      checkInput.removeAttribute("id");
    });
  }

  //если изменения не нужны
  var btnNo = document.querySelector(".scoring__button--no");

  if (btnNo) {
    var scoringQues = document.querySelector(".scoring__pop");
    var scoringText = scoringQues.querySelector(".scoring__question");


    btnNo.addEventListener("click", function(event) {
      var checkInput = document.getElementById("check");
      var inputs = document.querySelectorAll(".scoring__input");

      event.preventDefault();
      checkInput.classList.add("scoring__input--inactive");

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = inputsMainValue[i];
      }
      scoringQues.classList.remove("scoring__pop--active");
      checkInput.removeAttribute("id");
      scoringText.innerHTML = "";

    });
  }

function inputActive(item) {
  var form = document.querySelector(".refereeForm__scoring");
  var items = form.querySelectorAll(".scoring__item");
  var inputs = form.querySelectorAll(".scoring__input");
  var formPoints = form.querySelector(".form__points");
  var btns = form.querySelectorAll(".points__button");
  var input = item.querySelector(".scoring__input");

    if (item.classList.contains("scoring__item--active")) {
      // item.classList.remove("scoring__item--active");
      // formPoints.classList.remove("form__points--active");
    } else {
      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("scoring__item--active")) {
          items[i].classList.remove("scoring__item--active");
          if (Number(inputs[i].value) > 0) {

            //если первый раз вносят значения, т.е. исходный массив содержит 0, а внесено число больше 0
            if ((Number(inputs[i].value) > 0) && (Number(inputsMainValue[i]) == 0)) {
              inputsMainValue[i] = inputs[i].value;
              setRating(inputs[i]);
            }

            //если значение не изменилось, то поставить "неактивность" поля
            if ((Number(inputs[i].value) == Number(inputsMainValue[i])) && !(Number(inputsMainValue[i]) == 0)) {
              inputs[i].classList.add("scoring__input--inactive");
            }

            //если вносят измения, т.е. новое значение не равно исходному и исходное не равно 0
            if (!(Number(inputs[i].value) == Number(inputsMainValue[i])) && !(Number(inputsMainValue[i]) == 0)) {
              inputs[i].id = "check";
              var scoringName = items[i].querySelector(".scoring__name");
              scoringText.innerHTML = "Вы уверены, что хотите изменить оценку в поле &quot" + scoringName.innerHTML + "&quot?"; //вставляет текст
              scoringQues.classList.add("scoring__pop--active");
            }
          }
        }
      }
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("points__button--active")) {
          btns[i].classList.remove("points__button--active");
        }
      }

      item.classList.add("scoring__item--active");
      if (input.classList.contains("scoring__input--inactive")) {
        input.classList.remove("scoring__input--inactive");
      }
      formPoints.classList.add("form__points--active");
    }
}

function checkOnes(btn) {
  var form = btn.form;
  var pointsTens = form.querySelector(".points__item--tens");
  var pointsOnes = form.querySelector(".points__item--ones");
  var pointsTenths = form.querySelector(".points__item--tenths");

  pointsOnes.classList.remove("points__item--hidden");
  if (!pointsTens.classList.contains("points__item--hidden")) {
    pointsTens.classList.add("points__item--hidden");
  }
  if (!pointsTenths.classList.contains("points__item--hidden")) {
    pointsTenths.classList.add("points__item--hidden");
  }
}

function checkTenths(btn) {
  var form = btn.form;
  var pointsTens = form.querySelector(".points__item--tens");
  var pointsOnes = form.querySelector(".points__item--ones");
  var pointsTenths = form.querySelector(".points__item--tenths");

  pointsTenths.classList.remove("points__item--hidden");
  if (!pointsTens.classList.contains("points__item--hidden")) {
    pointsTens.classList.add("points__item--hidden");
  }
  if (!pointsOnes.classList.contains("points__item--hidden")) {
    pointsOnes.classList.add("points__item--hidden");
  }
}

function checkTens(btn) {
  var form = btn.form;
  var pointsTens = form.querySelector(".points__item--tens");
  var pointsOnes = form.querySelector(".points__item--ones");
  var pointsTenths = form.querySelector(".points__item--tenths");

  pointsTens.classList.remove("points__item--hidden");
  if (!pointsTenths.classList.contains("points__item--hidden")) {
    pointsTenths.classList.add("points__item--hidden");
  }
  if (!pointsOnes.classList.contains("points__item--hidden")) {
    pointsOnes.classList.add("points__item--hidden");
  }
}


function scoring(btn) {
  var form = btn.form;
  var field = btn.parentElement;
  var btns = field.querySelectorAll(".points__button");
  var btnTens = form.querySelectorAll(".points__item--tens .points__button");
  var btnOnes = form.querySelectorAll(".points__item--ones .points__button");
  var btnTenths = form.querySelectorAll(".points__item--tenths .points__button");
  var inputName = form.querySelector(".scoring__item--active .scoring__input");


  // Добавляем класс active нажатой кнопке
  if (btn.classList.contains("points__button--active")) {
    btn.classList.remove("points__button--active");
  } else {
    // Удаляем класс active со всех кнопок в текущем fieldset
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains("points__button--active")) {
        btns[i].classList.remove("points__button--active");
      }
    }
    btn.classList.add("points__button--active");
  }

  inputName.value = "";

  for (var i = 0; i < btnTens.length; i++) {
    if (btnTens[i].classList.contains("points__button--active")) {
      inputName.value = String(Number(inputName.value) + Number(btnTens[i].value));
    }
  }

  for (var i = 0; i < btnOnes.length; i++) {
    if (btnOnes[i].classList.contains("points__button--active")) {
      inputName.value = String(Number(inputName.value) + Number(btnOnes[i].value));
    }
  }

  for (var i = 0; i < btnTenths.length; i++) {
    if (btnTenths[i].classList.contains("points__button--active")) {
      inputName.value = String(Number(inputName.value) + Number(btnTenths[i].value));
    }
  }

  if (inputName.value == "") {
    inputName.value = "0";
  }
}


// создание элемента
// создание кнопки возрастной категорий с добавлением классов и текста
function createBtn(classBtn, textBtn) {
  var btn = document.createElement('button'); //создает элемент button
  btn.className = classBtn; //добавляет стили к элементу
  btn.innerHTML = textBtn; //вставляет текст
  return btn;
}

//ПАрсинг данных от сервера в форму refereeForm

function parsePerfomance(json) {
  var formInfo = json.id; //id текущего выступления
  var form = document.querySelector(".js_refereeForm");
  var performance_id = form.querySelector(".js_onlinePerformanceId");
  var turn_id = form.querySelector(".js_turnId");
  var turn_count = form.querySelector(".js_turnCount");
  var category = form.querySelector(".category");
  var performance_title = form.querySelector(".js_performanceTitle");
  var team_title = form.querySelector(".js_teamTitle");
  var team_chief = form.querySelector(".js_teamChief");
  var performance_note = form.querySelector(".js_performanceNote");

  // id выступления поставлен в тег form
  form.id = formInfo;

  // номер выступления
  performance_id.innerHTML = formInfo;

  // номера в очереди
  turn_id.innerHTML = json[formInfo].performance_turn_id;
  turn_count.innerHTML = json[formInfo].performance_turn;

  // категории - создание кнопок в зависимости от названия категории
  // возрастная категория
  if (json[formInfo].performance_age_category_title) {
    var categoryBtn = createBtn("category__button button", json[formInfo].performance_age_category_title);
    category.appendChild(categoryBtn);
    var hue = json[formInfo].performance_age_color["hue"];
    var sat = 100;
    var lit = json[formInfo].performance_age_color["lit"];

    //если тон и насыщенность не определены, то берутся данные по дефолту
    if (!hue) {
      hue = 0;
    }
    if (!lit) {
      lit = 50;
    }
    categoryBtn.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
  }

  // категория мероприятия
  if (json[formInfo].performance_nomination_title) {
    var categoryBtn = createBtn("category__button button", json[formInfo].performance_nomination_title);
    category.appendChild(categoryBtn);
    var hue = json[formInfo].performance_nomination_color["hue"];
    var sat = 100;
    var lit = json[formInfo].performance_nomination_color["lit"];

    if (!hue) {
      hue = 180;
    }
    if (!lit) {
      lit = 80;
    }
    categoryBtn.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
  }

  // название выступления
  performance_title.innerHTML = json[formInfo].performance_title;

  // название коллектива
  team_title.innerHTML = json[formInfo].team_title;

  // руководитель коллектива
  team_chief.innerHTML = json[formInfo].team_chief;

  // заметки
  performance_note.value = json[formInfo].performance_note;

  // категории для оценки
  // подсчет количества категорий по умолчанию равен количеству оценок
  var scoringList = document.querySelector(".scoring__list");
  var scoringItem = scoringList.querySelector(".scoring__item");
  var i = 0;

  for (var key in json[formInfo].criteria) {
    if (i == 0) {
      scoringItem.querySelector(".scoring__name").innerHTML = json[formInfo].criteria[key];
      scoringItem.querySelector(".scoring__input").value = json[formInfo].rating[key];

      var scoringInput = scoringItem.querySelector(".scoring__input");
      scoringInput.name = key;

    } else {
      // этот код будет вызван для каждого свойства объекта
      var scoringItemClone = scoringItem.cloneNode(true);
      scoringItemClone.querySelector(".scoring__name").innerHTML = json[formInfo].criteria[key];
      scoringItemClone.querySelector(".scoring__input").value = json[formInfo].rating[key];

      var scoringInput = scoringItemClone.querySelector(".scoring__input");

      scoringInput.name = key;
      scoringList.appendChild(scoringItemClone);
    }
    i++;
  }

  getInputsMainValue();


  var i = 0;
  for (var key in json[formInfo].criteria) {
    if (i == 0) {
      scoringItem.classList.add("scoring__item--active");

    }
  }

  $('.scoring__list').slick({
    mobileFirst: true,
    slidesToShow: 3,
    infinite: false,
    responsive: [{
      breakpoint: 480,
      settings: {
        slidesToShow: 5
      }
    },{
      breakpoint: 640,
      settings: {
        slidesToShow: 3
      }
    },{
      breakpoint: 780,
      settings: {
        slidesToShow: 4
      }
    },{
      breakpoint: 940,
      settings: {
        slidesToShow: 5
      }
    },{
      breakpoint: 1023,
      settings: {
        slidesToShow: 7
      }
    },{
      breakpoint: 1100,
      settings: {
        slidesToShow: 8
      }
    },{
      breakpoint: 1200,
      settings: {
        slidesToShow: 9
      }
    }
  ]
});
}



// Открытие формы в соответствии со статусом

function openForm(status) {
  var arReferee = document.querySelectorAll(".js_referee");

  // Если статус мероприятия равно нулю, то мероприятие еще не началось
  if (status == 0) {
    for (var i = 0; i < arReferee.length; i++) {
      if (arReferee[i].classList.contains("form_before")) {
        arReferee[i].classList.remove("score--hidden");
      }
    }
  }
  // Если статус мероприятия меншьше нуля, то мероприятие уже кончилось
  if (status < 0) {
    for (var i = 0; i < arReferee.length; i++) {
      if (arReferee[i].classList.contains("form_final")) {
        arReferee[i].classList.remove("score--hidden");
      }
    }
  }
  // Если статус мероприятия больше нуля, то мероприятие идет
  if (status > 0) {
      for (var i = 0; i < arReferee.length; i++) {
        if (arReferee[i].classList.contains("form_progress")) {
          arReferee[i].classList.remove("score--hidden");
        }
      }
  }
}
