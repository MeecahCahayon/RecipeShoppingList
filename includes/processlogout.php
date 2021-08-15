<?php

	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aaa_php_error.txt");

	//START SESSION
	session_start();

	//UNSET ALL SESSION VARIABLES
	$_SESSION = array();

	//DESTROY THE SESSION
	session_destroy();
?>