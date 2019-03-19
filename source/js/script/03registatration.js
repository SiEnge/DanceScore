//------------------------------------------------------------------------------
//СТРАНИЦА registration.html - "Подведение итогов"


// сначала  после ввода данных в форму (или при внесении в поля руководителя) идет проверка есть ли человек с people_id
// https://hgf.xn--b1amedocbqle1i.xn--p1ai/index.php/Set_people_name
var contestId;
var contestList = [];
var organizationtId;
var organizationList = [];
var nominationtId;
var nominationList = [];
var performanceId;
var performanceList = [];

function parseRegContest(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputContest");

  for (var key in json) {
    contestList.push([key, json[key].title]);
  }
  inputContest.appendChild(createSelectList(contestList));
}

function parseOrgContest(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputOrganization");

  for (var key in json) {
    organizationList.push([key, json[key].organization_title]);
  }
  inputContest.appendChild(createSelectList(organizationList));
}

function parseConNomContest(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputNomination");

  for (var key in json) {
    nominationList.push([key, json[key].organization_title]);
  }
  inputContest.appendChild(createSelectList(nominationList));
}

function parsePerfContest(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputPerformance");

  for (var key in json) {
    performanceList.push([key, json[key].performance_title]);
  }
  inputContest.appendChild(createSelectList(performanceList));
}

window.addEventListener("load", function() {
  var formReg = document.querySelector(".form-registration");

  if (formReg) {
    var contestId;
    //запрос данных о всех мероприятиях
    var jsonContestAll = createDataContestAll();
    getAjax(jsonContestAll).then(function(response) {
    return parseRegContest(response);
    }).catch(function(error) {
    // console.log("Error!!!");
    });
  }
});


var formReg = document.querySelector(".form-registration");

if (formReg) {
  function addDirector(btn) {
    var fieldDirector = btn.parentElement;
    var wrapDirector = fieldDirector.querySelector(".form-registration__wrap--director");
    var wrapDirectorClone = wrapDirector.cloneNode(true);

    fieldDirector.insertBefore(wrapDirectorClone, btn);
  }

  function removeDirector(btn) {
    var fieldDirector = btn.parentElement;
    var wrapDirectors = fieldDirector.querySelectorAll(".form-registration__wrap--director");

    if (wrapDirectors.length > 1) {
      fieldDirector.removeChild(wrapDirectors[wrapDirectors.length - 1]);
    }
  }

  $(function() {
    $("#phone").mask("+7 (999) 999-9999");
  });

  formReg.oninput = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__input")) { //если событие = ввод в инпут
      if (target.getAttribute("data-input") == "teamName") {
        var inputWrap = formReg.querySelector(".js_inputTeamName");
        // var optionText = [
        //   "Ромашки",
        //   "Цветочки",
        //   "Ромашки 2",
        //   "Цветные сказки",
        //   "Веснушки",
        //   "Бусинки"
        // ];
      }

      if (target.getAttribute("data-input") == "organization") {
        var inputWrap = formReg.querySelector(".js_inputOrganization");
        // var optionText = [
        //   "Школа балета",
        //   "Студия танца",
        //   "Дворец культуры",
        //   "Фитнес-группа",
        //   "Гимназия",
        //   "Ансамбль"
        // ];
      }

      if (target.getAttribute("data-input") == "performance") {
        var inputWrap = formReg.querySelector(".js_inputPerformance");
        // var optionText = [
        //   "Ромашки",
        //   "Цветочки",
        //   "Ромашки 2",
        //   "Цветные сказки",
        //   "Веснушки",
        //   "Бусинки"
        // ];
      }

      if (target.getAttribute("data-input") == "nomination") {
        var inputWrap = formReg.querySelector(".js_inputNomination");
        // var optionText = [
        //   "Школа балета",
        //   "Студия танца",
        //   "Дворец культуры",
        //   "Фитнес-группа",
        //   "Гимназия",
        //   "Ансамбль"
        // ];
      }
      if (target && inputWrap && optionText) searchInput(target, inputWrap, optionText);
    }
  };

  function choiceContest(wrap) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrap.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      //проверка внесенных данных в поле js_inputContest
      for (var i = 0; i < contestList.length; i++) {
        if (input.value != contestList[i][1]) { //если внесенные данные не совпадают с предложенным списком
          flag = false;
        }
      }
      if (flag) {
        input.value = target.innerText;
        input.dataset.id = li.dataset.id;
        contestId = li.dataset.id;
        document.cookie = "contest-id=" + li.dataset.id;
        var test = document.cookie;


        var jsonOrganizationtAll = createDataOrganizationAll();
        var jsonContestNominationAll = createContestNominationAll(contestId);
        var jsonPerformanceAll = createPerformancenAll();

        getAjax(jsonOrganizationtAll).then(function(response) {
        parseOrgContest(response);
        }).catch(function(error) {
        // console.log("Error!!!");
        });

        getAjax(jsonContestNominationAll).then(function(response) {
        parseConNomContest(response);
        }).catch(function(error) {
        // console.log("Error!!!");
        });

        getAjax(jsonPerformanceAll).then(function(response) {
        parseConNomContest(response);
        }).catch(function(error) {
        // console.log("Error!!!");
        });

      }
    }
  }

  function choiceOrganization(wrap) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrap.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      //проверка внесенных данных в поле js_inputContest
      for (var i = 0; i < organizationList.length; i++) {
        if (input.value != organizationList[i][1]) { //если внесенные данные не совпадают с предложенным списком
          flag = false;
        } else { //иначе содаем новый organization_title
          var data = {
            "set_organization_title":{
              "organization_id":"0",
              "organization_title": input.value
            }
          };
          var json = JSON.stringify(data);
          getAjax(json).then(function(response) {
          organizationtId = response;
          }).catch(function(error) {
          // console.log("Error!!!");
          });
        }
      }
      // if (flag) {
      //   input.value = target.innerText;
      //   input.dataset.id = li.dataset.id;
      //   organizationtId = li.dataset.id;
      //
      // }
    }
  }

  function choicePerformance(wrap) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrap.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      //проверка внесенных данных в поле js_inputContest
      // for (var i = 0; i < organizationList.length; i++) {
      //   if (input.value != organizationList[i][1]) { //если внесенные данные не совпадают с предложенным списком
      //     flag = false;
      //   } else { //иначе содаем новый organization_title
          // var data = {
          //   "set_organization_title":{
          //     "organization_id":"0",
          //     "organization_title": input.value
          //   }
          // };
          // var json = JSON.stringify(data);
          // getAjax(json).then(function(response) {
          // organizationtId = response;
          // }).catch(function(error) {
          // // console.log("Error!!!");
          // });
      //   }
      // }
      // if (flag) {
      //   input.value = target.innerText;
      //   input.dataset.id = li.dataset.id;
      //   organizationtId = li.dataset.id;
      //
      // }
    }
  }

  function choiceNomination(wrap) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrap.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      //проверка внесенных данных в поле js_inputContest
      // for (var i = 0; i < organizationList.length; i++) {
      //   if (input.value != organizationList[i][1]) { //если внесенные данные не совпадают с предложенным списком
      //     flag = false;
      //   } else { //иначе содаем новый organization_title
          // var data = {
          //   "set_organization_title":{
          //     "organization_id":"0",
          //     "organization_title": input.value
          //   }
          // };
          // var json = JSON.stringify(data);
          // getAjax(json).then(function(response) {
          // organizationtId = response;
          // }).catch(function(error) {
          // // console.log("Error!!!");
          // });
        // }
      // }
      // if (flag) {
      //   input.value = target.innerText;
      //   input.dataset.id = li.dataset.id;
      //   organizationtId = li.dataset.id;
      //
      // }
    // }
    }
  }


  formReg.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var wrap = target.parentElement.parentElement.parentElement;
      var input = wrap.querySelector(".form-registration__input");
      var li = target.parentElement;
      input.value = target.innerText;
      input.dataset.id = li.dataset.id;
    }
  };

  formReg.onchange = function() {
    var ul = formReg.querySelectorAll(".form-registration__select");
    var message = formReg.querySelectorAll(".form-registration__message");
    if (ul) {
      for (var i = 0; i < ul.length; i++) {
        ul[i].dataset.status = "hide";
      }
    }

    if (message) {
      for (var i = 0; i < message.length; i++) {
        message[i].dataset.status = "hide";
      }
    }
  }
}

// поиск по выпадающему списку
function searchInput(input, inputWrap, optionText) {
  var entered = input.value.toLowerCase();
  var listResult = [];
  var ul = inputWrap.querySelector(".form-registration__select");
  var message = inputWrap.querySelector(".form-registration__message");

  if (ul) ul.dataset.status = "show";
  if (message) message.dataset.status = "show";

  for (var i = 0; i < optionText.length; i++) {
    if (optionText[i].toLowerCase().indexOf(entered) >= 0) {
      listResult.push(optionText[i]);
    }
  }
  if (ul) inputWrap.removeChild(ul);
  if (message) inputWrap.removeChild(message);
  inputWrap.appendChild(createSelectArr(listResult));
}




// создание выпадающего списка
function createSelectList(arrList) {
    var ul = document.createElement('ul'); //создает элемент List
    ul.className = "form-registration__select"; //добавить класс
    for (var i = 0; i < arrList.length; i++) {
      var p = document.createElement('p'); //создать элемент Paragraph
      var li = document.createElement('li'); //создает элемент ListIndex
      p.className = "form-registration__optionText"; //добавить класс
      p.innerHTML = arrList[i][1]; //вставить текст
      li.className = "form-registration__option"; //добавляет стили к элементу
      li.setAttribute("data-id", arrList[i][0]);
      li.appendChild(p);
      ul.appendChild(li);
      ul.dataset.status = "hide";
    }
    return ul;
}

// создание выпадающего списка
function createSelectArr(arrList) {
  if (arrList.length > 0) {
    var ul = document.createElement('ul'); //создает элемент List
    ul.className = "form-registration__select"; //добавить класс
    for (var i = 0; i < arrList.length; i++) {
      var p = document.createElement('p'); //создать элемент Paragraph
      var li = document.createElement('li'); //создает элемент ListIndex
      p.className = "form-registration__optionText"; //добавить класс
      p.innerHTML = arrList[i]; //вставить текст
      li.className = "form-registration__option"; //добавляет стили к элементу
      li.appendChild(p);
      ul.appendChild(li);
      ul.dataset.status = "show";
    }
    return ul;
  } else {
    var p = document.createElement('p'); //создать элемент Paragraph
    p.className = "form-registration__message"; //добавить класс
    p.innerHTML = "Результат не найден"; //вставить текст
    return p;
  }
}

var test = document.cookie;
