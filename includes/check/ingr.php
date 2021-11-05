<?php
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES USING POST METHOD
	$ingrName = $_POST["ingrName"];
	$usrname = $_SESSION["user"];
	
	// QUERY USING PREPARED STATEMENT - CHECK IF RECIPE ALREADY EXIST
	$stmt = $con->prepare("SELECT * FROM `useringr` WHERE `UserIngrName`= ? AND BINARY `Username` = ?");
	$stmt->bindParam(1, $ingrName);
	$stmt->bindParam(2, $usrname);

	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {
		
		// RETRIEVE DATA (QUERY RESULT)
		$result = $stmt->fetch();

		// IF THERES NO DATA RETRIEVED
		if ($result == FALSE) {

			$response[0] = "pass";
			$response[1] = $ingrName;
			echo json_encode($response);
		}
		else {

			$response[0] = "ingrTaken";
			echo json_encode($response);
		}
	} else
		die("There's an error in the database query");

?>