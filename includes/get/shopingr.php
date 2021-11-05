<?php
	
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES
	$shopingrid = $_GET["shopingrid"];

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("SELECT * FROM `shopingr` WHERE `ShopIngrID` = ?");
	$stmt->bindParam(1, $shopingrid);
	
	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {

		$response = $stmt->fetch();

		// RETURN JSON OBJECT
		echo json_encode($response);

	} else 
		die("There's an error in the database query");
?>