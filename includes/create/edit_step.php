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
	$instruction = $_POST["instruction"];

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("UPDATE `step` SET `Instruction` = ? WHERE BINARY `Username` = ? AND `RecipeName` = ? AND `StepNum` = ?");
	$stmt->bindParam(1, $instruction);
	$stmt->bindParam(2, $usrname);
	$stmt->bindParam(3, $recipeName);
	$stmt->bindParam(4, $stepnumber);

	if (!($stmt->execute()))
		die("Error in Database Query."); 
?>