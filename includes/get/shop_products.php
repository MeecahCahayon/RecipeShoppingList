<?php
	
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("SELECT `ShopID`, `ShopName` FROM `shop`");

	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$shop = array();
		$count = 0;

		// RETRIEVE DATA (QUERY RESULT)
		while ($result = $stmt->fetch()) {
			
			$shop[$count] = [

				"shopid" => $result['ShopID'],
				"shopname" => $result['ShopName']
			];

			$count++;
		}

		$response = array();
		$rescount = 0;

		foreach ($shop as $value) {
			
			// QUERY USING PREPARED STATEMENT
			$stmt = $con->prepare("SELECT `ShopIngrID`,`ShopIngrName` FROM `shopingr` WHERE `ShopID` = ?");
			$stmt->bindParam(1, $value['shopid']);

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

					"shopid" => $value['shopid'],
					"shopname" => $value['shopname'],
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