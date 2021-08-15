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
		<link rel="stylesheet" type="text/css" href="scss/popupform.css">
		<link rel="stylesheet" type="text/css" href="scss/recipestyle.css">

		<script type="text/javascript" src="js/mainscript.js"></script>
		<script type="text/javascript" src="js/recipescript.js"></script>
		<script type="text/javascript" src="js/recipewidget.js"></script>
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
						<p id="specialpage" onclick="gotopage('specialpage')"> Special </p>
						<p id="recipepage" onclick="gotopage('recipepage')" class="activepage"> Recipes </p>
						<p id="shoppage" onclick="gotopage('shoppage')"> Shops </p>
						<p onclick="checklogout()"> Logout </p>
					</div>
				</section>
			</section>

			<!-- MAIN -->
			<section class="outerGrids" id="mainGrid">

				<section class="innerGrids" id="dishHeadingGrid">
					<!-- RECIPE HEADING -->
					<div id="dishHeadingContent">
						<div class="secondHeadingPage">
							<p> My Recipes </p>
						</div>
						<div class="subtitle">
							<p> Please remember to add the ingredients and steps for your recipes </p>
						</div>
					</div>
				</section>

				<section class="innerGrids" id="dishButtonGrid">
					<!-- RECIPE BUTTON -->
					<div id="dishButtonContent">
						<button onclick="showPopupForm('addRecipePopup')" id="addrecipebtn"> Add Recipe </button>
					</div>
				</section>

				<section class="modal", id="addRecipePopup">
					<!-- POPUP FORM FOR ADDING RECIPE -->
					<form method="POST" class="modal-content animate" onsubmit="return false">
						<div class="popupform">

							<!-- HEADING SECTION -->
							<section class="secondHeadingForm">
								<p> Add a new Recipe </p>
							</section>

							<!-- WARNING SECTION -->
							<section class="warningSec" id="formRecipeWarn"></section>

							<section class="popupContent">
								<label for="recipeNameField" class="formLbl"> Recipe Name </label>
								<input type="text" name="recipeNameValue" class="formInput" id="recipeNameField" placeholder="Enter name of the Recipe" required>
								<br>

								<label for="recipeLinkField" class="formLbl"> Recipe Link </label>
								<input type="text" name="recipeLinkValue" class="formInput" id="recipeLinkField" placeholder="Enter name of the Recipe">
								<br>
							</section>

							<section class="popupContent" id="formButton">
								<button onclick="checkRecipeInfo()" type="submit"> Create Recipe </button>
								<button onclick="hidePopupForm('addRecipePopup')" type="button" class="cancelBtn"> Cancel </button>
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

	<!-- THIS CREATES AN INSTANCE OF THE RECIPTE PAGE WIDGET OBJECT -->
	<script type="text/javascript">
		var widget_container = document.getElementById("mainGrid");
		var lastChild_container = document.getElementById("dishButtonGrid");
		var recipe_widget = new recipewidget(widget_container, lastChild_container);
	</script>
</html>

