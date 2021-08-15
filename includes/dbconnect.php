<?php

	try{

		$db_username = "root";
		$db_password = "";
		$con = new PDO('mysql:host=localhost;dbname=foodpricespy',$db_username,$db_password);
		$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	} catch (PDOException $e){ echo "Database connection error ".$e->getMessage(); }
?>