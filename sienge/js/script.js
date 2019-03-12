function parsePerfomance(json) {
  var onlinePerformanceId = document.getElementById('onlinePerformanceId');
  var formInfo = json.performance_info; //id текущего выступления
  var testid = json[formInfo];
  var form = document.getElementById(formInfo);
  var performance_id = form.querySelector(".js_onlinePerformanceId");
  var turn_id = form.querySelector(".js_turnId");
  var turn_count = form.querySelector(".js_turnCount");
  var age_category_title = form.querySelector(".js_ageCategoryTitle");
  var nomination_title = form.querySelector(".js_nominationTitle");
  var performance_title = form.querySelector(".js_performanceTitle");
  var team_title = form.querySelector(".js_teamTitle");
  var team_chief = form.querySelector(".js_teamChief");
  var performance_note = form.querySelector(".js_performanceNote");

  performance_id.innerHTML = formInfo;
  turn_id.innerHTML = json[formInfo].turn_id;
  turn_count.innerHTML = json[formInfo].turn_count;
  age_category_title.innerHTML = json[formInfo].age_category_title;
  nomination_title.innerHTML = json[formInfo].nomination_title;
  performance_title.innerHTML = json[formInfo].performance_title;
  team_title.innerHTML = json[formInfo].team_title;
  team_chief.innerHTML = json[formInfo].team_chief;
  performance_note.value = json[formInfo].performance_note;
}

// {"performance_info":"93",
// "93":{
//   "turn_id":8,
//   "turn_count":"27",
//   "age_category_title":null,
//   "nomination_title":"молодежь",
//   "performance_title":"народный танец «Уральская напарочка»",
//   "team_title":"ПАО «ЧМК» Дворец культуры, Народный ансамбль танца «Уральский сувенир»",
//   "team_chief":" ",
//   "performance_note":null,
//   "criteria":{
//     "5":"идея",
//     "6":"!музыкальность",
//     "7":"композиция",
//     "8":"артистизм",
//     "9":"костюм"
//   },
//   "rating":{
//     "5":"9",
//     "6":"8",
//     "7":"8",
//     "8":"10",
//     "9":"9"}
//   }
// }




$('.param__list').slick({
  mobileFirst: true,
  // autoplay: true,
  // autoplaySpeed: 3000,
  // arrows: false,
  slidesToShow: 3,
  infinite: false,
  // adaptiveHeight: false,
  // adaptiveHeight: true,
  responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 7
    }
  }]
});

function scoring(btn) {
  var form = btn.form;
  var field = btn.parentElement;
  var btns = field.querySelectorAll(".points__button");
  var btnTens = form.querySelectorAll(".points__item--tens .points__button");
  var btnOnes = form.querySelectorAll(".points__item--ones .points__button");
  var btnTenths = form.querySelectorAll(".points__item--tenths .points__button");
  var inputName = form.querySelector(".param__item--active .param__input");


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


function inputActive(item) {
  var form = document.querySelector(".form__add");
  var items = form.querySelectorAll(".param__item");
  var formPoints = form.querySelector(".form__points");
  var btns = form.querySelectorAll(".points__button");

    if (item.classList.contains("param__item--active")) {
      // item.classList.remove("param__item--active");
      // formPoints.classList.remove("form__points--active");
    } else {
      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("param__item--active")) {
          items[i].classList.remove("param__item--active");
        }
      }
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("points__button--active")) {
          btns[i].classList.remove("points__button--active");
        }
      }
      item.classList.add("param__item--active");
      formPoints.classList.add("form__points--active");
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



// создание элемента
// создание кнопки возрастной категорий с добавлением классов и текста
function createBtn(classBtn, textBtn) {
  var btn = document.createElement('button'); //создает элемент button
  btn.className = classBtn; //добавляет стили к элементу
  btn.innerHTML = textBtn; //вставляет текст
  return btn;
}
