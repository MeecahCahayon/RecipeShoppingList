<?php

	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aaa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES
	$input = urldecode($_GET["userInput"]);
	$usrname = $_SESSION["user"];

	//CHECK IF INPUT IS EMPTY - SHOULD NOT BE
	if(!empty($input)) {

		// QUERY USING PREPARED STATEMENT
		$stmt = $con->prepare("SELECT `RecipeName` FROM `recipe` WHERE `RecipeName` LIKE :input AND BINARY `Username` = :usrname");
		$stmt->bindValue(":input", "%$input%");
		$stmt->bindValue(":usrname", $usrname);

		// CHECKS IF THERE'S AN ERROR IN THE QUERY
		if ($stmt->execute()) {

			$recipes = array();
			$count = 0;

			// WHILE THERES DATA - RETRIEVE DATA (QUERY RESULT)
			while ($result = $stmt->fetch()) {
				
				$recipes[$count] = $result;
				$count++;
			}

			// RETURN JSON OBJECT
			echo json_encode($recipes);
		}
		else 
			die("Error in Database Query."); 
	}
	
?>