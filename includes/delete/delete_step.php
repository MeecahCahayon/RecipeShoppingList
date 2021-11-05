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
	$stepnumber = $_POST["stepnumber"];

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("DELETE FROM `step` WHERE `Username` = ? AND `RecipeName` = ? AND `StepNum` = ?");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $recipeName);
	$stmt->bindParam(3, $stepnumber);

	// CHECKS IF THERE'S AN ERROR IN THE QUERY
	if (!($stmt->execute()))
		die("Error in Database Query."); 
?>