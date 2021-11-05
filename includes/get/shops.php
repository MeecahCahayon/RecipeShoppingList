<?php
	
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("SELECT `ShopID`, `ShopName`, `ShopColor`, `ShopLogo` FROM `shop`");

	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$response = array();
		$count = 0;

		// RETRIEVE DATA (QUERY RESULT)
		while ($result = $stmt->fetch()) {
			
			$response[$count] = [

				"shopid" => $result['ShopID'],
				"shopname" => $result['ShopName'],
				"shopcolor" => $result['ShopColor'],
				"shoplogo" => $result['ShopLogo']
			];

			$count++;
		}

		// RETURN JSON OBJECT
		echo json_encode($response);

	} else 
		die("There's an error in the database query");
?>