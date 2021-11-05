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
		<link rel="stylesheet" type="text/css" href="lib/cute-alert-master/style.css">
		<link rel="stylesheet" type="text/css" href="scss/pagelayout.css">
		<link rel="stylesheet" type="text/css" href="scss/select-two.css">
		<link rel="stylesheet" type="text/css" href="scss/popupform.css">
		<link rel="stylesheet" type="text/css" href="scss/ingrstyle.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
		<script src="https://kit.fontawesome.com/61bf2e2ad1.js" crossorigin="anonymous"></script>
		<script type="text/javascript" src="lib/cute-alert-master/cute-alert.js"></script>
		<script type="text/javascript" src="js/mainscript.js"></script>
		<script type="text/javascript" src="js/ingrscript.js"></script>
	</head>

	<body onload="prep_ingr_page()">
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
							<p class="inlinemenu"> Listing </p>

							<div class="dropdown-content">
								<p onclick="gotopage('watchpage')"> On Watch List </p>
								<p onclick="gotopage('dishpage')"> On Menu List </p>
								<p onclick="gotopage('grocerypage')"> Grocery List </p>
							</div>
						</section>

						<p class="inlinemenu" onclick="gotopage('ingrpage')" class="activepage"> Ingrs </p>
						<p class="inlinemenu" onclick="gotopage('recipepage')"> Recipes </p>
						<!-- <p id="shoppage" class="inlinemenu" onclick="gotopage('shoppage')"> Shops </p> -->
						<p class="inlinemenu" onclick="checklogout()"> Logout </p>
					</div>
				</section>
			</section>

			<!-- MAIN -->
			<section class="outerGrids" id="mainGrid">

				<!-- RECIPE HEADING -->
				<section class="innerGrids" id="ingrHeadingGrid">
					<div id="ingrHeadingContent">
						<div class="secondHeading">
							<p> My Ingredients </p>
						</div>
						<div class="subtitle">
							<p> Set up your prefered ingredients </p>
						</div>
					</div>
				</section>

				<!-- SEARCH BAR -->
				<section class="innerGrids" id="ingrSearchGrid">
					<div id="searchIngrCont">
						<input class="userinputs searchinput" id="ingrSearchField" type="text" name="ingrSearchValue">
						<button id="searchIngrBtn"> Search </button>
					</div>
				</section>

				<!-- INGR LIST -->
				<section class="innerGrids" id="ingrListGrid">
					<div id="ingrListCont">
					</div>
				</section>

				<!-- BUTTON SECTION -->
				<section class="innerGrids" id="ingrBtnGrid">
					<div id="ingrBtnGrid">
						<button onclick="showPopupForm('#addUsrIngrPopup')" id="addrecipebtn"> Add Ingredient </button>
					</div>
				</section>

				<!-- POP UP FORM  -->
				<section class="modal", id="addUsrIngrPopup">
					<!-- POPUP FORM FOR ADDING RECIPE -->
					<form method="POST" class="modal-content animate" onsubmit="return false">
						<div class="popupform">

							<!-- HEADING SECTION -->
							<section class="secondHeading form2ndHeading">
								<p> Add a new Ingridient </p>
							</section>

							<!-- WARNING SECTION -->
							<section class="warningSec" id="formIngrWarn"></section>

							<section class="popupContent">
								<label for="ingrNameField" class="formLbl"> Ingredient Name </label>
								<input type="text" name="recipeNameValue" class="userinputs" id="ingrNameField" placeholder="Enter name of the Recipe" required>
								<br>
							</section>

							<section class="popupContent" class="formButtonCont">
								<button onclick="check_ingr_info()" type="submit"> Create Ingredient </button>
								<button onclick="hidePopupForm('#addUsrIngrPopup')" type="button" class="cancelBtn"> Cancel </button>
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

