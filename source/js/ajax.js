
function getAjax(json) {
  return new Promise(function(succeed, fail) {
    var url = "https://толькотвори.рф/ajax.php";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
      if (this.status == 200) {
        succeed(this.responseText);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        fail(error);
      }
    };

    xhr.addEventListener("error", function() {
      fail(new Error("Network error"));
    });

    xhr.send(json);
  });
}

//отправка данных на сервер
function setAjax(json) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://толькотвори.рф/ajax.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
      // смотрим что пришло от сервера
      var jsonRes = JSON.parse(xhr.responseText);
    }
  });

  xhr.send(json);
}


//отправка данных о выставленных баллах по каждому критерию
function ajaxRating(json) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://толькотвори.рф/ajax.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(json);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
      // смотрим что пришло от сервера
      var jsonRes = JSON.parse(xhr.responseText);
    }
  });

}

//отправка данных о выставленных баллах по каждому критерию
function ajaxNominant(json) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://толькотвори.рф/ajax.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(json);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
      // смотрим что пришло от сервера
      var jsonRes = JSON.parse(xhr.responseText);
    }
  });

}

function createDataContestAll(id, size) {
  //Запрос
   var data = {
     "get_data":{
       "contest_id": id,
       "size": size,
       "data":{
         "title":""
       }
     }
   };
   return JSON.stringify(data);
}

function createDataTeamAll() {
  //Запрос
   var data = {
     "get_data":{
       "team_id":"0",
       "size":"all",
       "data":{
         "team_title":""
       }
     }
   };
   return JSON.stringify(data);
}

function createDataOrganizationAll() {
  //Запрос
   var data = {
     "get_data":{
       "organization_id":"0",
       "size":"all",
       "data":{
         "organization_title":""
       }
     }
   };
   return JSON.stringify(data);
}

function createContestNominationAll(id) {
   var data = {
     "get_data":{
       "contest_id": id,
       "size":"0",
       "data":{
         "nomination_title":""
       }
     }
   };
   return JSON.stringify(data);
}

function createPerformancenAll() {
   var data = {
     "get_data":{
       "performance_id":"0",
       "size":"all",
       "data":{
         "performance_title":""
       }
     }
   };
   return JSON.stringify(data);
}

function createPeople() {
   var data = {
     "get_data":{
       "people_my_name":""
     }
   };
   return JSON.stringify(data);
}



function createDataGetPeopleMyName() {
  var data = {
    "get_data": {
      "people_my_name": "" //имя пользователя
    }
  }
  return JSON.stringify(data);
}

function createDataGetContest() {
  var data = {
    "get_data": {
      "contest_id": "0",
      "size": "1",
      "data": {
        "contest_title": "", //название соревнования
        "prize_option": "" //Варианты призов
      }
    }
  }
  return JSON.stringify(data);
}

function createDataPerformance() {
  var data = {
    "get_data": {
      "performance_id": "0",
      "size": "all",
      "data": {
        "performance_age_category": "", //возрастная категория
        "performance_nomination": "", //категория номинации
        "performance_title": "", //название номера
        "performance_team_title": "", //название коллектива
        "performance_rating_sum": "", //итоговая сумма
        "performance_prize": "", //призовое рассчетное место
        "performance_prize_manual": "", //призовое выбранное вручную место
        "performance_turn_id": "" //номер выступления
      }
    }
  }
  return JSON.stringify(data);
}

function createDataDiploma() {
  var data = {
    "get_data": {
      "performance_id": "0",
      "size": "all",
      "data": {
        "performance_prize_manual": "", //призовое место выбранное вручную
        "performance_prize": "", //призовое место выбранное программно
        "performance_team_title": "", //название коллектива
        "performance_title": "", //название номера
        "performance_director": "" //Руководитель
      }
    }
  }
  return JSON.stringify(data);
}

function createDataProtocol() {
  var data = {
    "get_data": {
      "performance_id": "0",
      "size": "100",
      "data": {
        "performance_team_title": "", //название коллектива
        "performance_title": "", //название номера
        "performance_prize_manual": "", //призовое место выбранное вручную
        "performance_prize": "", //призовое место выбранное программно
        "performance_director": "" //Руководитель
      }
    }
  }
  return JSON.stringify(data);
}
