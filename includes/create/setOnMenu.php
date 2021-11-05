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
	$recipeName = $_POST["recipeName"];

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("UPDATE `recipe` SET `OnMenu` = '1' WHERE BINARY `Username` = ? AND `RecipeName` = ?");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $recipeName);

	if (!($stmt->execute())) 
		die("Error in Database Query."); 
?>