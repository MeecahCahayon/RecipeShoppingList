<?php
	
	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	//CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("SELECT `RecipeName` FROM `recipes` WHERE BINARY `Username` = ? ");
	$stmt->bindParam(1, $usrname);

	//GET VARIABLES USING POST METHOD
	$usrname = $_SESSION["user"];
	
	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$recipes = array();
		$count = 0;

		// RETRIEVE DATA (QUERY RESULT)
		while ($result = $stmt->fetch()) {
			
			$recipes[$count] = $result;
			$count++;
		}

		// RETURN JSON OBJECT
		echo json_encode($recipes);

	} else 
		die("There's an error in the database query");
?>