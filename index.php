<?php
	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");
?>

<?php
	session_start();

	if (isset($_SESSION["logged_in"])) 
	{
		header("location: dashboardpage.php");
	}
?>

<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title> Shopping List </title>

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

		<link href="https://fonts.googleapis.com/css2?family=Bungee+Outline&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

		<link rel="stylesheet" type="text/css" href="scss/pagelayout.css">
		<link rel="stylesheet" type="text/css" href="scss/popupform.css">
		<link rel="stylesheet" type="text/css" href="scss/indexstyle.css">

		<script type="text/javascript" src="js/mainscript.js"></script>
		<script type="text/javascript" src="js/indexscript.js"></script>
	</head>

	<body>
		<div class="outerDiv" id="pageOuterDiv">
			<!-- HEADER -->
			<section class="outerGrids" id="headerGrid">

				<!-- HEADING -->
				<section class="innerGrids" id="headingGrid">
					<div id="headingCont">
						<p> Shopping List </p>
					</div>
				</section>
			</section>

			<!-- MAIN -->
			<section class="outerGrids" id="mainGrid">

				<!-- LOGIN -->
				<section class="innerGrids" id="loginGrid">
					<div id="loginContent">
						<!-- WARNING SECTION -->
						<section class="warningSec" id="logWarn"></section>

						<!-- LOGIN FORM -->
						<form method="POST" id="formSection" onsubmit="return false">
							<label for="usrnameField" class="formLbl"> Username </label>
							<input type="text" name="usrValue" class="loginInput" id="usrnameField" required>
							<br>

							<label for="passField" class="formLbl"> Password </label>
							<input type="password" name="newPassValue" class="loginInput" id="passField" required>
							<br>

							<div id="formButton">
								<button onclick="checklogin()" type="submit"> Log In </button>
								<!-- type="button" IGNORES THE REQUIRED FIELD - AND REMOVES PREMATURE VALIDATION -->
								<button onclick="showPopupForm('addAccountPopup')" type="button"> Create Account </button>
							</div>
						</form>
					</div>
				</section>

				<section class="modal", id="addAccountPopup">
					<!-- POPUP FORM FOR ADDING RECIPE -->
					<form method="POST" class="modal-content animate" onsubmit="return false">
						<div class="popupform">
							<!-- HEADING SECTION -->
							<section class="secondHeadingForm">
								<p> Create a new Account </p>
							</section>

							<!-- WARNING SECTION -->
							<section class="warningSec" id="formAcntWarn"></section>

							<!-- THE FORM -->
							<section class="popupContent">
								<label for="newUNField" class="formLbl"> Username </label>
								<input type="text" name="newUNValue" class="formInput" id="newUNField" placeholder="Enter a username" required>
								<br>

								<label for="newPassField" class="formLbl"> Password </label>
								<input type="password" name="newPassValue" class="formInput" id="newPassField" placeholder="Enter a password" required>
								<br>
							</section>

							<!-- BUTTONS -->
							<section class="popupContent" id="formButton">
								<button onclick="checkActInfo()" type="submit"> Create Account </button>
								<button onclick="hidePopupForm('addAccountPopup')" type="button" class="cancelBtn"> Cancel </button>
							</section>
						</div>
					</form>
				</section>
			</section>

			<!-- FOOTER -->
			<section class="outerGrids" id="footerGrid">
				
				<!-- FOOTER -->
				<footer class="innerGrids" id="footGrid">
					<div id="footerCont">
						<p> Meecah Cahayon - 1259825</p>
					</div>
				</footer>
			</section>
		</div>
	</body>
</html>

