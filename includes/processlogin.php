<?php 

	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aaa_php_error.txt");

	//START SESSION AND CONNECT TO DB
	session_start();
	require_once('dbconnect.php');

	// QUERY USING PREPARED STATEMENT
	$stmt = $con->prepare("SELECT * FROM `users` WHERE BINARY `Username` = ?");
	$stmt->bindParam(1, $usrname);

	//GET VARIABLES USING POST METHOD
	$usrname = $_POST["usrnameField"];
	$usrpass = $_POST["passField"];

	// CHECK IF THERES AN ERROR IN THE QUERY
	if ($stmt->execute()) {
		
		// CHECK IF THERE'S DATA
		if (!empty($_POST)) {

			// RETRIEVE DATA (QUERY RESULT)
			$result = $stmt->fetch();

			// IF THERES DATA RETRIEVED
			if ($result !== FALSE) {

				$datapass = $result["MasterPass"];

				// CHECK IF ITS THE CORRECT PASS
				if (password_verify($usrpass, $datapass) == 1) {
					
					// IF HASH FUNCT UPDATES
					if (password_needs_rehash($datapass, PASSWORD_DEFAULT)) {
						
						// REHASH AND UPDATE THE DATABASE
						$newdatapass = password_hash($usrpass, PASSWORD_DEFAULT);

						// QUERY USING PREPARED STATEMENT
						$stmt = $con->prepare("UPDATE `users` SET `MasterPass` = ? WHERE `users`.`Username` = ?");
						$stmt->bindParam(1, $newdatapass);
						$stmt->bindParam(2, $usrname);
					}

					//SETTING SESSION ALIVE
					$_SESSION["logged_in"] = false;
					$_SESSION["user"] = $usrname;

					return;

				} else
					echo "-888";
			} else
				echo "-888";
		} else 
			echo "-888";
	} else
		die("There's an error in the database query");
?>