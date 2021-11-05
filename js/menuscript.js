/********************* FOR SETTING UP THE PAGE ******************/
/*						  										*/
/****************************************************************/
var dishesOnMenu = [];

// SET UP THE PAGE
function prep_menu_page() {
	
	// MAKE menuSearchField SELECT2 - ADD PLACEHOLDERS FOR ALL SELECT AND INPUTS
	$("#menuSearchField").select2({ 
		placeholder: "Find Recipe to add"
	});

	// CREATE AN EVENTLISTENER FOR THE SELECT INPUT
	$("#menuSearchField").on("select2:select", function(e) { set_onMenu(e.params.data) });

	get_onMenu();
}

// GET THE USERS ONMENU DISH FROM DB
function get_onMenu() {

	// AJAX REQUEST TO GET ALL USER ONMENU DISHES
	const request = {
		url: 'includes/get/onMenuDishes.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {}
	};

	ajaxJquery(request, true, display_onMenu);
}

/*************** FOR DISPLAYING USER ONMENU RECIPE **************/
/*						  										*/
/****************************************************************/

// DISPLAY USERS ONMENU DISHES
function display_onMenu(response) {
	
	// CLEAR THE ARRAY AND LIST
	dishesOnMenu = [];
	$("#menuListCont").empty();

	// GET VARIABLES
	var container = $("#menuListCont");

	// FOR EVERY ONMENU DISH, STORE IN ARRAY AND DISPLAY
	$.each(response, function(_, eachMenuDish) {

		// GET VARIABLES
		var listclass = "userlists";
		var onmenudelclass = "onmenuDelete";
		var listnameclass = "listname";
		var recipeclass = "recipe";
		var recipename = eachMenuDish.RecipeName;

		// PUSH TO THE ARRAY
		let onMenuDish = {
			recipeName: recipename
		};
		dishesOnMenu.push(onMenuDish);

		// CREATE MAIN CONTAINER
		var listDiv = $("<div></div>");
		listDiv.addClass(listclass);

		// CREATE THE ICON
		var iconDiv = $("<section></section>");
		iconDiv.addClass("faIcon");
		iconDiv.addClass(onmenudelclass);
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

		$("#menuListCont").append(listDiv);
	});

	// AJAX REQUEST TO GET ALL USER RECIPE FOR OPTION TO BE ONMENU DISHES
	get_recipe("", display_recipe_opt);
}

// ADD USER RECIPE TO THE SELECT OPTION
function display_recipe_opt(response) {
	
	// REMOVE EVEY OPTION EXCEPT THE FIRST ONE (EMPTY)
	$("#menuSearchField option:not(:first)").remove();

	// FOR EVERY RECIPE FOUND
	$.each(response, function(_, eachRecipe) {

		// GET VARIABLES
		var recipename = eachRecipe.RecipeName;

		// CREATE AN OPTION
		var optionString = `<option value="${recipename}">${recipename}</option>`;

		// FIND IF THIS RECIPE IS ALREADY IN THE ONMENU ARRAY
		$.each(dishesOnMenu, function(_, eachCorr) {
			
			// IF IT IS
			if (eachCorr.recipeName == recipename) {

				// DISABLE THE OPTION
				optionString = `<option value="${recipename}" disabled="disabled">${recipename}</option>`;
				return false;
			}
		});

		// APPEND TO THE SELECT
		$("#menuSearchField").append(optionString);
	});
}

/******************* FOR SETTING ONMENU DISHES ******************/
/*						  										*/
/****************************************************************/

// SET THE SELECTED RECIPE AS ONMENU
function set_onMenu(data) {

	// GET VARAIBLES
	var recipename = data.id;

	// AJAX REQUEST TO SET RECIPE FROM ONMENU
	const request = {
		url: 'includes/create/setOnMenu.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "",
		data: {
			"recipeName": recipename
		}
	};

	ajaxJquery(request, true, get_onMenu);
}

/****************** FOR UNSETTING ONMENU DISHES *****************/
/*						  										*/
/****************************************************************/

// UNSET THE SELECTED RECIPE
$(document).ready(function() {
	$(document).on('click', '.onmenuDelete', function() {

		// GET VARIABLES
		var recipeName = $(this).attr("value");

		// AJAX REQUEST TO UNSET RECIPE FROM ONMENU
		const request = {
			url: 'includes/create/unsetOnMenu.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"recipeName": recipeName
			}
		};

		ajaxJquery(request, true, get_onMenu);
	});
});