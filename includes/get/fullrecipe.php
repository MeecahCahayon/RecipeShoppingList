<?php
	
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES
	$opt = $_GET["opt"];
	$recipename = $_GET["recipename"];
	$usrname = $_SESSION["user"];

	if ($opt === "ingrs") {
		
		// QUERY USING PREPARED STATEMENT
		$stmt = $con->prepare("SELECT * FROM `useringr` WHERE `UserIngrName` IN (SELECT `UserIngrName` FROM `recipehasingr` WHERE `RecipeName` = ? AND BINARY `Username` = ?) AND BINARY `Username` = ?");
		$stmt->bindParam(1, $recipename);
		$stmt->bindParam(2, $usrname);
		$stmt->bindParam(3, $usrname);
	} else {

		// QUERY USING PREPARED STATEMENT
		$stmt = $con->prepare("SELECT * FROM `step` WHERE `RecipeName` = ? AND BINARY `Username` = ?");
		$stmt->bindParam(1, $recipename);
		$stmt->bindParam(2, $usrname);
	}
	
	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$ingridients = array();

		// ADD THE RECIPE NAME TO THE JSON RESPONSE
		$ingridients[0] = $recipename;
		$count = 1;

		// RETRIEVE DATA (QUERY RESULT)
		while ($result = $stmt->fetch()) {
			
			$ingridients[$count] = $result;
			$count++;
		}

		// RETURN JSON OBJECT
		echo json_encode($ingridients);

	} else 
		die("There's an error in the database query");
?>