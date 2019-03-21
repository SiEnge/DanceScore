//--------------------------------------------------
// Валидация формы
function validateBtn(btn) {
  var form = btn.form;
  var inputWrap = form.querySelectorAll(".form-registration__input-wrap");
  var flagValidate = true;
  //проверка на заполненность полей
  for (var i = 0; i < inputWrap.length; i++) {
     if (inputWrap[i].querySelector(".form-registration__input")) {
       if (+inputWrap[i].querySelector(".form-registration__input").value == 0) {
         inputWrap[i].dataset.validate = "error";
         var flagValidate = false;
       } else {
         inputWrap[i].dataset.validate = "ok";
       }
     }
  }

  //если все поля заполнены, то делаем следующие запросы:
  // проверка Performance и запрос set_performance_title (=performanceId)
  // проверка Team и запрос set_team_title (=teamId)
  // проверка Organization и запрос set_organization_title (=organizationId)
  // запрос set_people_name (=peopleId)

  // Когда получим вышеуказанные параметры, можно делать другие запросы
  //Выполняем set_performance_contest
  //Выполняем set_performance_team
  //Выполняем set_performance_nomination
  //Выполняем set_team_organization
  //Выполняем set_team_city
  //Выполняем set_performance_director


  if (flagValidate) {

    //если такого performance нет, то отправляем на сервер новые данные
    //---SET-PERFORMANCE-TITLE---//
    var input = wrapInputPerformance.querySelector(".form-registration__input");
    if (input.dataset.id == "0") {
        var data = {
          "set_performance_title":{
            "performance_id":"0",
            "performance_title": input.value
          }
        };
        var jsonSetPerf = JSON.stringify(data);
      getAjax(jsonSetPerf).then(function(response) {
        var jsonText = JSON.parse(response);
        var test = jsonText["performance_id"];
        setCookie("performanceId", test);
      });
    }

    //---SET-TEAM-TITLE---//
    var input = wrapInputTeam.querySelector(".form-registration__input");
    if (input.dataset.id == "0") {
        var data = {
          "set_team_title":{
            "team_id":"0",
            "team_title": input.value
          }
        };
        var jsonSetTeamTitle = JSON.stringify(data);
      getAjax(jsonSetTeamTitle).then(function(response) {
        var jsonText = JSON.parse(response);
        var test = jsonText["set_team_title"];
        setCookie("performanceId", test);
      });
    }

    //если такого performance нет, то отправляем на сервер новые данные
    //---SET-ORGANIZATION-TITLE---//
    var input = wrapInputOrganization.querySelector(".form-registration__input");
    if (input.dataset.id == "0") {
        var data = {
          "set_organization_title":{
            "organization_id":"0",
            "organization_title": input.value
          }
        };
        var jsonSetOrg = JSON.stringify(data);
      getAjax(jsonSetOrg).then(function(response) {
        var jsonText = JSON.parse(response);
        var test = jsonText["organization_id"];
        setCookie("organizationId", test);
      });
    }

    //обработка people
    if (!getCookie("people-id")) {
      //---SET-PEOPLE-NAME---//
      var wrapInputDirector = document.querySelectorAll(".form-registration__wrap--director");
      for (var i = 0; i < wrapInputDirector.length; i++) {
        var surname = wrapInputDirector[i].querySelector(".js_inputSurname");
        var lastname = wrapInputDirector[i].querySelector(".js_inputLastname");
        var middlename = wrapInputDirector[i].querySelector(".js_inputMiddlename");

        var data = {
          "set_people_name":{
            "surname": surname.querySelector(".form-registration__input").value,
            "lastname": lastname.querySelector(".form-registration__input").value,
            "middlename": middlename.querySelector(".form-registration__input").value
          }
        };
        var jsonSetPeople = JSON.stringify(data);

        //отправка нового названия
        getAjax(jsonSetPeople).then(function(response) {
          var jsonText = JSON.parse(response);
          var test = jsonText["people_id"];
          setCookie("peopleId", test);
        });
      }
    }

    //если такого team нет, то отправляем на сервер новые данные
    var input = wrapInputTeam.querySelector(".form-registration__input");
    //---SET-PERFORMANCE-TEAM---//
    if (input.dataset.id == "0") {
      var data = {
        "set_performance_team":{
          "performance_id": getCookie("performanceId"),
          "team_id":"0"
        }
      };
      var jsonSetTeam = JSON.stringify(data);
      getAjax(jsonSetTeam).then(function(response) {
        var jsonText = JSON.parse(response);
        var test = jsonText["performance_id"];
        setCookie("teamId", test);
      });
    }



    var contestId = getCookie("contestId");
    var performanceId = getCookie("performanceId");
    var nominationId = getCookie("nominationId");
    var organizationId = getCookie("organizationId");
    var teamId = getCookie("teamId");
    var peopleId = getCookie("peopleId");
    var resultError = [];

    //---SET-PERFORMANCE-CONTEST---//
    var data = {
      "set_performance_contest":{
        "performance_id": performanceId,
        "performance_contest": contestId
      }
    };
    var jsonSetPerCont = JSON.stringify(data);
    getAjax(jsonSetPerCont).then(function(response) {
      var result = response;
      if (result == "ERROR") {
        resultError.push("set_performance_contest");
      }
    });

    //---SET-PERFORMANCE-NOMINATION---//
    var data = {
      "set_performance_nomination":{
        "performance_id": performanceId,
        "nomination_id": nominationId
      }
    };
    var jsonSetPerfNom = JSON.stringify(data);
    getAjax(jsonSetPerfNom).then(function(response) {
      var result = response;
      if (result == "ERROR") {
        resultError.push("set_performance_nomination");
      }
    });

    //---SET-TEAM-CITY---//
    var wrapInputCity = document.querySelector(".js_inputCity");
    var input = wrapInputCity.querySelector(".form-registration__input");
    var data = {
      "set_team_city":{
        "team_id": teamId,
        "team_city": input.value
      }
    };
    var jsonSetPerfNom = JSON.stringify(data);
    getAjax(jsonSetPerfNom).then(function(response) {
      var result = response;
      if (result == "ERROR") {
        resultError.push("set_team_city");
      }
    });


    //---SET-TEAM-ORGANIZATION---//
    var data = {
      "set_team_organization":{
        "team_id": teamId,
        "organization_id": organizationId
      }
    };
    var jsonSetPerfNom = JSON.stringify(data);
    getAjax(jsonSetPerfNom).then(function(response) {
      var result = response;
      if (result == "ERROR") {
        resultError.push("set_team_organization");
      }
    });

    //---SET-PERFORMANCE-DIRECTOR---//
    var wrapInputDir = document.querySelector(".js_inputDirector");
    var input = wrapInputCity.querySelector(".form-registration__input");
    var data = {
      "set_performance_director":{
        "performance_id": performanceId,
        "people_id": peopleId,
        "director_title": input.value
      }
    };
    var jsonSetPerfDir = JSON.stringify(data);
    getAjax(jsonSetPerfDir).then(function(response) {
      var result = response;
      if (result == "ERROR") {
        resultError.push("set_performance_director");
      }
    });





    //вывод ошибок
    var resultMessage = document.querySelector(".form-registration__result")

    if (resultError.length > 0) {
      var msg = "";
      for (var i = 0; i < resultError.length; i++) {
        msg = msg + resultError[i] + "/ ";
      }
      resultMessage.innerHTML = "Ошибка записи " + msg + ", проверьте данные, если ошибка повторится свяжитесь с технической поддержкой"
    } else {
      resultMessage.innerHTML = "Номер зарегистрирован, с вами свяжутся организаторы"

    }









  }
}
