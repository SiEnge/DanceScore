//------------------------------------------------------------------------------
//СТРАНИЦА registration.html - "Подведение итогов"

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//запись cookie
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

//удалить cookie
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}


var contestId;
var contestList = [];
var organizationtId;
var organizationList = [];
var nominationtId;
var nominationList = [];
var performanceId;
var performanceList = [];
var teamId;
var teamList = [];
var peopleId;

function parseRegContest(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputContest");

  for (var key in json) {
    contestList.push([key, json[key].title]);
  }
  inputContest.appendChild(createSelectList(contestList));
}

function parseRegContestCookie(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputContest");
  var input = inputContest.querySelector(".form-registration__input");
  var fieldTeam = document.querySelector(".form-registration__field--team")
  var fieldDir = document.querySelector(".form-registration__field--director")

  for (var key in json) {
    input.value = json[key].title;
    input.dataset.id = key;
  }

  inputContest.dataset.arrow = "none";
  inputContest.dataset.disabled = "true";

  fieldTeam.dataset.status = "show";
  fieldDir.dataset.status = "show";

  var jsonOrganizationtAll = createDataOrganizationAll();
  var jsonContestNominationAll = createContestNominationAll(contestId);
  var jsonPerformanceAll = createPerformancenAll();
  var jsonTeamAll = createDataTeamAll();


  //---GET-ORGANIZATION-TITLE---//
  //запрашиваем и выводим список Организаторов
  getAjax(jsonOrganizationtAll).then(function(response) {
    parseOrgContest(response);
  }).catch(function(error) {
    // console.log("Error!!!");
  });

  //---GET-CONTEST-NOMINATION-TITLE---//
  //запрашиваем и выводим список Номинаций в данном Соревновании
  getAjax(jsonContestNominationAll).then(function(response) {
    parseConNomContest(response);
  }).catch(function(error) {
    // console.log("Error!!!");
  });

  //---GET-PERFORMANCE-TITLE---//
  //запрашиваем и выводим список Названий номеров
  getAjax(jsonPerformanceAll).then(function(response) {
    parsePerfContest(response);
  }).catch(function(error) {
    // console.log("Error!!!");
  });

  //---GET-TEAM-TITLE---//
  //запрашиваем и выводим список Названий команд
  getAjax(jsonTeamAll).then(function(response) {
    parseTeamContest(response);
  }).catch(function(error) {
    // console.log("Error!!!");
  });
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
    for (var key2 in json[key].nomination_title) {
      nominationList.push([key2, json[key].nomination_title[key2]]);
    }
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

function parseTeamContest(jsonText) {
  var json = JSON.parse(jsonText);
  var inputContest = document.querySelector(".js_inputTeamName");

  for (var key in json) {
    teamList.push([key, json[key].team_title]);
  }
  inputContest.appendChild(createSelectList(teamList));
}

window.addEventListener("load", function() {
  deleteCookie("contestId");
  deleteCookie("organizationId");
  deleteCookie("performanceId");
  deleteCookie("nominationId");
  deleteCookie("teamId");
  deleteCookie("peopleId");


  var test = document.cookie;
  if (formReg) {
    // var contestId;
    //запрос данных о всех мероприятиях
    var cookieId = getCookie("contest-id");
    if (cookieId) {
      setCookie("contestId", cookieId);

      var jsonContestAll = createDataContestAll(cookieId, "1");
      getAjax(jsonContestAll).then(function(response) {
        parseRegContestCookie(response);
      }).catch(function(error) {
        // console.log("Error!!!");
      });
    } else {
      var jsonContestAll = createDataContestAll("0", "all");
      getAjax(jsonContestAll).then(function(response) {
        parseRegContest(response);
      }).catch(function(error) {
        // console.log("Error!!!");
      });

    }
  }
});


var formReg = document.querySelector(".form-registration");

if (formReg) {
  function addDirector(btn) {
    var fieldDirector = btn.parentElement;
    var wrapDirector = fieldDirector.querySelector(".form-registration__wrap--director");
    var wrapDirectorClone = wrapDirector.cloneNode(true);
    var input = wrapDirectorClone.querySelectorAll(".form-registration__input");
    for (var i = 0; i < input.length; i++) {
      input[i].value = "";
    }

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




    document.onclick = function(event) {
      event.preventDefault();

      var target = event.target;

      if (!target.classList.contains("form-registration__optionText") && !target.classList.contains("form-registration__input")) {
        var selectLists = document.querySelectorAll(".form-registration__select");
        for (var i = 0; i < selectLists.length; i++) {
          if (selectLists[i].dataset.status == "show") {
            selectLists[i].dataset.status = "hide";
          }
        }
      }

      if (target.classList.contains("form-registration__input")) {
        var wrapClass = target.parentElement.classList;
        var selectLists = document.querySelectorAll(".form-registration__select");
        for (var i = 0; i < selectLists.length; i++) {
          if (selectLists[i].dataset.status == "show" && selectLists[i].parentElement.classList != wrapClass) {
            selectLists[i].dataset.status = "hide";
          }
        }
      }
    };


  //обработка событий на поле Название соревнований
  var wrapInputContest = document.querySelector(".js_inputContest");
  //обработка ввода текст и показ подхадящий вариантов
  wrapInputContest.oninput = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__input")) { //если событие = ввод в инпут
      searchInput(target, wrapInputContest, contestList);
    }
  };

  // ставим обработчики на фазе перехвата, последний аргумент true
  wrapInputContest.addEventListener("focus", function() {
    var selectList = wrapInputContest.querySelector(".form-registration__select");
    if (selectList) {
      selectList.dataset.status = "show";
    }
  }, true);



  //обработка клика на выпадающем списке:
  // - открытие следующих форм
  // - запрос organization, nomination, performance, team
  wrapInputContest.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrapInputContest.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;

      //если название соревнований есть в общем списке, то
      // - записывается contest_id
      // - открываются fieldTeam и fieldDir
      // - запрашиваются данные
      var fieldTeam = document.querySelector(".form-registration__field--team")
      var fieldDir = document.querySelector(".form-registration__field--director")
      input.value = target.innerText;
      input.dataset.id = li.dataset.id;
      contestId = li.dataset.id;
      setCookie("contestId", li.dataset.id);
      // var test = document.cookie;
      var selectList = wrapInputContest.querySelector(".form-registration__select");
      if (selectList) {
        selectList.dataset.status = "hide";
      }

      fieldTeam.dataset.status = "show";
      fieldDir.dataset.status = "show";

      var jsonOrganizationtAll = createDataOrganizationAll();
      var jsonContestNominationAll = createContestNominationAll(contestId);
      var jsonPerformanceAll = createPerformancenAll();
      var jsonTeamAll = createDataTeamAll();

      //запрашиваем и выводим список Организаторов
      getAjax(jsonOrganizationtAll).then(function(response) {
        parseOrgContest(response);
      }).catch(function(error) {
        // console.log("Error!!!");
      });

      //запрашиваем и выводим список Номинаций в данном Соревновании
      getAjax(jsonContestNominationAll).then(function(response) {
        parseConNomContest(response);
      }).catch(function(error) {
        // console.log("Error!!!");
      });

      //запрашиваем и выводим список Названий номеров
      getAjax(jsonPerformanceAll).then(function(response) {
        parsePerfContest(response);
      }).catch(function(error) {
        // console.log("Error!!!");
      });

      //запрашиваем и выводим список Названий команд
      getAjax(jsonTeamAll).then(function(response) {
        parseTeamContest(response);
      }).catch(function(error) {
        // console.log("Error!!!");
      });

    }
  };

  //обработка события - потеря фокуса
  wrapInputContest.onchange = function() {
    var ul = formReg.querySelectorAll(".form-registration__select");
    var message = formReg.querySelectorAll(".form-registration__message");
    var input = wrapInputContest.querySelector(".form-registration__input");

    if (ul) {
      for (var i = 0; i < ul.length; i++) {
        if (ul[i].dataset.status = "show") {
          ul[i].dataset.status = "hide";
        }
      }
    }

    if (message) {
      for (var i = 0; i < message.length; i++) {
        message[i].dataset.status = "hide";
      }
    }

    for (var i = 0; i < contestList.length; i++) {
      if (contestList[i][1] == input.value) {
        input.dataset.id = contestList[i][0];
        break;
      } else {
        input.dataset.id = "0";
      }
    }
    setCookie("contestId", input.dataset.id);
  };

  //обработка событий на поле Название номинаций
  var wrapInputNomination = document.querySelector(".js_inputNomination");
  //обработка ввода текст и показ подхадящий вариантов
  wrapInputNomination.oninput = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__input")) { //если событие = ввод в инпут
      searchInput(target, wrapInputNomination, nominationList);
    }
  };

  // ставим обработчики на фазе перехвата, последний аргумент true
  wrapInputNomination.addEventListener("focus", function() {
    var selectList = wrapInputNomination.querySelector(".form-registration__select");
    if (selectList) {
      selectList.dataset.status = "show";
    }
  }, true);

  //обработка клика на выпадающем списке
  wrapInputNomination.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrapInputNomination.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      input.value = target.innerText;
      input.dataset.id = li.dataset.id;
      nominationtId = li.dataset.id;
      setCookie("nominationId", li.dataset.id);
      var selectList = wrapInputNomination.querySelector(".form-registration__select");
      if (selectList) {
        selectList.dataset.status = "hide";
      }
    }
  };
  //обработка события - потеря фокуса
  wrapInputNomination.onchange = function() {
    var ul = formReg.querySelectorAll(".form-registration__select");
    var message = formReg.querySelectorAll(".form-registration__message");
    var input = wrapInputNomination.querySelector(".form-registration__input");

    if (ul) {
      for (var i = 0; i < ul.length; i++) {
          if (ul[i].dataset.status = "show") {
            ul[i].dataset.status = "hide";
          }
      }
    }
    if (message) {
      for (var i = 0; i < message.length; i++) {
        message[i].dataset.status = "hide";
      }
    }

    for (var i = 0; i < teamList.length; i++) {
      if (teamList[i][1] == input.value) {
        input.dataset.id = teamList[i][0];
        break;
      } else {
        input.dataset.id = "0";
      }
    }
    setCookie("nominationId", input.dataset.id);

  };



  //обработка событий на поле Название номера
  var wrapInputPerformance = document.querySelector(".js_inputPerformance");
  //обработка ввода текст и показ подхадящий вариантов
  wrapInputPerformance.oninput = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__input")) { //если событие = ввод в инпут
      searchInput(target, wrapInputPerformance, performanceList);
    }
  };

  // ставим обработчики на фазе перехвата, последний аргумент true
  wrapInputPerformance.addEventListener("focus", function() {
    var selectList = wrapInputPerformance.querySelector(".form-registration__select");
    if (selectList) {
      selectList.dataset.status = "show";
    }
  }, true);

  //обработка клика на выпадающем списке
  wrapInputPerformance.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrapInputPerformance.querySelector(".form-registration__input");
      var li = target.parentElement;
      // - записывается nomination_id
      input.value = target.innerText;
      input.dataset.id = li.dataset.id;
      performanceId = li.dataset.id;
      setCookie("performanceId", li.dataset.id);
      // deleteCookie("performance-id");
      var test = document.cookie;
      var selectList = wrapInputPerformance.querySelector(".form-registration__select");
      if (selectList) {
        selectList.dataset.status = "hide";
      }
    }
  };
  //обработка события - потеря фокуса
  wrapInputPerformance.onchange = function() {
    var ul = formReg.querySelectorAll(".form-registration__select");
    var message = formReg.querySelectorAll(".form-registration__message");
    var input = wrapInputPerformance.querySelector(".form-registration__input");

    if (ul) {
      for (var i = 0; i < ul.length; i++) {
        if (ul[i].dataset.status = "show") {
          ul[i].dataset.status = "hide";
        }
      }
    }
    if (message) {
      for (var i = 0; i < message.length; i++) {
        message[i].dataset.status = "hide";
      }
    }
    for (var i = 0; i < performanceList.length; i++) {
      if (performanceList[i][1] == input.value) {
        input.dataset.id = performanceList[i][0];
        break;
      } else {
        input.dataset.id = "0";
      }
    }
    setCookie("performanceId", input.dataset.id);

  };


  //обработка событий на поле Название учреждения
  var wrapInputOrganization = document.querySelector(".js_inputOrganization");
  //обработка ввода текст и показ подхадящий вариантов
  wrapInputOrganization.oninput = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__input")) { //если событие = ввод в инпут
      searchInput(target, wrapInputOrganization, organizationList);
    }
  };

  // ставим обработчики на фазе перехвата, последний аргумент true
  wrapInputOrganization.addEventListener("focus", function() {
    var selectList = wrapInputOrganization.querySelector(".form-registration__select");
    if (selectList) {
      selectList.dataset.status = "show";
    }
  }, true);

  //обработка клика на выпадающем списке
  wrapInputOrganization.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrapInputOrganization.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      //проверка внесенных данных в поле js_inputContest
      // for (var i = 0; i < organizationList.length; i++) {
      //   if (input.value != organizationList[i][1]) flag = false;
      // }
      if (flag) {
        //если название соревнований есть в общем списке, то
        // - записывается nomination_id
        input.value = target.innerText;
        input.dataset.id = li.dataset.id;
        organizationtId = li.dataset.id;
        setCookie("organizationId", li.dataset.id);

        var selectList = wrapInputOrganization.querySelector(".form-registration__select");
        if (selectList) {
          selectList.dataset.status = "hide";
        }

      }
    }
  };
  //обработка события - потеря фокуса
  wrapInputOrganization.onchange = function() {
    var ul = formReg.querySelectorAll(".form-registration__select");
    var message = formReg.querySelectorAll(".form-registration__message");
    var input = wrapInputOrganization.querySelector(".form-registration__input");

    if (ul) {
      for (var i = 0; i < ul.length; i++) {
        if (ul[i].dataset.status = "show") {
          ul[i].dataset.status = "hide";
        }
      }
    }

    if (message) {
      for (var i = 0; i < message.length; i++) {
        message[i].dataset.status = "hide";
      }
    }

    for (var i = 0; i < organizationList.length; i++) {
      if (organizationList[i][1] == input.value) {
        input.dataset.id = organizationList[i][0];
        break;
      } else {
        input.dataset.id = "0";
      }
    }
    setCookie("organizationId", input.dataset.id);

  };

  //обработка событий на поле Название команд
  var wrapInputTeam = document.querySelector(".js_inputTeamName");
  //обработка ввода текст и показ подхадящий вариантов
  wrapInputTeam.oninput = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__input")) { //если событие = ввод в инпут
      searchInput(target, wrapInputTeam, teamList);
    }
  };

  // ставим обработчики на фазе перехвата, последний аргумент true
  wrapInputTeam.addEventListener("focus", function() {
    var selectList = wrapInputTeam.querySelector(".form-registration__select");
    if (selectList) {
      selectList.dataset.status = "show";
    }
  }, true);

  //обработка клика на выпадающем списке
  wrapInputTeam.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains("form-registration__optionText")) {
      var input = wrapInputTeam.querySelector(".form-registration__input");
      var li = target.parentElement;
      var flag = true;
      //проверка внесенных данных в поле js_inputContest
      // for (var i = 0; i < teamList.length; i++) {
      //   if (input.value != teamList[i][1]) flag = false;
      // }
      if (flag) {
        //если название соревнований есть в общем списке, то
        // - записывается nomination_id
        input.value = target.innerText;
        input.dataset.id = li.dataset.id;
        teamId = li.dataset.id;
        setCookie("teamId", li.dataset.id);

        var selectList = wrapInputTeam.querySelector(".form-registration__select");
        if (selectList) {
          selectList.dataset.status = "hide";
        }

      }
    }
  };
  //обработка события - потеря фокуса
  wrapInputTeam.onchange = function() {
    var ul = formReg.querySelectorAll(".form-registration__select");
    var message = formReg.querySelectorAll(".form-registration__message");
    var input = wrapInputTeam.querySelector(".form-registration__input");


    if (ul) {
      for (var i = 0; i < ul.length; i++) {
        if (ul[i].dataset.status = "show") {
          ul[i].dataset.status = "hide";
        }
      }
    }
    if (message) {
      for (var i = 0; i < message.length; i++) {
        message[i].dataset.status = "hide";
      }
    }


    for (var i = 0; i < teamList.length; i++) {
      if (teamList[i][1] == input.value) {
        input.dataset.id = teamList[i][0];
        break;
      } else {
        input.dataset.id = "0";
      }
    }
    setCookie("teamId", input.dataset.id);

  };

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
    if (optionText[i][1].toLowerCase().indexOf(entered) >= 0) {
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
      p.innerHTML = arrList[i][1]; //вставить текст
      // p.innerHTML = arrList[i]; //вставить текст
      li.className = "form-registration__option"; //добавляет стили к элементу
      li.setAttribute("data-id", arrList[i][0]);
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
