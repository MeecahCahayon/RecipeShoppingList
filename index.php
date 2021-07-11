<?php
	//CHECKING ERRORS
	ini_set("error_reporting", E_ALL);
	ini_set("log_errors", "1");
	ini_set("error_log", "aa_php_error.txt");
?>

<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title> Shopping List </title>

		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

		<link rel="stylesheet" type="text/css" href="scss/pagelayout.css">
		<link rel="stylesheet" type="text/css" href="scss/indexstyle.css">

		<!-- <script type="text/javascript" src="js/mainScript.js"></script> -->
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
						<p> List </p>
						<p> Dishes </p>
						<p> Items </p>
						<p> Shops </p>
					</div>
				</section>
			</section>

			<!-- MAIN -->
			<section class="outerGrids" id="mainGrid">

				<!-- DISH LIST  -->
				<section class="innerGrids" id="dishlistGrid">
					<div class="innerlabelGrid" id="disheslabelCont">
						<div class="innerinnerGrids" id="dLabelCont">
							<p class="label" id="dLabel"> Dishes </p>
						</div>

						<div class="innerinnerGrids" id="r1labelCont">
							<p class="label" id="r1label"> Recipe One </p>
						</div>

						<div class="innerinnerGrids" id="r2labelCont">
							<p class="label" id="r2label"> Recipe Two </p>
						</div>

						<div class="innerinnerGrids" id="r3labelCont">
							<p class="label" id="r3label"> Recipe Three </p>
						</div>

						<div class="innerinnerGrids" id="r4labelCont">
							<p class="label" id="r4label"> Recipe Four </p>
						</div>

						<div class="innerinnerGrids" id="r5labelCont">
							<p class="label" id="r5label"> Recipe Five </p>
						</div>
					</div>

					<div class="innerlistGrid" id="disheslistCont">
						<div class="innerinnerGrids" id="dishesCont">
							<div id="dishes">
								<p class="dish"> Adobo </p>
								<p class="dish"> Adobo </p>
								<p class="dish"> Adobo </p> 
							</div>
						</div>

						<div class="innerinnerGrids" id="recipeOneCont">
							<div id="recipes-one">
								<p class="recipe"> Pineapple One </p>
								<p class="recipe"> Pineapple One </p>
								<p class="recipe"> Pineapple One </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="recipeTwoCont">
							<div id="recipes-two">
								<p class="recipe"> Pineapple Two </p>
								<p class="recipe"> Pineapple Two </p>
								<p class="recipe"> Pineapple Two </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="recipeThreeCont">
							<div id="recipes-three">
								<p class="recipe"> Pineapple Three </p>
								<p class="null"> Nothing </p>
								<p class="recipe"> Pineapple Three </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="recipeFourCont">
							<div id="recipes-four">
								<p class="recipe"> Pineapple Four </p>
								<p class="recipe"> Pineapple Four </p>
								<p class="recipe"> Pineapple Four </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="recipeFiveCont">
							<div id="recipes-five">
								<p class="recipe"> Pineapple Five </p>
								<p class="recipe"> Pineapple Five </p>
								<p class="null"> Nothing </p>
							</div>
						</div>
					</div>

					<div class="innerbuttonGrid" id="dishesbuttonCont">
						<div id="dishaddButton">
							<button>Sample</button>
						</div>
					</div>
				</section>

				<!-- ITEM LIST  -->
				<section class="innerGrids" id="itemlistGrid">
					<div class="innerlabelGrid" id="itemlabelCont">
						<div class="innerinnerGrids" id="iLabelCont">
							<p class="label" id="iLabel"> Items </p>
						</div>

						<div class="innerinnerGrids" id="s1labelCont">
							<p class="label" id="s1label"> Pak n Save </p>
						</div>

						<div class="innerinnerGrids" id="s2labelCont">
							<p class="label" id="s2label"> Countdown </p>
						</div>

						<div class="innerinnerGrids" id="s3labelCont">
							<p class="label" id="s3label"> Mad Butcher </p>
						</div>

						<div class="innerinnerGrids" id="s4labelCont">
							<p class="label" id="s4label"> Pino Plus </p>
						</div>

						<div class="innerinnerGrids" id="s5labelCont">
							<p class="label" id="s5label"> Other </p>
						</div>
					</div>

					<div class="innerlistGrid" id="itemlistCont">
						<div class="innerinnerGrids" id="ItemsCont">
							<div id="items">
								<p class="item"> Pork </p>
								<p class="item"> Chicken </p>
								<p class="item"> Salmon </p> 
							</div>
						</div>

						<div class="innerinnerGrids" id="storeOneCont">
							<div id="paknsave">
								<p class="store"> $10.00 </p>
								<p class="store"> $20.00 </p>
								<p class="store"> $30.00 </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="storeTwoCont">
							<div id="countdown">
								<p class="store"> $15.00 </p>
								<p class="store"> $15.00 </p>
								<p class="store"> $35.00 </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="storeThreeCont">
							<div id="madbutcher">
								<p class="store"> $7.00 </p>
								<p class="store"> $15.00 </p>
								<p class="store"> $20.00 </p>
							</div>
						</div>

						<div class="innerinnerGrids" id="storeFourCont">
							<div id="pinoplus">
								<p class="store"> $00.00 </p>
								<p class="store"> $00.00 </p>
								<p class="store"> $00.00 </p>
							</div>
						</div>
						
						<div class="innerinnerGrids" id="storeFiveCont">
							<div id="other">
								<p class="store"> $30.00 </p>
								<p class="store"> $40.00 </p>
								<p class="store"> $360.00 </p>
							</div>
						</div>
					</div>

					<div class="innerbuttonGrid" id="itembuttonCont">
						<div id="listaddButton">
							<button>Sample</button>
						</div>
					</div>
				</section>
			</section>

			<!-- FOOTER -->
			<section class="outerGrids" id="footerGrid">
				
				<!-- FOOTER -->
				<footer class="innerGrids" id="footGrid">
					<div id="footerCont">
						<p> Meecah Cahayon - Connor Jones </p>
					</div>
				</footer>
			</section>
		</div>
	</body>
</html>

