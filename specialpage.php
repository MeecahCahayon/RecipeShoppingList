<?php
	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");
?>

<?php
	session_start();

	if (!(isset($_SESSION["logged_in"]))) 
	{
		header("location: index.php");
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
		<link rel="stylesheet" type="text/css" href="scss/specialstyle.css">

		<script type="text/javascript" src="js/mainscript.js"></script>
		<!-- <script type="text/javascript" src="js/processlogin.js"></script> -->
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

				<!-- MAIN MENU BUTTON -->
				<section class="innerGrids" id="mainMenuBtnGrid">
					<div id="mainMenuBtnCont">
						<p id="listpage"  onclick="gotopage('listpage')"> List </p>
						<p id="specialpage" onclick="gotopage('specialpage')" class="activepage"> Special </p>
						<p id="recipepage" onclick="gotopage('recipepage')"> Recipes </p>
						<p id="shoppage" onclick="gotopage('shoppage')"> Shops </p>
						<p onclick="checklogout()"> Logout </p>
					</div>
				</section>
			</section>

			<!-- MAIN -->
			<section class="outerGrids" id="mainGrid">

				<!-- LOOKOUT SPECIAL -->
				<section class="innerGrids" id="lookoutspcGrid">
					<div id="lookoutspcContent">
						Look out Special
					</div>
				</section>

				<!-- SHOP SPECIAL -->
				<section class="innerGrids" id="shopspcGrid">
					<div id="shopspcContent">
						Shop List
					</div>
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