//запрос данных о конкурсе
function requestPerformance() {
  var xhr = new XMLHttpRequest();
  var body = 'get_performance_info=';

  var text = {
    "get_data": {
      "id": "0",
      "size": "",
      "data": {
        "performance_turn_id": "",
        "performance_turn_id": "",
        "performance_age_category": "",
        "performance_nomination": "",
        "performance_title": "",
        // "team_title"
        "performance_director": ""
        // "performance_note"
        // "criteria"
        // "rating"
      }
    }
  }
  var json = JSON.stringify(body);

  var php = 'https://толькотвори.рф/sienge/ajax.php';
  if (php == 'https://толькотвори.рф/sienge/ajax.php') {
    var div = document.createElement('div'); //создает элемент button
    div.innerHTML = "Тестовая страница"; //вставляет текст
    var page = document.querySelector(".page");
    page.insertBefore(div, page.firstChild);
  }

  xhr.open('POST', php, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(body);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
      // парсим json объект от сервера
      var json = JSON.parse(xhr.responseText);
      // функция расстановки полученных данных по форме
      parsePerfomance(json);
    }
  });
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



//запрос данных о конкурсе на страницу "Подведения итогов"
function requestContest() {
  var xhr = new XMLHttpRequest();

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

  var json = JSON.stringify(data);

  var php = 'https://толькотвори.рф/ajax.php';
  if (php == 'https://толькотвори.рф/sienge/ajax.php') {
    var div = document.createElement('div'); //создает элемент button
    div.innerHTML = "Тестовая страница"; //вставляет текст
    var page = document.querySelector(".page");
    page.insertBefore(div, page.firstChild);
  }

  xhr.open('POST', php, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(json);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
      // парсим json объект от сервера
      var json = JSON.parse(xhr.responseText);
      // функция расстановки полученных данных по форме
      parseContest(json);
    }
  });
  requestResult();

}

// Запрос данных о номинантах на страницу "Подведения итогов"
function requestResult(json) {
  var xhr = new XMLHttpRequest();

  var data = {
    "get_data": {
      "performance_id": "0",
      "size": "100",
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

  var php = 'https://толькотвори.рф/ajax.php';
  if (php == 'https://толькотвори.рф/sienge/ajax.php') {
    var div = document.createElement('div'); //создает элемент button
    div.innerHTML = "Тестовая страница"; //вставляет текст
    var page = document.querySelector(".page");
    page.insertBefore(div, page.firstChild);
  }

  xhr.open('POST', php, true);
  // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(json);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
      // парсим json объект от сервера
      var json = JSON.parse(xhr.responseText);
      // функция расстановки полученных данных по форме
      parseResult(json, 0, 5);
    }
  });

}

//////////////////----ТЕСТЫ----//////////////////

// Тестовый запрос #2 на сервер с использование get_data
function requestContest_test() {

  var text = {
    "1": {
      "contest_title": "Всероссийский АРТ-конкурс",
      "prize_option": {
        "1": "Гран-при|1",
        "2": "Лауреат 1 степени|4",
        "3": "Лауреат 2 степени|4",
        "4": "Лауреат 3 степени|4",
        "5": "Призер 1 степени|8",
        "6": "Призер 2 степени|10",
        "7": "Призер 3 степени|12"
      }
    }
  }

  var jsonin = JSON.stringify(text);
  var jsonout = JSON.parse(jsonin);
  parseContest(jsonout);
  requestResult();
}


function requestResult_test() {
  var text = {
    "16": {
      "performance_title": "Ромашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "Младшая",
      "performance_age_color": {
        "hue": "55",
        "lit": "55"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "Уличные танцы",
      "performance_nomination_color": {
        "hue": "166",
        "lit": "66"
      },
      "performance_rating_sum": "97,8",
      "performance_prize": {
        "1":"Гран-при"
      },
      "performance_team_title": "СДЮШОР г. Челябинска СДЮШОР",
      "performance_turn_id":"9"
    },
    "61": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "25",
        "lit": "25"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "126",
        "lit": "26"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"209"
    },
    "616": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "15",
        "lit": "15"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "116",
        "lit": "16"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"269"
    },
    "60": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "35",
        "lit": "35"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "136",
        "lit": "36"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"279"
    },
    "51": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "52": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "54": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "56": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "57": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "58": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "59": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "81": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "82": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "83": {
      "performance_title": "тестРомашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "тест Младшая",
      "performance_age_color": {
        "hue": "45",
        "lit": "45"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "тест Уличные танцы",
      "performance_nomination_color": {
        "hue": "146",
        "lit": "46"
      },
      "performance_rating_sum": "197,8",
      "performance_prize": {
        "2":"Лауреат 1 степени"
      },
      "performance_team_title": "тест СДЮШОР г. Челябинска",
      "performance_turn_id":"219"
    },
    "617": {
      "performance_title": "Ромашки",
      "performance_age_category_id": "",
      "performance_age_category_title": "Младшая",
      "performance_age_color": {
        "hue": "55",
        "lit": "55"
      },
      "performance_nomination_id": "",
      "performance_nomination_title": "Уличные танцы",
      "performance_nomination_color": {
        "hue": "166",
        "lit": "66"
      },
      "performance_rating_sum": "97,8",
      "performance_prize": {
        "7":"Призер 3 степени"
      },
      "performance_team_title": "СДЮШОР г. Челябинска",
      "performance_turn_id":"29"
    }
  }
  var jsonin = JSON.stringify(text);
  var jsonout = JSON.parse(jsonin);
  // parseResult(jsonout);
  parseResult(jsonout, 0, 3);
  // parseResult(jsonout);


}
