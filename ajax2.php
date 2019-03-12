<?php
//2019-02-19 03:10
require_once('./vendor/autoload.php');

if(isset($_POST['get_performance_info']) && logged_in())
	{
	$referee_id=$_SESSION['refereeId'];

	$arr_result=array(
		"performance_info" => 0,
		);

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT contestId,lastPerformanceId,lastCriteriaId FROM Referee WHERE refereeId=".$referee_id));
	$contest_id=$arr['contestId'];
	$last_performance_id=$arr['lastPerformanceId'];
	$last_criteria_id=$arr['lastCriteriaId'];

	if($last_performance_id>0)
		{//судья голосовал
		$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT turnId FROM Performance WHERE performanceId=".$last_performance_id." AND contestId=".$contest_id." LIMIT 1"));
		$turn_id=$arr['turnId']+1;
		$res=mysqli_query($connection,"SELECT * FROM Performance WHERE turnId=".$turn_id." AND contestId=".$contest_id." LIMIT 1");
		if(mysqli_num_rows($res)==0)
			{//голосование окончено
			exit(json_encode(array("performance_info" => "End"), JSON_UNESCAPED_UNICODE));
			}
		else
			{
			$arr=mysqli_fetch_assoc($res);
			}
		}
	else
		{//судья не голосовал
		$turn_id=1;
		$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT * FROM Performance WHERE turnId=".$turn_id." AND contestId=".$contest_id." LIMIT 1"));
		}

	$performance_id=$arr['performanceId'];
	$team_id=$arr['teamId'];
	$nomination_id=$arr['nominationId'];
	$age_category_id=$arr['ageCategoryId'];

	$arr_result['performance_info']=$performance_id;

        /**
         * Для передачи цвета кнопок принята HSB цветовая модель. Яркость (brightness) принимается равной 100% на фронте по умолчанию.
         * @var hue определяет цветовой тон (hue), может принимать значения от 0 красный до 360 красный (в качестве начала принимаем 60 желтый)
         * @var sat определяет насыщенность (saturation), может принимать значения от 0 (при любом значении hue цвет на выходе будет белым) красный до 100 (максимально яркий выбранный цвет)
         * @link https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&page=8#G1hhuR1ErX7XrEA9GTwLIhTRgmDFPaXjEC Пример и методика расчета цвета конкретного элемента
         */

	$arr_result[$performance_id]=array(
		"performance_title" => $arr['performanceTitle'],
		"performance_note" => "",
		"turn_id" => $turn_id,
		"turn_count" => 0,
		"age_category_title" => "",
        "age_category_color" => array("hue" => "", "sat" => ""),//  @Н добавил, не обрабатывается еще
		"nomination_title" => "",
        "nomination_color" => array("hue" => "", "sat" => ""),//@Н добавил, не обрабатывается еще
		"team_title" => "",
		"team_chief" => "",
		"criteria" => array(),//crit_id => crit_name
		"rating" => array(),//crit_id => rating

		);


	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT noteText FROM PerformanceNote WHERE performanceId=".$performance_id." AND refereeId=".$referee_id));
	$arr_result[$performance_id]['performance_note']=$arr['noteText'];

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT COUNT(*) as cnt FROM Performance WHERE contestId=".$contest_id));
	$arr_result[$performance_id]['turn_count']=$arr['cnt'];

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT ageCategoryTitle FROM AgeCategory WHERE ageCategoryId=".$age_category_id));
	$arr_result[$performance_id]['age_category_title']=$arr['ageCategoryTitle'];

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT nominationTitle FROM Nomination WHERE nominationId=".$nomination_id));
	$arr_result[$performance_id]['nomination_title']=$arr['nominationTitle'];

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT * FROM Team WHERE teamId=".$team_id));
	$arr_result[$performance_id]['team_title']=$arr['teamTitle'];

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT directorTitle,surname,lastname FROM Director d, People p WHERE d.performanceId=".$performance_id." AND d.peopleId=p.peopleId ORDER BY d.peopleId LIMIT 1"));
	$arr_result[$performance_id]['team_chief']=$arr['directorTitle']." ".$arr['surname']." ".$arr['lastname'];

	//get_criteria($contest_id); ?
	$res=mysqli_query($connection,"SELECT * FROM Criteria WHERE contestId=".$contest_id);
	while($arr=mysqli_fetch_assoc($res))
			{
			$arr_result[$performance_id]['criteria'][$arr['criteriaId']]=$arr['criteriaTitle'];
			$arr_result[$performance_id]['rating'][$arr['criteriaId']]=0;
			}

	//get_rating($performance_id,$referee_id); ?
	$res=mysqli_query($connection,"SELECT * FROM Rating WHERE performanceId=".$performance_id." AND refereeId=".$referee_id);
	while($arr=mysqli_fetch_assoc($res))
			$arr_result[$performance_id]['rating'][$arr['criteriaId']]=$arr['rating'];

	echo json_encode($arr_result, JSON_UNESCAPED_UNICODE);
	}

if(isset($_POST['set_rating']) && logged_in())
	{
	if(!is_numeric($_POST['performance_id']))
		exit(json_encode(array("error" => "type error")));
	$referee_id=$_SESSION['refereeId'];
	$performance_id=$_POST['performance_id'];
	$criteria_id=$_POST['criteria_id'];
	$rating=$_POST['rating'];

	//записываем оценку в БД
	$qry="INSERT INTO Rating (performanceId,refereeId,criteriaId,rating) VALUES('".$performance_id."','".$referee_id."','".$criteria_id."','".$rating."') ON DUPLICATE KEY UPDATE rating='".$rating."'";
	mysqli_query($connection,$qry);

	//записываем текущий СriteriaId в lastCriteriaId
	$qry="UPDATE Referee SET lastCriteriaId=".$criteria_id." WHERE refereeId=".$referee_id;
	mysqli_query($connection,$qry);

	//получаем список оцененных критериев
	$arr_rating=array();
	$res=mysqli_query($connection,"SELECT criteriaId,rating FROM Rating WHERE performanceId=".$performance_id." AND refereeId=".$referee_id." AND rating>0");
	while($arr=mysqli_fetch_assoc($res))
			$arr_rating[$arr['criteriaId']]=$arr['rating'];

	//сравниваем список оцененных критериев со всем списком критериев
	$end=1;
	$res=mysqli_query($connection,"SELECT c.criteriaId FROM Criteria c, Referee r WHERE c.contestId=r.contestId AND r.refereeId=".$referee_id);
	while($arr=mysqli_fetch_assoc($res))
		{
		if(!isset($arr_rating[$arr['criteriaId']]))
			{
			$end=0;
			break;
			}
		}

	if($end==1)
		{//все критерии оценены, записываем performanceId в lastPerformanceId
		$qry="UPDATE Referee SET lastPerformanceId=".$performance_id." WHERE refereeId=".$referee_id;
		mysqli_query($connection,$qry);
		}

	echo json_encode(array("end" => $end), JSON_UNESCAPED_UNICODE);
	}

if(isset($_POST['set_note']) && logged_in())
	{
	if(!is_numeric($_POST['performance_id']))
		exit(json_encode(array("error" => "type error")));
	$referee_id=$_SESSION['refereeId'];
	$performance_id=$_POST['performance_id'];
	$note=$_POST['note'];
	$qry="INSERT INTO PerformanceNote (performanceId,refereeId,noteText) VALUES('".$performance_id."','".$referee_id."','".$note."') ON DUPLICATE KEY UPDATE noteText='".$note."'";
	mysqli_query($connection,$qry);
	}
?>
