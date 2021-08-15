<?php

	//checking errors
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aaa_php_error.txt");

	//CONNECT TO DB
	require_once('../db.php');

	//GET VARIABLES USING GET METHOD
	$input = urldecode($_GET["input"]);

	//CHECK IF INPUT IS EMPTY
	if(!empty($input)) {

		$stmt = $con->prepare("SELECT * FROM `company` WHERE companyName LIKE :input OR code LIKE :input");
		$stmt->bindValue(":input", "%$input%");
	}
	
	//CHECKS IF THERE'S AN ERROR IN THE QUERY
	if ($stmt->execute()) {
		//CHECK IF THERE'S DATA
		$companies = array();
		$count = 0;

		//RETRIEVE DATA
		while ($row = $stmt->fetch()) {
			
			$companies[$count] = $row;
			//echo $row;
			$count++;
		}
		//RETURN JSON OBJECT
		echo json_encode($companies);
	}
	else 
		die("Error in Database Query."); 

?>