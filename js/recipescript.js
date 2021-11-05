/********************* FOR SETTING UP THE PAGE ******************/
/*						  										*/
/****************************************************************/

// SET UP THE PAGE
function prep_recipe_page() {

	// AJAX REQUEST TO GET ALL USER'S RECIPE - ONLY THE TOP 10
	get_recipe("all10", display_recipe);
}

function display_recipe(response) {

	// CLEAR THE ARRAY AND LIST
	$("#dishLstContent").empty();

	// FOR EVERY RECIPE
	$.each(response, function(_, eachRecipe) {

		// GET VARIABLES
		var listclass = "userlists";
		var dishdelclass = "dishDelete";
		var listnameclass = "listname";
		var recipeclass = "recipe";
		var recipename = eachRecipe.RecipeName;

		// CREATE MAIN CONTAINER
		var listDiv = $("<div></div>");
		listDiv.addClass(listclass);

		// CREATE THE ICON
		var iconDiv = $("<section></section>");
		iconDiv.addClass("faIcon");
		iconDiv.addClass(dishdelclass);
		iconDiv.attr("value", recipename);
		var icon = $("<i class='far fa-minus-square'></i>");

		// ADD THE INGR NAME
		var recipep = $("<p></p>").html(recipename);
		recipep.addClass(listnameclass);
		recipep.addClass(recipeclass);

		// APPENDS
		iconDiv.append(icon);

		listDiv.append(iconDiv);
		listDiv.append(recipep);

		$("#dishLstContent").append(listDiv);
	});
}

/*********************** FOR SEARCHING RECIPE *******************/
/*						  										*/
/****************************************************************/

// SEARCH EVERYTIME USER ENTER A CHAR 
$(document).ready(function() {
	$("#recipeSearchField").keyup(function() {
		search_recipe();
	});
});

// WHEN SEARCH BUTTON IS CLICKED
$(document).ready(function() {
	$("#recipeSeacrhbtn").click(function() {
		search_recipe();
	});
});

function search_recipe() {

	// GET VARIABLES
	var userInput = $("#recipeSearchField").val().trim();

	// CHECK IF THERE'S AN INPUT TO SEARCH
	if (userInput != "") {

		// AJAX REQUETS TO GET USER RECIPE ACCORDING TO USER INPUT
		const request = {
			url: 'includes/get/search_recipe.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "GET",
			dataType: "json",
			data: {
				"userInput": encodeURIComponent(userInput)
			}
		};

		ajaxJquery(request, true, display_recipe);

	} else {

		get_recipe("all10", display_recipe);
	}
}

/************************* FOR ADDING RECIPE ********************/
/*						  										*/
/****************************************************************/

// CHECK NEW RECIPE INFO IF VALID
function checkRecipeInfo() {
	
	// GET USER INPUTS
	let recipeName = $("#recipeNameField").val().trim();
	let recipeLink = $("#recipeLinkField").val().trim();

	// CHECK IF REQUIRED FIELDS ARE EMPTY
	if (recipeName.localeCompare("") != 0) {

		// IF LINK IS GIVEN
		if (recipeLink.localeCompare("") != 0) {

			// CHECK IF IT HAS SPACE - IF SO DISPLAY ERROR
			if (hasWhiteSpaces(recipeLink)) { displayMsg_recipe("whitespace"); return; } 
		}

		// AJAX REQUEST TO CHECK RECIPE INFO
		const request = {
			url: 'includes/check/recipe.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "json",
			data: {
				"recipeNameField": recipeName,
				"recipeLinkField": recipeLink
			}
		};

		ajaxJquery(request, true, addRecipe);

	} else { displayMsg_recipe("reqEmpty"); }
}

// TRY ADD RECIPE (CHECKS IF RECIPE ALREADY EXITS)
function addRecipe(response) {
	
	if (response[0] === "recipeTaken") { displayMsg_recipe("recipeTaken"); }
	if (response[0] === "pass") {

		if (response[2] != null) {
			recipeLink = response[2];
		} else {
			recipeLink = "";
		}

		// AJAX REQUEST TO CREATE RECIPE
		const request = {
			url: 'includes/create/recipe.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"recipeNameField": response[1],
				"recipeLinkField": recipeLink
			}
		};

		ajaxJquery(request, true, displayMsg_recipe);
	}
}

function displayMsg_recipe(msg) {
	
	let warnNewRecipe = $("#formRecipeWarn");

	switch(msg) {
		case "reqEmpty":
			warnNewRecipe.html("<p> Recipe Name is required </p>");
			break;
		case "whitespace":
			warnNewRecipe.html("<p> Link cannot have spaces </p>");
			break;
		case "recipeTaken":
			warnNewRecipe.html("<p> You already have this recipe </p>");
			break;
		case "pass":
			window.location.replace("recipepage.php");
			break;
	}

	clearAddRecipeForm();
}

/************************ FOR DELETING RECIPE *******************/
/*						  										*/
/****************************************************************/

// REMOVE RECIPE
$(document).ready(function() {
	$(document).on('click', '.dishDelete', function() {

		// GET VARIABLES
		var recipeName = $(this).attr("value");
		confirm_deletion(recipeName);
	});
});

function confirm_deletion(recipename) {
	
	cuteAlert({

		type: "question",
		title: "Are you sure?",
		message: "You will lose this recipe forever.",
		confirmText: "Im sure",
		cancelText: "Nevermind",
		closeStyle: "circle"
	}).then((e) => {
		if (e == "confirm") {
			delete_recipe(recipename);
		}
	});
}

function delete_recipe(recipename) {
	
	// AJAX REQUEST TO REMOVE RECIPE
	const request = {
		url: 'includes/delete/delete_recipe.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "",
		data: {
			"recipename": recipename
		}
	};

	ajaxJquery(request, true, prep_recipe_page);
}

/************************** ONCLICK BUTTONS *********************/
/*						  										*/
/****************************************************************/
/*************************** MORE BUTTONS ***********************/

// WHEN MORE BUTTON IS CLICKED
$(document).ready(function() {
	$("#moreRecipeBtn").click(function() {
		
		if ($(this).html() == "More") {

			$(this).html("Less");
			get_recipe("", display_recipe);

		} else {

			$(this).html("More");
			get_recipe("all10", display_recipe);
		}
	});
});