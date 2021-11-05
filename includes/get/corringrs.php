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
	$stmt = $con->prepare("SELECT `UserIngrName` FROM `corringr` WHERE BINARY `Username` = ? GROUP BY `UserIngrName`");
	$stmt->bindParam(1, $usrname);
	
	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$response = array();
		$rescount = 0;

		$corringrs = array();
		$count = 0;

		// RETRIEVE DATA (QUERY RESULT)
		while ($result = $stmt->fetch()) {
			
			$corringrs[$count] = $result;
			$count++;
		}

		foreach ($corringrs as $value) {
			
			$corringr = $value['UserIngrName'];

			// QUERY USING PREPARED STATEMENT
			$stmt = $con->prepare("SELECT `ShopID`, `ShopIngrID` FROM `corringr` WHERE BINARY `Username` = ? AND `UserIngrName` = ?");
			$stmt->bindParam(1, $usrname);
			$stmt->bindParam(2, $corringr);
			
			// CHECK IF THERES AN ERROR IN THE QUERY
			if ($stmt->execute()) {

				$products = array();
				$count = 0;

				// RETRIEVE DATA (QUERY RESULT)
				while ($result = $stmt->fetch()) {
					
					$products[$count] = $result;
					$count++;
				}

				$response[$rescount] = [

					"corringr" => $corringr,
					"products" => $products
				];

				$rescount++;

			} else 
				die("There's an error in the database query");

		}

		// RETURN JSON OBJECT
		echo json_encode($response);

	} else 
		die("There's an error in the database query");
?>