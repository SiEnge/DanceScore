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

//------------------------------------------------------------------------------
//СТРАНИЦА index.html - "Судейство мероприятия"
//создание исходного "эталонного" массива
var inputsMainValue = [];

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

//активный инпут, отлавливание изменение значений
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
        if (+inputs[i].value > 0) {

          //если первый раз вносят значения, т.е. исходный массив содержит 0, а внесено число больше 0
          if ((+inputs[i].value > 0) && (+inputsMainValue[i] == 0)) {
            inputsMainValue[i] = inputs[i].value;
            setRating(inputs[i]);
          }

          //если значение не изменилось, то поставить "неактивность" поля
          if ((+inputs[i].value == +inputsMainValue[i]) && !(+inputsMainValue[i] == 0)) {
            inputs[i].classList.add("scoring__input--inactive");
          }

          //если вносят измения, т.е. новое значение не равно исходному и исходное не равно 0
          if (!(+inputs[i].value == +inputsMainValue[i]) && !(+inputsMainValue[i] == 0)) {
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

//ввод единиц
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

//ввод десятых
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

//ввод десоток
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


var points = document.querySelector(".points");

if (points) {
  points.onclick = function(event) {
    var target = event.target;

    if (!target.classList.contains("points__button")) return; // не на TD? тогда не интересует

    scoring(target);
  };
}

//подчсет баллов
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

  inputName.valueAsNumber = 0;

  for (var i = 0; i < btnTens.length; i++) {
    if (btnTens[i].classList.contains("points__button--active")) {
      inputName.valueAsNumber += +btnTens[i].value;
    }
  }

  for (var i = 0; i < btnOnes.length; i++) {
    if (btnOnes[i].classList.contains("points__button--active")) {
      inputName.valueAsNumber += +btnOnes[i].value;
    }
  }

  for (var i = 0; i < btnTenths.length; i++) {
    if (btnTenths[i].classList.contains("points__button--active")) {
      inputName.valueAsNumber += +btnTenths[i].value;
    }
  }
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

// создание кнопки возрастной категорий с добавлением классов и текста
function createBtn(classBtn, textBtn) {
  var btn = document.createElement('button'); //создает элемент button
  btn.className = classBtn; //добавляет стили к элементу
  btn.innerHTML = textBtn; //вставляет текст
  return btn;
}


//------------------------------------------------------------------------------
// для AJAX index.html
//Парсинг данных от сервера в форму refereeForm
function parsePerfomance(jsonText) {
  var json = JSON.parse(jsonText);

  var formInfo = json.performance_info; //id текущего выступления
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
  turn_id.innerHTML = json[formInfo].turn_id;
  turn_count.innerHTML = json[formInfo].turn_count;

  // категории - создание кнопок в зависимости от названия категории
  // возрастная категория
  if (json[formInfo].age_category_title) {
    var categoryBtn = createBtn("category__button button", json[formInfo].age_category_title);
    category.appendChild(categoryBtn);
    //если тон и насыщенность не определены, то берутся данные по дефолту
    var hue = (json[formInfo].age_category_color["hue"]) ? json[formInfo].age_category_color["hue"] : 0;
    var sat = 100;
    var lit = (json[formInfo].age_category_color["lit"]) ? json[formInfo].age_category_color["lit"] : 50;
    categoryBtn.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";
  }

  // категория мероприятия
  if (json[formInfo].nomination_title) {
    var categoryBtn = createBtn("category__button button", json[formInfo].nomination_title);
    category.appendChild(categoryBtn);
    //если тон и насыщенность не определены, то берутся данные по дефолту
    var hue = (json[formInfo].nomination_color["hue"]) ? json[formInfo].nomination_color["hue"] : 180;
    var sat = 100;
    var lit = (json[formInfo].nomination_color["lit"]) ? json[formInfo].nomination_color["lit"] : 80;
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
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 780,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 940,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 1023,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6
      }
    }, {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7
      }
    }]
  });
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
  var formId = form.id;
  var inputNote = input.value;
  var text = {
    "set_performance_note": {
      "performance_id": formId,
      "note": inputNote
    }
  }

  var json = JSON.stringify(text);
  ajaxRating(json);
}


window.addEventListener("load", function() {
  var refereeForm = document.querySelector(".refereeForm");
  if (refereeForm) {
    var json_user = createDataUser();

    var body = 'get_performance_info=';
    // var text = {
    //   "get_data": {
    //     "id": "0",
    //     "size": "",
    //     "data": {
    //       "performance_turn_id": "",
    //       "performance_turn_id": "",
    //       "performance_age_category": "",
    //       "performance_nomination": "",
    //       "performance_title": "",
    //       // "team_title"
    //       "performance_director": ""
    //       // "performance_note"
    //       // "criteria"
    //       // "rating"
    //     }
    //   }
    // }
    var json = JSON.stringify(body);

    getAjax(json_user).then(function(response) {
      parseUser(response);
    }).catch(function(error) {
      console.log("Error!!!");
      console.log(error);
    });

    getAjax(json).then(function(response) {

      console.log(response);
      return JSON.parse(response);
    }).then(function(data) {
      // console.log(data[0]);
      parsePerfomance(data);
    }).catch(function(error) {
      console.log("Error!!!");
      console.log(error);
    });

  }
});

//------------------------------------------------------------------------------
//СТРАНИЦА results.html - "Подведение итогов"
//Прилипание поля наград при прокрутке
// var resultFixed = (function() {
//
//   var docElem = document.documentElement,
//     result = document.querySelector(".wrap__resultFix"),
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
//       result.classList.add("wrap__result--fix");
//     } else {
//       result.classList.remove("wrap__result--fix");
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

//подсчет и вывод выбранных призов
function countPrize() {
  var prizesChoice = document.querySelectorAll(".nomination__choice");
  var prizeItem = document.querySelectorAll(".awards__item");
  var prizeAmount = [];

  //подсчет выбранных призов по видам
  for (var i = 0; i < prizeItem.length; i++) {
    var sum = 0;
    for (var j = 0; j < prizesChoice.length; j++) {
      if (prizeItem[i].dataset.prizeId == prizesChoice[j].dataset.prizeIdChoice) sum++;
    }
    prizeAmount.push(sum);
  }

  //вывод количества выбранных призов
  for (var i = 0; i < prizeItem.length; i++) {
    prizeItem[i].querySelector(".awards__total--selected").innerHTML = prizeAmount[i];
    prizeItem[i].querySelector(".awards__amount--selected").innerHTML = prizeAmount[i];
    //проверка количества призов
    if (+prizeItem[i].querySelector(".awards__amount--selected").innerHTML > +prizeItem[i].querySelector(".awards__amount--all").innerHTML) prizeItem[i].dataset.prizeStatus = "many";
    if (+prizeItem[i].querySelector(".awards__amount--selected").innerHTML == +prizeItem[i].querySelector(".awards__amount--all").innerHTML) prizeItem[i].dataset.prizeStatus = "ok";
    if (+prizeItem[i].querySelector(".awards__amount--selected").innerHTML < +prizeItem[i].querySelector(".awards__amount--all").innerHTML) prizeItem[i].dataset.prizeStatus = "few";
    if (prizeItem[i].querySelector(".awards__amount--all").innerHTML == "0") {
      prizeItem[i].dataset.prizeStatus = "base";
    }
  }

  var flagError = false;
  var page = document.querySelector(".page");
  var pageMsg = page.querySelector(".header__message");

  var resultFix = page.querySelector(".wrap__resultFix");

  for (var i = 0; i < prizeItem.length; i++) {
    if (prizeItem[i].dataset.prizeStatus == "many") {
      flagError = true;
    }
  }

  if (flagError) {
    if (!page.classList.contains("page--error")) {
      page.classList.add("page--error");
      page.querySelector(".page__flex").classList.add("page__flex--pt138");
    }
    // if (resultFix.classList.contains(".wrap__result--fix")) {
    //   resultFix.classList.remove(".wrap__result--fix");
    //   resultFix.classList.add(".wrap__result--errorfix");
    // }
    pageMsg.dataset.errormessageStatus = "show";
  } else {
    if (page.classList.contains("page--error")) {
      page.classList.remove("page--error");
      page.querySelector(".page__flex").classList.remove("page__flex--pt138");

    }
    // if (resultFix.classList.contains(".wrap__result--errorfix")) {
    //   resultFix.classList.add(".wrap__result--fix");
    //   resultFix.classList.remove(".wrap__result--errorfix");
    // }
    pageMsg.dataset.errormessageStatus = "hide";
  }
}


//выбор приза
function choicePrize(nominationItem) {

  var nomination = nominationItem.parentElement.parentElement;
  var nomChoice = nomination.querySelector(".nomination__choice");
  // var nomChoiceProgramm = nomination.querySelector(".nomination__choiceprogramm");

  nomChoice.innerHTML = nominationItem.innerText;
  nomChoice.dataset.prizeIdChoice = nominationItem.dataset.prizeId;

  var data = {
    "set_data": {
      "performance_prize_manual":{
        "performance_id": nomination.dataset.performanceId,
        "prize_id": nominationItem.dataset.prizeId
      }
    }
  }
  var json = JSON.stringify(data);

  setAjax(json);

  // if (nomChoice.dataset.prizeIdChoice == nomChoiceProgramm.dataset.prizeId) {
  //   nomChoiceProgramm.dataset.status = "hide";
  // } else {
  //   nomChoiceProgramm.dataset.status = "show";
  // }
  countPrize();
}

//повысить приз на 1 ступень
function upPrize(btn) {
  var prizeItem = document.querySelectorAll(".awards__item");
  var nominantItem = btn.parentElement.parentElement;
  var nomChoice = nominantItem.querySelector(".nomination__choice");

  if (nomChoice.dataset.prizeIdChoice == prizeItem[0].dataset.prizeId) return false;

  for (var i = 0; i < prizeItem.length; i++) {
    if (nomChoice.dataset.prizeIdChoice == prizeItem[i].dataset.prizeId) {
      nomChoice.dataset.prizeIdChoice = prizeItem[i - 1].dataset.prizeId;
      nomChoice.innerText = prizeItem[i - 1].querySelector(".awards__name").innerHTML;
      break;
    }
  }
  countPrize();
}

//понизить приз на 1 ступень
function downPrize(btn) {
  var prizeItem = document.querySelectorAll(".awards__item");
  var nominantItem = btn.parentElement.parentElement;
  var nomChoice = nominantItem.querySelector(".nomination__choice");

  if (nomChoice.dataset.prizeIdChoice == prizeItem[prizeItem.length - 1].dataset.prizeId) return false;

  for (var i = 0; i < prizeItem.length; i++) {
    if (nomChoice.dataset.prizeIdChoice == prizeItem[i].dataset.prizeId) {
      nomChoice.dataset.prizeIdChoice = prizeItem[i + 1].dataset.prizeId;
      nomChoice.innerText = prizeItem[i + 1].querySelector(".awards__name").innerHTML;
      break;
    }
  }
  countPrize();
}

//открытие таблицы подробных оценок
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

//обрезание вертикального текста
function sliceText(height, text) {
  var symbol = Math.round((height - 30 - 12) / 8.5);
  if (symbol >= text.length) {
    return text;
  } else {
    return text.slice(0, symbol) + "...";
  }
}

//создание исходного "эталонного" массива
// var jsonSort = [];
function nominantSort(json) {
  jsonSort = [];
  for (var key in json) {
    jsonSort.push([key, json[key].performance_turn_id]);
  }
  jsonSort.sort(function(a, b) {
    return a[1] - b[1];
  });
  // return jsonSort;
}




function test(btn) {

  var testname = jsonSort[3];
  var testname2 = jsonObject;
  var count = +btn.dataset.count;

  parseResult(jsonObject, count, 3);


  // for (var i = count++; i < count + 2; i++) {
  //   var data = {
  //     "get_data": {
  //       "performance_id": test,
  //       "size": "1",
  //       "data": {
  //         "performance_age_category": "", //возрастная категория
  //         "performance_nomination": "", //категория номинации
  //         "performance_title": "", //название номера
  //         "performance_team_title": "", //название коллектива
  //         "performance_rating_sum": "", //итоговая сумма
  //         "performance_prize": "", //призовое рассчетное место
  //         "performance_turn_id": "" //номер выступления
  //       }
  //     }
  //   }
  //   var json = JSON.stringify(data);
  //   // requestResult_test2();
  // }
}

//------------------------------------------------------------------------------
//для AJAX results.html

//Запрос
// {"get_data":{"people_my_name":""}}
//Ответ сервера:
// {"surname":"Иванов","lastname":"Иван","middlename":"Иванович"}

//Парсинг данных о мероприятии
function parseUser(jsonText) {
  var json = JSON.parse(jsonText);
  var surname = document.querySelector(".surname");
  var lastname = document.querySelector(".lastname");

  surname.innerHTML = json["surname"];
  lastname.innerHTML = json["lastname"];
}


//Парсинг данных о мероприятии
function parseContest(jsonText) {
  var json = JSON.parse(jsonText);

  var contestTitle = document.querySelector(".js_contestTitle");
  var prizeList = document.querySelector(".awards__list");
  var prizeItem = prizeList.querySelector(".awards__item");
  var nominationList = document.querySelector(".nomination__list");
  var nominationItem = nominationList.querySelector(".nomination__item");

  for (var key in json) {
    contestTitle.innerHTML = json[key].contest_title;
    var i = 0;
    for (var key2 in json[key].prize_option) {
      if (i == 0) { //если это первый элемент в объекте, то заполняем данные в блоке nominant
        //название приза
        var titlePrize = json[key].prize_option[key2].split('|');
        //вставка в блок призов
        prizeItem.dataset.prizeId = key2;
        prizeItem.querySelector(".awards__name").innerHTML = titlePrize[0];
        if (!(titlePrize[1] == null)) {
          prizeItem.querySelector(".awards__total--all").innerHTML = titlePrize[1];
          prizeItem.querySelector(".awards__amount--all").innerHTML = titlePrize[1];
        }
        //вставка в выпадающий список
        nominationItem.dataset.prizeId = key2;
        nominationItem.querySelector(".nomination__name").innerHTML = titlePrize[0];
      } else { //если есть другие элементы в объекте, то клонируем первый и заполняем его
        var prizeItemClone = prizeItem.cloneNode(true);
        var nominationItemClone = nominationItem.cloneNode(true);
        var titlePrize = json[key].prize_option[key2].split('|');
        //название приза
        prizeItemClone.dataset.prizeId = key2;
        prizeItemClone.querySelector(".awards__name").innerHTML = titlePrize[0];
        if (!(titlePrize[1] == null)) {
          prizeItemClone.querySelector(".awards__total--all").innerHTML = titlePrize[1];
          prizeItemClone.querySelector(".awards__amount--all").innerHTML = titlePrize[1];

        }
        nominationItemClone.dataset.prizeId = key2;
        nominationItemClone.querySelector(".nomination__name").innerHTML = titlePrize[0];
        prizeList.appendChild(prizeItemClone);
        nominationList.appendChild(nominationItemClone);
      }
      i++;
    }
  }
}




//Парсинг данных о номинантах
var jsonObject = {};

function parseResult(jsonText, counter, step) {

  var json = JSON.parse(jsonText);

  if (!json) {
    json = jsonObject;
  }

  var nominant = document.querySelector(".nominant");
  var nominants = document.querySelector(".nominants");
  var category = nominant.querySelector(".nominant__category");
  var nomination = nominant.querySelector(".nominant__label");
  var nominationText = nominant.querySelector(".nominant__labeltext");
  var performanceId = nominant.querySelector(".js_performanceId");
  var performanceTitle = nominant.querySelector(".nominant__performanceTitle");
  var teamTitle = nominant.querySelector(".nominant__teamTitle");
  var rating = nominant.querySelector(".nominant__rating");
  var nominationBlock = nominant.querySelector(".nomination");
  var nominationChoiceProgramm = nominant.querySelector(".nomination__choiceprogramm");
  var nominationChoice = nominant.querySelector(".nomination__choice");
  var nominationTitleAmount = nominant.querySelector(".nominant__titleAmount");
  var btnNominantShow = document.querySelector(".page-result__loading");
  var prizeItem = document.querySelectorAll(".awards__item");



  nominantSort(json);

  var num = 0;
  for (var i = counter; i < counter + step; i++) {
    if (num == 0 && counter == 0) { //если это первый элемент в объекте, то заполняем данные в блоке nominant
      nominant.dataset.performanceId = jsonSort[i][0];
      category.innerHTML = json[jsonSort[i][0]].performance_age_category["age_category_title"];
      //Цвет кнопки возврастной категории. Если тон и насыщенность не определены, то берутся данные по дефолту
      var color = json[jsonSort[i][0]].performance_age_category["age_category_color"].split(',');
      var hue = (color[0]) ? color[0] : 0;
      var sat = (color[1]) ? color[1] : 100;
      var lit = (color[2]) ? color[2] : 50;
      category.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";

      //Цвет кнопки номинации. Если тон и насыщенность не определены, то берутся данные по дефолту
      var color = json[jsonSort[i][0]].performance_nomination["nomination_color"].split(',');
      var hue = (color[0]) ? color[0] : 0;
      var sat = (color[1]) ? color[1] : 100;
      var lit = (color[2]) ? color[2] : 50;

      nomination.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";

      performanceId.innerHTML = jsonSort[i][0];
      performanceTitle.innerHTML = json[jsonSort[i][0]].performance_title;
      teamTitle.innerHTML = json[jsonSort[i][0]].performance_team_title;
      nominationBlock.dataset.performanceId = jsonSort[i][0];
      // nominationText.innerHTML = sliceText(nominantList[i].clientHeight, nominantTitle[i]);
      if (json[jsonSort[i][0]].performance_rating_sum == null) { //если сумма баллов равна null, то
        rating.innerHTML = "Голосование идет";
        nominationBlock.setAttribute("data-status", "hide");
        nominationTitleAmount.dataset.status = "hide";
      } else {

        rating.innerHTML = (Math.round(+json[jsonSort[i][0]].performance_rating_sum * 100) / 100);
        // rating.innerHTML = (Math.round(+json[jsonSort[i][0]].performance_rating_sum * 100) / 100) + " баллов";
        nominationBlock.setAttribute("data-status", "show");
        nominationTitleAmount.dataset.status = "show";


        nominationChoiceProgramm.dataset.prizeId = json[jsonSort[i][0]].performance_prize;
        nominationChoice.dataset.prizeIdChoice = json[jsonSort[i][0]].performance_prize_manual;

        for (var j = 0; j < prizeItem.length; j++) {
          if (json[jsonSort[i][0]].performance_prize == prizeItem[j].dataset.prizeId) {
            nominationChoiceProgramm.innerHTML = prizeItem[j].querySelector(".awards__name").innerHTML;
            nominationChoiceProgramm.dataset.status = "show";
          }

          if (json[jsonSort[i][0]].performance_prize_manual == prizeItem[j].dataset.prizeId) {
            nominationChoice.innerHTML = prizeItem[j].querySelector(".awards__name").innerHTML;
          }

        }


      }

    } else {
      if (i > (jsonSort.length - 1)) break;
      var test = jsonSort[i][0];
      var nominantClone = nominant.cloneNode(true);

      nominantClone.dataset.performanceId = jsonSort[i][0];


      //название возрастной категории
      nominantClone.querySelector(".nominant__category").innerHTML = json[jsonSort[i][0]].performance_age_category["age_category_title"];

      //Цвет кнопки возврастной категории. Если тон и насыщенность не определены, то берутся данные по дефолту
      var color = json[jsonSort[i][0]].performance_age_category["age_category_color"].split(',');
      var hue = (color[0]) ? color[0] : 0;
      var sat = (color[1]) ? color[1] : 100;
      var lit = (color[2]) ? color[2] : 50;
      nominantClone.querySelector(".nominant__category").style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";

      //Цвет кнопки номинации. Если тон и насыщенность не определены, то берутся данные по дефолту
      var color = json[jsonSort[i][0]].performance_age_category["age_category_color"].split(',');
      var hue = (color[0]) ? color[0] : 0;
      var sat = (color[1]) ? color[1] : 100;
      var lit = (color[2]) ? color[2] : 50;
      nominantClone.querySelector(".nominant__label").style.backgroundColor = "hsl(" + hue + ", " + sat + "%, " + lit + "%)";

      nominantClone.querySelector(".js_performanceId").innerHTML = jsonSort[i][0];
      nominantClone.querySelector(".nominant__performanceTitle").innerHTML = json[jsonSort[i][0]].performance_title;
      nominantClone.querySelector(".nominant__teamTitle").innerHTML = json[jsonSort[i][0]].performance_team_title;
      nominantClone.querySelector(".nomination").dataset.performanceId = jsonSort[i][0];
      if (json[jsonSort[i][0]].performance_rating_sum == null) { //если сумма баллов равна null, то
        nominantClone.querySelector(".nominant__rating").innerHTML = "Голосование идет";
        nominantClone.querySelector(".nomination").dataset.status = "hide";
        nominantClone.querySelector(".nominant__titleAmount").dataset.status = "hide";
        nominantClone.querySelector(".nomination__choiceprogramm").innerHTML = "";
        nominantClone.querySelector(".nomination__choice").innerHTML = "";
        nominantClone.querySelector(".nomination__choiceprogramm").dataset.prizeId = "0";
        nominantClone.querySelector(".nomination__choice").dataset.prizeIdChoice = "0";
      } else {
        nominantClone.querySelector(".nominant__rating").innerHTML = (Math.round(+json[jsonSort[i][0]].performance_rating_sum * 100) / 100);
        // nominantClone.querySelector(".nominant__rating").innerHTML = (Math.round(+json[jsonSort[i][0]].performance_rating_sum * 100) / 100) + " баллов";
        nominantClone.querySelector(".nomination").dataset.status = "show";
        nominantClone.querySelector(".nominant__titleAmount").dataset.status = "show";


        nominantClone.querySelector(".nomination__choiceprogramm").dataset.prizeId = +json[jsonSort[i][0]].performance_prize;
        nominantClone.querySelector(".nomination__choice").dataset.prizeIdChoice = json[jsonSort[i][0]].performance_prize_manual;

        for (var j = 0; j < prizeItem.length; j++) {
          if (json[jsonSort[i][0]].performance_prize == prizeItem[j].dataset.prizeId) {
            nominantClone.querySelector(".nomination__choiceprogramm").innerHTML = prizeItem[j].querySelector(".awards__name").innerHTML;
            nominantClone.querySelector(".nomination__choiceprogramm").dataset.status = "show";
          }
          if (json[jsonSort[i][0]].performance_prize == "0") {
            nominantClone.querySelector(".nomination__choiceprogramm").innerHTML = "";
          }
          if (json[jsonSort[i][0]].performance_prize_manual == prizeItem[j].dataset.prizeId) {
            nominantClone.querySelector(".nomination__choice").innerHTML = prizeItem[j].querySelector(".awards__name").innerHTML;
          }
          if (json[jsonSort[i][0]].performance_prize_manual == "0") {
            nominantClone.querySelector(".nomination__choice").innerHTML = "Выберите приз";
          }
        }



      }


      //название номинации

      nominants.appendChild(nominantClone);
    }
    num++;
  }

  btnNominantShow.dataset.count = counter + step;
  if (+btnNominantShow.dataset.all == 0) {
    var all = 0;
    for (var key in json) {
      all++;
    }
    btnNominantShow.dataset.all = all;

  }

  if (+btnNominantShow.dataset.count >= +btnNominantShow.dataset.all) {
    btnNominantShow.dataset.status = "hide";
  }

  var nominantList = nominants.querySelectorAll(".nominant__label");
  var nominantListText = nominants.querySelectorAll(".nominant__labeltext");
  var nominantTitle = [];
  for (var key in json) {
    nominantTitle.push(json[key].performance_nomination["nomination_title"]);
  }
  for (var i = 0; i < nominantList.length; i++) {
    nominantListText[i].innerHTML = sliceText(nominantList[i].clientHeight, nominantTitle[i]);
  }

  countPrize();
  // if (!jsonObject) {
  jsonObject = jsonText;
  return jsonObject;
  // }
}



window.addEventListener("load", function() {
  var result = document.querySelector(".summarizing");
  if (result) {
    var load = document.querySelector(".page__loading");
    var json_user = createDataUser();
    var json_contest = createDataContest();
    var json_performance = createDataPerformance();

    getAjax(json_user).then(function(response) {
      parseUser(response);

    }).catch(function(error) {
      console.log("Error!!!");
    });


    getAjax(json_contest).then(function(response) {
      parseContest(response);
    }).catch(function(error) {
      console.log("Error!!!");
    });

    getAjax(json_performance).then(function(response) {
      parseResult(response, 0, 5);
      load.dataset.status = "hide";
    }).catch(function(error) {
      console.log("Error!!!");
    });


  }
});


//---------тестирование-----------------

//печать страниц диплома


var btnPrintDiploma = document.querySelector(".printing__button--diploma");

if (btnPrintDiploma) {
  btnPrintDiploma.addEventListener("click", function(event) {
    event.preventDefault();

    var json_diploma = createDataDiploma();

    getAjax(json_diploma).then(function(response) {
      createDiploma(response);
    }).catch(function(error) {
      console.log("Error!!!");
      console.log(error);
    });
  });
}



function createDiploma(jsonText) {
  var contentDiploma = parseDiploma(jsonText);
  var docInfo = {

    info: {
      title: "Дипломы",
      author: "JustCreate",
      subject: "Test"
    },

    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [30, 380, 30, 50],

    content: contentDiploma,

    styles: {
      prize: {
        fontSize: 42,
        bold: true,
        alignment: "center",
        margin: [ 0, 0, 0, 30]
      },
      team: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [ 0, 0, 0, 10]

      },
      director: {
        fontSize: 18,
        italics: true,
        alignment: "center"
      }
    }
  }
  pdfMake.createPdf(docInfo).print();
  // pdfMake.createPdf(docInfo).download("diplomas.pdf");
}


//Парсинг данных о мероприятии
function parseDiploma(jsonText) {
  var json = JSON.parse(jsonText);
  var diplomaArr = [];
  var prizeItem = document.querySelectorAll(".awards__item");

  var i = 0;

  for (var key in json) {
    diplomaArr[i] = new Object();

    if (!(json[key].performance_prize_manual == "0")) {
      for (var j = 0; j < prizeItem.length; j++) {
        if (prizeItem[j].dataset.prizeId == json[key].performance_prize_manual) {
          diplomaArr[i].text = prizeItem[j].querySelector(".awards__name").innerHTML;
          break;
        }
      }
    } else {
      if (+json[key].performance_prize != 0) {
        for (var j = 0; j < prizeItem.length; j++) {
          if (prizeItem[j].dataset.prizeId == json[key].performance_prize) {
            diplomaArr[i].text = prizeItem[j].querySelector(".awards__name").innerHTML;
            break;
          }
        }
      } else {
        diplomaArr[i].text = "";
      }
    }
    diplomaArr[i].style = "prize";
    i++;

    diplomaArr[i] = new Object();
    diplomaArr[i].text = json[key].performance_team_title;
    diplomaArr[i].style = "team";
    i++;
    diplomaArr[i] = new Object();
    diplomaArr[i].text = json[key].performance_title;
    diplomaArr[i].style = "team";
    i++;
    diplomaArr[i] = new Object();
    diplomaArr[i].text = json[key].performance_director;
    diplomaArr[i].style = "director";
    diplomaArr[i].pageBreak = "after";
    i++;
  }

  delete diplomaArr[i - 1].pageBreak;

  return diplomaArr;
}




//проверка какие данные надо выводить в соответствии с jsonSort
//и создание массива для запроса
function checkNominant() {
  var nominants = document.querySelector(".nominants");
  var nominantCount = nominants.dataset.nominantCount; //количество выведенных номинантов
  // var arrNom = []
  // var j = 0;
  // for (var i = nominantCount++; i < jsonSort.length; i++) { //в цикле начинаем смотреть со следующего за nominantCount элемента массива
  //   arrNom[j] = jsonSort[i][0];
  // }
  var test = jsonSort[nominantCount++][0];

  var data = {
    "get_data": {
      "performance_id": test,
      "size": "1",
      "data": {
        "performance_age_category": "", //возрастная категория
        "performance_nomination": "", //категория номинации
        "performance_title": "", //название номера
        "performance_team_title": "", //название коллектива
        "performance_rating_sum": "", //итоговая сумма
        "performance_prize": "", //призовое рассчетное место
        "performance_turn_id": "" //номер выступления
      }
    }
  }
  var json = JSON.stringify(data);

  requestResult(json);

}





//При прокрутке запрос данных о номинантах
// в соответствии с отсортированным массивом и количеством уже показанных номинантов




window.addEventListener('scroll', function(e) {
  // var body = document.querySelector(".page");
  var btnShow = document.querySelector(".page-result__loading");
  var spinner = document.querySelector(".page-result__spinner");
  var count = +btnShow.dataset.count;
  var all = +btnShow.dataset.all;



  // var data2 = {
  //   "get_data": {
  //     "performance_id": "0",
  //     "size": "100",
  //     "data": {
  //       "performance_age_category": "", //возрастная категория
  //       "performance_nomination": "", //категория номинации
  //       "performance_title": "", //название номера
  //       "performance_team_title": "", //название коллектива
  //       "performance_rating_sum": "", //итоговая сумма
  //       "performance_prize": "", //призовое рассчетное место
  //       "performance_turn_id": "" //номер выступления
  //     }
  //   }
  // }
  // var json2 = JSON.stringify(data2);

  var target = e.target.scrollingElement;
  if (target.scrollHeight - target.scrollTop - target.clientHeight < 10) {
    if (count < all) {

      spinner.dataset.status = "show";
      // requestPerformance(json2).then(function(response) {
      //   // parseResult(response, count, 3);
      //   parseResult(jsonObject, count, 3);
      //   spinner.dataset.status = "hide";
      //
      //   // parseResult(response, 0, 5);
      //     // parseContest(response);
      //     // console.log(response);
      //     // return JSON.parse(response);
      // // }).then(function(json2) {
      // //     // console.log(data[0]);
      // //     parseContest(json);
      // //     parseResult(json, 0, 5);
      // }).catch(function(error){
      //     console.log("Error!!!");
      //     console.log(error);
      // });

      parseResult(jsonObject, count, 3);
      spinner.dataset.status = "hide";
    }
  }
});

// function onReady(callback) {
//     var intervalID = window.setInterval(checkReady, 1000);
//
//     function checkReady() {
//         if (document.getElementsByTagName('body')[0] !== undefined) {
//             window.clearInterval(intervalID);
//             callback.call(this);
//         }
//     }
// }

// onReady(function () {
//   document.getElementById('page').style.display = true ? 'block' : 'none';
//   document.getElementById('loading').style.display = false ? 'block' : 'none';
// });
