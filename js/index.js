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
