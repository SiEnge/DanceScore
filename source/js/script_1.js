// подготовка к отправке на сервер введенных чисел
function setRating(input) {
  var form = input.form;
  var formId = form.id;
  var inputId = input.name;
  var inputRating = input.value;
  // var scoringItem = input.parentElement.parentElement.parentElement;
  // scoringItem.class.List.remove("scoring__item--active");


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
  var form = input.form;
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

//проверка поля ввода критерия на внесенность
function checkRating(input) {
  var inputRating = input.value;
  var scoringItem = input.parentElement.parentElement.parentElement;
  var scoringName = scoringItem.querySelector(".scoring__name");
  var scoringQues = document.querySelector(".scoring__pop");
  var scoringText = scoringQues.querySelector(".scoring__question");
  // var inputName = input.name;

  // var form = input.form;
  // var scoringItems = form.querySelectorAll(".scoring__item");
  // scoringItem.classList.add("scoring__item--active");

  if (input.classList.contains("scoring__input--inactive")) {
    var chechInput = true;
  } else {
    var chechInput = false;
  }

  if (Number(inputRating) > 0 && chechInput) {
    input.id = "check";
    scoringText.innerHTML = "Хотите изменить данные в поле &quot" + scoringName.innerHTML + "&quot?"; //вставляет текст
    scoringQues.classList.add("scoring__pop--active");
  }
}

  //если нужно внести изменения
  var btnYes = document.querySelector(".scoring__button--yes");

  if (btnYes) {
    var scoringQues = document.querySelector(".scoring__pop");
    var scoringText = scoringQues.querySelector(".scoring__question");

    btnYes.addEventListener("click", function(event) {
      var checkInput = document.getElementById("check");

      event.preventDefault();
      scoringQues.classList.remove("scoring__pop--active");
      scoringText.innerHTML = "";
      if (checkInput.classList.contains("scoring__input--inactive")) {
        checkInput.classList.remove("scoring__input--inactive");
      }
      // checkInput.value = "0";
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

      event.preventDefault();
      scoringQues.classList.remove("scoring__pop--active");
      checkInput.removeAttribute("id");
      scoringText.innerHTML = "";

    });
  }



function inputActive(item) {
  var form = document.querySelector(".refereeForm__scoring");
  var items = form.querySelectorAll(".scoring__item");
  var formPoints = form.querySelector(".form__points");
  var btns = form.querySelectorAll(".points__button");

    if (item.classList.contains("scoring__item--active")) {
      // item.classList.remove("scoring__item--active");
      // formPoints.classList.remove("form__points--active");
    } else {
      for (var i = 0; i < items.length; i++) {
        if (items[i].classList.contains("scoring__item--active")) {
          items[i].classList.remove("scoring__item--active");
          var input = items[i].querySelector(".scoring__input");
          if (Number(input.value) > 0) {
            setRating(input);
          }

        }
      }
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("points__button--active")) {
          btns[i].classList.remove("points__button--active");
        }
      }
      item.classList.add("scoring__item--active");
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

function parsePerfomance(json) {
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
    var hue = json[formInfo].age_category_color["hue"];
    var sat = 100;
    var lit = json[formInfo].age_category_color["lit"];

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
  if (json[formInfo].nomination_title) {
    var categoryBtn = createBtn("category__button button", json[formInfo].nomination_title);
    category.appendChild(categoryBtn);
    var hue = json[formInfo].nomination_color["hue"];
    var sat = 100;
    var lit = json[formInfo].nomination_color["lit"];

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

  var i = 0;
  for (var key in json[formInfo].criteria) {
    if (i == 0) {
      scoringItem.classList.add("scoring__item--active");

    }
  }

  $('.scoring__list').slick({
    mobileFirst: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
    // arrows: false,
    slidesToShow: 3,
    infinite: false,
    // adaptiveHeight: false,
    // adaptiveHeight: true,
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
      breakpoint: 920,
      settings: {
        slidesToShow: 4
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
