<?php
	// CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");

	// CONNECT TO DB
	session_start();
	require_once('../dbconnect.php');

	// GET VARIABLES USING POST AND SESSION METHOD
	$usrname = $_SESSION["user"];
	$usrIngrname = $_POST["usrIngrname"];
	$shopIngrID = $_POST["shopIngrID"];

	// QUERY USING PREPARED STATEMENT - INSERT NEW CORR-INGR
	$stmt = $con->prepare("SELECT `ShopID` FROM `shopingr` WHERE `ShopIngrID` = ?");
	$stmt->bindParam(1, $shopIngrID);

	if ($stmt->execute()) {

		// RETRIEVE DATA (QUERY RESULT)
		$result = $stmt->fetch();

		// IF THERES NO DATA RETRIEVED
		if ($result != FALSE) {

			$shopid = $result['ShopID'];

			// QUERY USING PREPARED STATEMENT - INSERT NEW CORR-INGR
			$stmt = $con->prepare("INSERT INTO `corringr`(`Username`, `UserIngrName`, `ShopID`, `ShopIngrID`) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `ShopIngrID`= ?;");
			$stmt->bindParam(1, $usrname);
			$stmt->bindParam(2, $usrIngrname);
			$stmt->bindParam(3, $shopid);
			$stmt->bindParam(4, $shopIngrID);
			$stmt->bindParam(5, $shopIngrID);

			// CHECK IF THERES AN ERROR IN THE QUERY
			if ($stmt->execute())
				echo "pass";
			else
				die("There's an error in the database query");
		}
		else 
			die("There's an error in the database query");
	} else
		die("There's an error in the database query");

?>