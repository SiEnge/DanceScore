window.addEventListener("load",function() {


// function testajax() {
  var xhr = new XMLHttpRequest();
  var test = "10";
  xhr.open('POST','http://толькотвори.рф/api.php', true);
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(test);

  xhr.addEventListener('readystatechange', function() {
    if ((xhr.readyState==4) && (xhr.status==200)) {
      // тест
      // var welcome = document.getElementById('welcome');
      var onlinePerformanceId = document.getElementById('onlinePerformanceId');
      var json = JSON.parse(xhr.responseText);
      var formStatus = json.onlinePerformanceId;
      openForm(formStatus);

      if (formStatus > 0) {
        for (var i = 0; i < json.length; i++) {
          if (json[i] == formStatus) {
            onlinePerformanceId.innerHTML = json[i].onlinePerformanceId;
            nominationTitle.innerHTML = json[i].nominationTitle;
            teamTitle.innerHTML = json[i].teamTitle;
            refereeSurname.innerHTML = json[i].refereeSurname;
          }
        }
      }
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
