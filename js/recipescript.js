/****************************************************
*   				FOR ADDING RECIPE				*
*****************************************************/

// CHECK NEW RECIPE INFO IF VALID
function checkRecipeInfo() {
	
	// GET USER INPUTS
	let recipeName = document.getElementById("recipeNameField").value.trim();
	let recipeLink = document.getElementById("recipeLinkField").value.trim();

	// CHECK IF REQUIRED FIELDS ARE EMPTY
	if (recipeName.localeCompare("") != 0) {

		// IF LINK IS GIVEN
		if (recipeLink.localeCompare("") != 0) {

			// IF IT HAS SPACE
			if (hasWhiteSpaces(recipeLink)) { displayMsg_recipe("whitespace"); return; } 
		}

		// AJAX REQUEST TO PROCCESS LOGIN
		let url = "includes/check/recipe.php";
		let data = "recipeNameField=" + recipeName + "&recipeLinkField=" + recipeLink;
		ajaxRequest(url, "POST", data, addRecipe, true);

	} else { displayMsg_recipe("reqEmpty"); }
}

// TRY ADD RECIPE (CHECKS IF RECIPE ALREADY EXITS)
function addRecipe(response) {
	
	if (response[0] === "recipeTaken") { displayMsg_recipe("recipeTaken"); }
	if (response[0] === "pass") {


		// AJAX REQUEST TO PROCCESS LOGIN
		let url = "includes/create/recipe.php";
		let data = "recipeNameField=" + response[1] + "&recipeLinkField=" + response[2];
		ajaxRequest(url, "POST", data, displayMsg_recipe, false);
		// displayMsg_recipe("pass");
	}
}

function displayMsg_recipe(msg) {
	
	let warnNewRecipe = document.getElementById("formRecipeWarn");

	switch(msg) {
		case "reqEmpty":
			warnNewRecipe.innerHTML = "<p> Recipe Name is required </p>";
			break;
		case "whitespace":
			warnNewRecipe.innerHTML = "<p> Link cannot have spaces </p>";
			break;
		case "recipeTaken":
			warnNewRecipe.innerHTML = "<p> You already have this recipe </p>";
			break;
		case "pass":
			window.location.replace("recipepage.php");
			break;
	}

	clearAddRecipeForm();
}