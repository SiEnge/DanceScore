<?php
//2019-02-22 05:32
require_once('./vendor/autoload.php');

$logfilename="/var/www/ajax.php.log";

if(isset($_POST))
	if(count($_POST)>0)
		{
		$logfile=fopen($logfilename,"a+");
		$logstr="--------".date("Y-m-d H:i:s")."--------\n";
		foreach($_POST as $k => $v)
			$logstr.="[".$k."] => ".$v."; ";
		fwrite($logfile,$logstr."\n");
		fclose($logfile);
		}

$_JSON = json_decode(file_get_contents('php://input'),true);

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
		"age_category_color" => array(),// crit_id => array("hue" => "", "lig" => "")
		"nomination_title" => "",
		"nomination_color" => array("hue" => 60,"lig" => 70,),
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
	
	//получаем цвет для номинации
	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT COUNT(*) as cnt FROM Nomination WHERE contestId=".$contest_id));
	$step=floor(360/$arr['cnt']);
	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT COUNT(*) as cnt FROM Nomination WHERE contestId=".$contest_id." AND nominationId<".$nomination_id));
	$curr=$arr['cnt'];
	$arr_result[$performance_id]['nomination_color']=array("hue" => $step*$curr, "lig" => 50+30*($curr%2),);

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT * FROM Team WHERE teamId=".$team_id));
	$arr_result[$performance_id]['team_title']=$arr['teamTitle'];

	$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT directorTitle,surname,lastname FROM Director d, People p WHERE d.performanceId=".$performance_id." AND d.peopleId=p.peopleId ORDER BY d.peopleId LIMIT 1"));
	$arr_result[$performance_id]['team_chief']=$arr['directorTitle']." ".$arr['surname']." ".$arr['lastname'];

	//get_criteria($contest_id); ?
	$res=mysqli_query($connection,"SELECT * FROM Criteria WHERE contestId=".$contest_id." ORDER BY criteriaId");
	$step=floor(360/mysqli_num_rows($res));
	$i=0;
	while($arr=mysqli_fetch_assoc($res))
			{
			$arr_result[$performance_id]['criteria'][$arr['criteriaId']]=$arr['criteriaTitle'];
			$arr_result[$performance_id]['rating'][$arr['criteriaId']]=0;
			//распределение цветов
			$arr_result[$performance_id]['age_category_color'][$arr['criteriaId']]=array("hue" => ($i*$step), "lig" => 50+30*($i%2));
			$i++;
			}

	//get_rating($performance_id,$referee_id); ?
	$res=mysqli_query($connection,"SELECT * FROM Rating WHERE performanceId=".$performance_id." AND refereeId=".$referee_id);
	while($arr=mysqli_fetch_assoc($res))
			$arr_result[$performance_id]['rating'][$arr['criteriaId']]=$arr['rating'];

	echo json_encode($arr_result, JSON_UNESCAPED_UNICODE);
	}

if(isset($_JSON['set_rating']) && logged_in())
	{
	$referee_id=$_SESSION['refereeId'];

	$arr=$_JSON['set_rating'];
	$performance_id=$arr['performance_id'];
	$criteria_id=$arr['criteria_id'];
	$rating=$arr['rating'];
	$rating=str_replace(",",".",$rating);

	//записываем оценку в БД
	$qry="INSERT INTO Rating (performanceId,refereeId,criteriaId,rating) VALUES('".$performance_id."','".$referee_id."','".$criteria_id."','".$rating."') ON DUPLICATE KEY UPDATE rating='".$rating."'";
	mysqli_query($connection,$qry);

	$logfile=fopen($logfilename,"a+");
	fwrite($logfile,$qry."\n");
	fclose($logfile);

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

if(isset($_JSON['set_note']) && logged_in())
	{
	$referee_id=$_SESSION['refereeId'];

	$arr=$_JSON['set_note'];
	$performance_id=$arr['performance_id'];
	$note=mysqli_real_escape_string($connection,$arr['note']);

	$qry="INSERT INTO PerformanceNote (performanceId,refereeId,noteText) VALUES('".$performance_id."','".$referee_id."','".$note."') ON DUPLICATE KEY UPDATE noteText='".$note."'";
	mysqli_query($connection,$qry);

	$logfile=fopen($logfilename,"a+");
	fwrite($logfile,$qry."\n");
	fclose($logfile);
	}

if(isset($_JSON['get_data']) && logged_in())
	{
	$contest_id=0;
	if(isset($_SESSION['administratorId']))
		{
		$administrator_id=$_SESSION['administratorId'];
		$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT contestId FROM Administrator WHERE administratorId=".$administrator_id));
		}
	if(isset($_SESSION['refereeId']))
		{
		$referee_id=$_SESSION['refereeId'];
		$arr=mysqli_fetch_assoc(mysqli_query($connection,"SELECT contestId FROM Referee WHERE refereeId=".$referee_id));
		}
	$contest_id=$arr['contestId'];

	//Информация по соревнованию
	$qry="SELECT * FROM Contest WHERE contestId=".$contest_id;
	$arr_contest=mysqli_fetch_assoc(mysqli_query($connection,$qry));

	//Количество номеров в соревновании
	$qry="SELECT COUNT(*) as cnt FROM Performance WHERE contestId=".$contest_id;
	$arr=mysqli_fetch_assoc(mysqli_query($connection,$qry));
	$performance_count=$arr['cnt'];

	//количество запрошенных записей
	$size=$_JSON['get_data']['size'];
	if(!is_numeric($size))
		exit(json_encode(array("error" => "type error"))); 

	$data=$_JSON['get_data']['data'];

	if(isset($_JSON['get_data']['performance_id']))
		{//запрошена информация по номерам
		$id=$_JSON['get_data']['performance_id'];
		if(!is_numeric($id))
			exit(json_encode(array("error" => "type error")));
		if($size>0)
			$res_performance=mysqli_query($connection,"SELECT * FROM Performance WHERE contestId=".$contest_id." LIMIT ".$id.",".$size);
		else
			$res_performance=mysqli_query($connection,"SELECT * FROM Performance WHERE contestId=".$contest_id." AND performanceId=".$id);
		if(mysqli_num_rows($res_performance)==0)
			exit(json_encode(array("NULL" => $arr_data)));

		//подготовка списка возрастных категорий
		if(isset($data['performance_age_category']))
			{
			$arr_age=array();
			$qry="SELECT * FROM AgeCategory WHERE contestId=".$contest_id." ORDER BY ageCategoryId";
			$res=mysqli_query($connection,$qry);
			$step=floor(360/mysqli_num_rows($res));
			$i=0;
			while($arr=mysqli_fetch_assoc($res))
				{
				$arr_age[$arr['ageCategoryId']]=array();
				$arr_age[$arr['ageCategoryId']]['title']=$arr['ageCategoryTitle'];
				$arr_age[$arr['ageCategoryId']]['color']=($i*$step).",100,".(50+30*($i%2));
				$i++;
				}
			}

		//подготовка списка номинаций
		if(isset($arr_data['performance_nomination']))
			{
			$arr_nomination=array();
			$qry="SELECT * FROM Nomination WHERE contestId=".$contest_id;
			$res=mysqli_query($connection,$qry);
			$step=floor(360/mysqli_num_rows($res));
			$i=0;
			while($arr=mysqli_fetch_assoc($res))
				{
				$arr_nomination[$arr['nominationId']]=array();
				$arr_nomination[$arr['nominationId']]['title']=$arr['nominationTitle'];
				$arr_nomination[$arr['nominationId']]['color']=($i*$step).",100,".(50+30*($i%2));
				$i++;
				}
			}

		//подготовка списка суммарных оценок
		if(isset($arr_data['performance_rating_sum']))
			{
			$arr_rating=array();
			$qry="SELECT performanceId, SUM(rating) as sum_r FROM Rating GROUP BY performanceId";
			$res=mysqli_query($connection,$qry);
			while($arr=mysqli_fetch_assoc($res))
				$arr_rating[$arr['performanceId']]=$arr['sum_r'];
			}

		while($arr_performance=mysqli_fetch_assoc($res_performance))
			{
			$arr_data=$data;
			if(isset($arr_data['performance_title']))
				{
				$arr_data['performance_title']=$arr_performance['performanceTitle'];
				}
			if(isset($arr_data['performance_age_category']))
				{
				if(!isset($arr_age[$arr_performance['ageCategoryId']]))
						$arr_age[$arr_performance['ageCategoryId']]=array(
							'title' => '--нет названия--',
							'color' => '60,100,70',
							);
				$arr_data['performance_age_category']=array(
					'age_category_id' => $arr_performance['ageCategoryId'],
					'age_category_title' => $arr_age[$arr_performance['ageCategoryId']]['title'],
					'age_category_color' => $arr_age[$arr_performance['ageCategoryId']]['color'],
					);
				}
			if(isset($arr_data['performance_contest_title']))
				{
				$arr_data['performance_contest_title']=$arr_contest['contestTitle'];//-------------------- убрать в contest
				}
			if(isset($arr_data['performance_turn_id']))
				{
				$arr_data['performance_turn_id']=$arr_performance['turnId'];
				}
			if(isset($arr_data['performance_turn']))
				{
				$arr_data['performance_turn']=$performance_count;//-------------------- убрать в contest
				}
			if(isset($arr_data['performance_nomination']))
				{
				if(!isset($arr_nomination[$arr_performance['nominationId']]))
						$arr_nomination[$arr_performance['nominationId']]=array(
							'title' => '--нет названия--',
							'color' => '60,100,70',
							);
				$arr_data['performance_nomination']=array(
					'nomination_id' => $arr_performance['nominationId'],
					'nomination_title' => $arr_nomination[$arr_performance['nominationId']]['title'],
					'nomination_color' => $arr_nomination[$arr_performance['nominationId']]['color'],
					);
				}
			if(isset($arr_data['performance_rating_sum']))
				{
				if(!isset($arr_rating[$arr_performance['performanceId']]))
						$arr_rating[$arr_performance['performanceId']]=0;
				$arr_data['performance_rating_sum']=$arr_rating[$arr_performance['performanceId']];
				}
			if(isset($arr_data['performance_prize']))
				{//узнать способ расчета
				}
			if(isset($arr_data['performance_prize_manual']))
				{//новое поле в таблице
				}
			if(isset($arr_data['performance_director']))
				{//подг.массив
				}
			if(isset($arr_data['performance_team_title']))
				{//подг. массив
				}
			$arr_result[$arr_performance['performanceId']]=$arr_data;
			}
		}

	if(isset($_JSON['get_data']['contest_id']))
		{//запрошена информация по соревнованиям
		$arr_data=$data;
		if(isset($arr_data['contest_title']))
			{
			$arr_data['contest_title']=$arr_contest['contestTitle'];
			}
		if(isset($arr_data['prize_option']))
			{
			$arr_data['prize_option']=array();
			$qry="SELECT * FROM Prize WHERE contestId=".$contest_id;
			$res=mysqli_query($connection,$qry);
			while($arr=mysqli_fetch_assoc($res))
				$arr_data['prize_option'][$arr['prizeId']]=$arr['prizeTitle'];
			}
		$arr_result[$contest_id]=$arr_data;
		}

	echo json_encode($arr_result, JSON_UNESCAPED_UNICODE);
	}

if(isset($_GET['debug']))
	{
	echo "OK";
	}
?>