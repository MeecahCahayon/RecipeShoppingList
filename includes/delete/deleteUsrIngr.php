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
	$ingrName = $_POST["ingrName"];

	// QUERY USING PREPARED STATEMENT - GET ALL RECIPE THAT HAS THE USERINGR
	$stmt = $con->prepare("SELECT * FROM `recipehasingr` WHERE BINARY `Username` = ? AND `UserIngrName`= ?");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $ingrName);

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

		// QUERY USING PREPARED STATEMENT - GET ALL CORR INGR OF THAT USERINGR
		$stmt = $con->prepare("SELECT * FROM `corringr` WHERE BINARY `Username` = ? AND `UserIngrName`= ?");
		$stmt->bindParam(1, $usrname);
		$stmt->bindParam(2, $ingrName);

		// CHECKS IF THERE'S AN ERROR IN THE QUERY
		if ($stmt->execute()) {
			
			$corringr = array();
			$count = 0;

			// RETRIEVE DATA (QUERY RESULT) - SAVE INTO AN ARRAY
			while ($result = $stmt->fetch()) {

				$corringr[$count] = [

					"username" => $result['Username'],
					"useringrName" => $result['UserIngrName'],
					"shopid" => $result['ShopID'],
					"ShopIngrID" => $result['ShopIngrID'],
				];

				$count++;
			}

			// DELETE EVERYTHING IN THAT ARRAY
			foreach ($corringr as $value) {
				
				$stmt = $con->prepare("DELETE FROM `corringr` WHERE BINARY `Username` = ? AND `UserIngrName` = ? AND `ShopID` = ? AND `ShopIngrID` = ?");
				$stmt->bindParam(1, $value['username']);
				$stmt->bindParam(2, $value['useringrName']);
				$stmt->bindParam(3, $value['shopid']);
				$stmt->bindParam(4, $value['ShopIngrID']);

				// CHECKS IF THERE'S AN ERROR IN THE QUERY
				if (!($stmt->execute()))
					die("Error in Database Query."); 
			}

			// DELETE THE INGREDIENT
			$stmt = $con->prepare("DELETE FROM `useringr` WHERE BINARY `Username` = ? AND `UserIngrName` = ?");
			$stmt->bindParam(1, $usrname);
			$stmt->bindParam(2, $ingrName);

			// CHECKS IF THERE'S AN ERROR IN THE QUERY
			if (!($stmt->execute()))
				die("Error in Database Query."); 

			$response = array();
			$response[0] = $ingrName;

			// RETURN JSON OBJECT
			echo json_encode($response);
		} 
		else
			die("Error in Database Query."); 
	}
	else 
		die("Error in Database Query."); 
?>