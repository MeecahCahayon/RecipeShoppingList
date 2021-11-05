<?php

	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aaa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES
	$usrname = $_SESSION["user"];
	$recipename = $_POST["recipename"];

	// QUERY USING PREPARED STATEMENT - GET ALL RECIPE THAT HAS THE USERINGR
	$stmt = $con->prepare("SELECT * FROM `recipehasingr` WHERE BINARY `Username` = ? AND `RecipeName`= ?");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $recipename);

	// CHECKS IF THERE'S AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$recipeingr = array();
		$count = 0;

		// RETRIEVE DATA (QUERY RESULT) - SAVE INTO AN ARRAY
		while ($result = $stmt->fetch()) {

			$recipeingr[$count] = [

				"username" => $result['Username'],
				"recipename" => $result['RecipeName'],
				"useringrName" => $result['UserIngrName'],
			];

			$count++;
		}

		// DELETE EVERYTHING IN THAT ARRAY
		foreach ($recipeingr as $value) {
			
			$stmt = $con->prepare("DELETE FROM `recipehasingr` WHERE BINARY `Username` = ? AND `RecipeName` = ? AND `UserIngrName` = ?");
			$stmt->bindParam(1, $value['username']);
			$stmt->bindParam(2, $value['recipename']);
			$stmt->bindParam(3, $value['useringrName']);

			// CHECKS IF THERE'S AN ERROR IN THE QUERY
			if (!($stmt->execute()))
				die("Error in Database Query."); 
		}

		// QUERY USING PREPARED STATEMENT - GET ALL RECIPE THAT HAS THE USERINGR
		$stmt = $con->prepare("SELECT * FROM `step` WHERE BINARY `Username` = ? AND `RecipeName`= ?");
		$stmt->bindParam(1, $usrname);
		$stmt->bindParam(2, $recipename);

		// CHECKS IF THERE'S AN ERROR IN THE QUERY
		if ($stmt->execute()) {
			
			$recipestep = array();
			$count = 0;

			// RETRIEVE DATA (QUERY RESULT) - SAVE INTO AN ARRAY
			while ($result = $stmt->fetch()) {

				$recipestep[$count] = [

					"username" => $result['Username'],
					"recipename" => $result['RecipeName'],
					"stepnum" => $result['StepNum']
				];

				$count++;
			}

			// DELETE EVERYTHING IN THAT ARRAY
			foreach ($recipestep as $value) {
				
				$stmt = $con->prepare("DELETE FROM `step` WHERE BINARY `Username` = ? AND `RecipeName` = ? AND `StepNum` = ?");
				$stmt->bindParam(1, $value['username']);
				$stmt->bindParam(2, $value['recipename']);
				$stmt->bindParam(3, $value['stepnum']);

				// CHECKS IF THERE'S AN ERROR IN THE QUERY
				if (!($stmt->execute()))
					die("Error in Database Query."); 
			}

			// DELETE THE RECIPE
			$stmt = $con->prepare("DELETE FROM `recipe` WHERE BINARY `Username` = ? AND `RecipeName` = ?");
			$stmt->bindParam(1, $usrname);
			$stmt->bindParam(2, $recipename);

			// CHECKS IF THERE'S AN ERROR IN THE QUERY
			if (!($stmt->execute()))
				die("Error in Database Query."); 
		} 
		else
			die("Error in Database Query.");
	}
	else 
		die("Error in Database Query."); 
?>