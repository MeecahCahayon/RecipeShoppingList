<?php
	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	//CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	//GET VARIABLES USING POST METHOD
	$usrname = $_POST["usrnameField"];
	$usrpass = $_POST["passField"];

	// QUERY USING PREPARED STATEMENT - INSERT NEW USER
	$stmt = $con->prepare("INSERT INTO `users` (`Username`, `MasterPass`) VALUES (?, ?)");
	$stmt->bindParam(1, $usrname);
	$stmt->bindParam(2, $usrpass);

	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute())
		echo "pass";
	else
		die("There's an error in the database query");

?>