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
	$ingrname = $_POST["ingrname"];

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("UPDATE `useringr` SET `OnWatch` = '1' WHERE BINARY `Username` = ? AND `UserIngrName` = ?");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $ingrname);

	if (!($stmt->execute())) 
		die("Error in Database Query."); 
?>