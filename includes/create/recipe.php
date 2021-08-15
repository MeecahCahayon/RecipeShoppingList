<?php
	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	//CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	//GET VARIABLES USING POST AND SESSION METHOD
	$recipeName = $_POST["recipeNameField"];
	$recipeLink = $_POST["recipeLinkField"];
	$usrname = $_SESSION["user"];

	// QUERY USING PREPARED STATEMENT - INSERT NEW USER
	$stmt = $con->prepare("INSERT INTO `recipes` (`RecipeName`, `Link`, `Username`) VALUES (?, ?, ?);");
	$stmt->bindParam(1, $recipeName);
	$stmt->bindParam(2, $recipeLink);
	$stmt->bindParam(3, $usrname);

	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute())
		echo "pass";
	else
		die("There's an error in the database query");

?>