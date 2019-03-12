<?php

//if ($_POST == getOnlinePerformanceId){
if (isset($_POST)) {
  $outputDate = array (
    'onlinePerformanceId' => 10,
    10 => array (
      'criteria' => array(
        '1' =>1,
        '2' =>5,
        '3' =>'NULL'
      ),
      'comment' => "Отличный номер, на Нобелевскую их!"
    ),
    22 => array (
      'criteria' => array(
        '1' =>1,
        '2' =>5,
        '3' =>'NULL'
      ),
    'comment' => "Рекомендовать смену музыки"
    )
  );
  echo json_encode($outputDate, JSON_UNESCAPED_UNICODE);//отправляемые данные для страницы судий
} else {
  echo "Сработал иначе";
}
