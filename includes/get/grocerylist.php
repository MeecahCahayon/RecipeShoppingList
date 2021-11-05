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

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("SELECT `UserIngrName` FROM `useringr`WHERE BINARY `Username` = ? AND `UserIngrName` IN (SELECT `UserIngrName` FROM `recipehasingr` WHERE BINARY `Username` = ? AND `RecipeName` IN (SELECT `RecipeName` FROM `recipe` WHERE BINARY `Username` = ? AND `OnMenu` = 1))");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $usrname);
	$stmt->bindParam(3, $usrname);
	
	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$response = array();
		$count = 0;

		// RETRIEVE DATA (QUERY RESULT)
		while ($result = $stmt->fetch()) {
			
			$response[$count] = $result;
			$count++;
		}

		// RETURN JSON OBJECT
		echo json_encode($response);

	} else 
		die("There's an error in the database query");
?>