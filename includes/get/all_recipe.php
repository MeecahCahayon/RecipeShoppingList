<?php
	
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES
	$usrname = $_SESSION["user"];
	$opt = $_GET["opt"];

	if ($opt === "all10") {
		
		// QUERY USING PREPARED STATEMENT
		$stmt = $con->prepare("SELECT `RecipeName` FROM `recipe` WHERE BINARY `Username` = ? LIMIT 10");
		$stmt->bindParam(1, $usrname);
	} else {

		// QUERY USING PREPARED STATEMENT
		$stmt = $con->prepare("SELECT `RecipeName` FROM `recipe` WHERE BINARY `Username` = ?");
		$stmt->bindParam(1, $usrname);
	}
	
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