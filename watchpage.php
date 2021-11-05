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

		<link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Bungee+Outline&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

		<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet"/>
		<link rel="stylesheet" type="text/css" href="scss/pagelayout.css">
		<link rel="stylesheet" type="text/css" href="scss/select-two.css">
		<link rel="stylesheet" type="text/css" href="scss/watchstyle.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
		<script src="https://kit.fontawesome.com/61bf2e2ad1.js" crossorigin="anonymous"></script>
		<script type="text/javascript" src="js/mainscript.js"></script>
		<script type="text/javascript" src="js/watchscript.js"></script>
	</head>

	<body onload="prep_watch_page()">
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
						<section class="dropdownContainer">
							<p class="inlinemenu activepage"> Listing </p>

							<div class="dropdown-content">
								<p onclick="gotopage('watchpage')"> On Watch List </p>
								<p onclick="gotopage('dishpage')"> On Menu List </p>
								<p onclick="gotopage('grocerypage')"> Grocery List </p>
							</div>
						</section>
						
						<p class="inlinemenu" onclick="gotopage('ingrpage')"> Ingrs </p>
						<p class="inlinemenu" onclick="gotopage('recipepage')"> Recipes </p>
						<!-- <p id="shoppage" class="inlinemenu" onclick="gotopage('shoppage')"> Shops </p> -->
						<p class="inlinemenu" onclick="checklogout()"> Logout </p>
					</div>
				</section>
			</section>

			<!-- MAIN -->
			<section class="outerGrids" id="mainGrid">

				<!-- ON WATCH HEADING -->
				<section class="innerGrids" id="watchHeadingGrid">
					<div id="watchHeadingContent">
						<div class="secondHeading">
							<p> On-Watch Products </p>
						</div>
						<div class="subtitle">
							<p> Select what products or ingredients you want to watch </p>
						</div>
					</div>
				</section>

				<!-- ON WATCH SELECT -->
				<section class="innerGrids" id="watchSearchGrid">
					<div id="onwatchselect">
						<select class="userinputs" id="watchSearchField">
							<option></option>
						</select>
					</div>
				</section>

				<!-- ON WATCH INGR/PRODUCT LIST -->
				<section class="innerGrids" id="watchListGrid">
					<div id="onwatchlist">
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

