//------------------------------------------------------------------------------
//СТРАНИЦА registration.html - "Подведение итогов"

function addDirector(btn) {
  var fieldDirector = btn.parentElement;
  var wrapDirector = fieldDirector.querySelector(".form-registration__wrap--director");

  var wrapDirectorClone = wrapDirector.cloneNode(true);

  // scoringItemClone.querySelector(".scoring__name").innerHTML = json[formInfo].criteria[key];
  // scoringItemClone.querySelector(".scoring__input").value = json[formInfo].rating[key];
  //
  // var scoringInput = scoringItemClone.querySelector(".scoring__input");
  //
  // scoringInput.name = key;
  wrapDirectorClone.appendChild(fieldDirector);
  scoringList.appendChild(scoringItemClone)
}
