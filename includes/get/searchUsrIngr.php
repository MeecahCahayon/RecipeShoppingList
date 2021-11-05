<?php

	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aaa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES
	$input = $_GET["userInput"];
	$usrname = $_SESSION["user"];

	//CHECK IF INPUT IS EMPTY - SHOULD NOT BE
	if(!empty($input)) {

		// QUERY USING PREPARED STATEMENT
		$stmt = $con->prepare("SELECT `UserIngrName` FROM `useringr` WHERE `UserIngrName` LIKE :input AND BINARY `Username` = :usrname");
		$stmt->bindValue(":input", "%$input%");
		$stmt->bindValue(":usrname", $usrname);

		// CHECKS IF THERE'S AN ERROR IN THE QUERY
		if ($stmt->execute()) {

			$usringr = array();
			$count = 0;

			// WHILE THERES DATA - RETRIEVE DATA (QUERY RESULT)
			while ($result = $stmt->fetch()) {
				
				$usringr[$count] = $result;
				$count++;
			}

			// RETURN JSON OBJECT
			echo json_encode($usringr);
		}
		else 
			die("Error in Database Query."); 
	}
	
?>