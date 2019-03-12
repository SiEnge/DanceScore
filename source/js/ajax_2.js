window.addEventListener("load",function() {

  var xhr = new XMLHttpRequest();
  var get_performance_info = JSON.stringify ({
    get_performance_info: ""
  });
  xhr.open('POST','http://толькотвори.рф/ajax.php', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(get_performance_info);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState==4) && (xhr.status==200)) {
      // парсим json объект от сервера
      var json = JSON.parse(xhr.responseText);



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
  });
// }
});




// {"onlinePerformanceId":10,"10":{"criteria":{"1":1,"2":5,"3":"NULL"},"comment":"Отличный номер, на Нобелевскую их!"},"22":{"criteria":{"1":1,"2":5,"3":"NULL"},"comment":"Рекомендовать смену музыки"}}

// function testajax( rating) {
// $.ajax({
// url: 'http://толькотвори.рф/api.php',
// type: 'POST',
// typeDate: 'JSON',
// data: "rating=" + rating,
// success: function(msg){
// //alert( "Data Saved: " + msg);
// var json = $.parseJSON(msg);
// $("#performanceTitle").text(json.performanceTitle)
// $("#nominationTitle").text(json.nominationTitle)
// $("#contestTitle").text(json.contestTitle)
// $("#teamTitle").text(json.teamTitle)
// $("#refereeSurname").text(json.surname);
//
//
// //alert( "Data Saved: " + msg);
// }
// })
// return false;
// }
