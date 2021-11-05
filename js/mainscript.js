/**************************** FOR AJAX **************************/
/*						  										*/
/****************************************************************/

// CREATING ASYNCHRONOUS AJAX REQUEST
function ajaxRequest(url, method, data, callback, json) {

	let request = new XMLHttpRequest();
	request.open(method, url, true);

	if (method == "POST") {
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}

	request.onreadystatechange = function() {
		// IF REQUEST IS READY TO BE PROCCESS
		if (request.readyState === 4) {
			// IF REQUEST WAS SUCCESSFUL
			if (request.status === 200) {
				// GET RESPONSE AND CALLBACK
				if (json){
					response = JSON.parse(request.responseText);
				}
				else{
					response = request.responseText;
				}

				callback(response);
			} else {
				handleError(request.statusText);
			}
		}
	}

	request.send(data);	
}

function ajaxJquery(request, isAsync, callback) {

	$.ajax({
		
		url: request.url,
		headers: request.headers,
		async: isAsync,
		type: request.type,
		dataType: request.dataType,
		data: request.data,
		success: function (response) {
			if (callback != "") {
				callback(response);
			}
		},
		error: function (response) {
			handleError(response);
		}
	});
}

function handleError(error) { console.log(error); }

/************************ FOR LOGGING OUT ***********************/
/*						  										*/
/****************************************************************/

//AJAX REQUEST (DESTROY SESSION)
function checklogout() {

	//AJAX REQUEST TO PROCCESS LOGOUT
	const request = {
		url: 'includes/processLogout.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "",
		data: {}
	};

	ajaxJquery(request, true, logout);
}

//LOG OUT
function logout(response) {

	// DONT FORGET TO CLEAR SESSION STORAGE WHEN USER LOGS OUT
	sessionStorage.clear()
	//REDIRECT TO LOGIN PAGE
	window.location.replace("index.php");
}

/************************ FOR ACTIVE MENU ***********************/
/*						  										*/
/****************************************************************/

// DIRECT USER TO THE PAGE AND MAKE IT THE ACTIVE PAGE
function gotopage(pageID) {

	// REDIRECT USER TO PAGE
	switch(pageID) {
		case "watchpage":
			window.location.replace("watchpage.php");
			break;
		case "dishpage":
			window.location.replace("menupage.php");
			break;
		case "grocerypage":
			window.location.replace("grocerypage.php");
			break;
		case "ingrpage":
			window.location.replace("ingrpage.php");
			break;
		case "recipepage":
			window.location.replace("recipepage.php");
			break;
		case "shoppage":
			window.location.replace("shoppage.php");
			break;
	}
}

/*********************** FOR DROPDOWN MENU **********************/
/*						  										*/
/****************************************************************/

// IF LIST DROPDOWN BUTTON IS CLICKED
$(document).ready(function () {
	$(".dropdownContainer").click(function(e) {
		$('.dropdown-content').toggle();
	});
})

// IF ANYTHING ELSE IS CLICKED - CLOSE DROP DOWN
$(document).ready(function () {
	$(document).mouseup(function (e) {

		var container = $(".dropdown-content");

		// if the target of the click isn't the container or a descendant of the container
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.css('display', 'none');
		}
	});
})

/************************ FOR POPUP FORM ************************/
/*						  										*/
/****************************************************************/

// DISPLAY POPUP FORM
function showPopupForm(id) {

	$(id).show();

	// CLEAR FORM TEXTBOXES AND ERROR SECTION
	switch(id) {
		case "#addAccountPopup":
			clearCreateAcctForm();
			$("#formAcntWarn").empty();
			break;
		case "#addRecipePopup":
			clearAddRecipeForm();
			$("#formRecipeWarn").empty();
			break;
		case "#addUsrIngrPopup":
			clearAddIngrForm();
			$("#formIngrWarn").empty();
			break;
	}
}

// HIDE THE POPUP FORM
function hidePopupForm(id) {

	$(id).hide();

	// CLEAR FORM TEXTBOXES AND ERROR SECTION
	switch(id) {
		case "#addAccountPopup":
			clearLoginForm();
			$("#logWarn").empty();
			break;
	}
}

/************************** AJAX CALLS **************************/
/*						  										*/
/****************************************************************/
/********** MAKING ALL USERS INGRS/PRODS AS SELECT OPT **********/

// GET ALL OF THE USER'S INGREDIENTS
function get_ingr_opt(selectid, ingrarray) {
	
	// AJAX REQUEST TO GET ALL THE INGREDIENTS OF THE USERS THEN ADD AS AN OPTION
	$(document).ready(function() {
		const request = {
			url: 'includes/get/all_useringr_opt.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "GET",
			dataType: "json",
			data: {
				"selectid": selectid,
				"ingrarray": ingrarray
			}
		};

		ajaxJquery(request, true, display_ingr_opt);
	});
}

function display_ingr_opt(response) {

	// GET VARIABLES
	var selectid = response[0];
	var selectidrem = response[0] + " option:not(:first)";
	var ingrarray = response[1];

	// REMOVE EVEY OPTION EXCEPT THE FIRST ONE (EMPTY)
	$(selectidrem).remove();

	// FOR EACH INGREDIENTS OF THE USER
	$.each(response.slice(2), function(_, eachIngr) {

		ingrName = eachIngr.UserIngrName;

		// CREATE AN OPTION
		var optionString = `<option value="${ingrName}">${ingrName}</option>`;

		// FIND IF THIS INGREDIENT IS ALREADY IN THE LIST
		$.each(ingrarray, function(_, eachDisabled) {
			
			// IF IT IS - HAVE THE OPTION DISABLED
			if (eachDisabled == ingrName) {

				optionString = `<option value="${ingrName}" disabled="disabled">${ingrName}</option>`;
				return false;
			}
		});

		// APPEND TO THE SELECT
		$(selectid).append(optionString);
	});
}

/************************* GET SHOP DATA ************************/

function get_shops(callback) {
	
	// AJAX REQUEST TO GET ALL THE SHOPS IN THE DB
	$(document).ready(function() {
		const request = {
			url: 'includes/get/shops.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "GET",
			dataType: "json",
			data: {}
		};

		ajaxJquery(request, false, callback);
	});
}

/******************** GET USER CORRINGR DATA ********************/

function get_corr_ingr(callback) {
	
	// AJAX REQUEST TO GET ALL THE USER CORRINGR IN THE DB
	$(document).ready(function() {
		const request = {
			url: 'includes/get/corringrs.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "GET",
			dataType: "json",
			data: {}
		};

		ajaxJquery(request, false, callback);
	});
}

/************************ GET USER RECIPE ***********************/

function get_recipe(opt, callback) {
	
	// AJAX REQUEST TO GET ALL USER RECIPE
	const request = {
		url: 'includes/get/all_recipe.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {
			"opt": opt
		}
	};

	ajaxJquery(request, true, callback);
}

/**************** FOR GOING TO FULLRECIPE PAGE ******************/
/*						  										*/
/****************************************************************/

// WHEN RECIPE NAME IS CLICKED
$(document).ready(function() {
	$(document).on('click', '.recipe', function() {

		// GET VARIABLES
		var recipeName = $(this).html();

		// REDIRECT TO FULLRECIPE PAGE
		window.location.href = encodeURI("fullrecipepage.php?recipename=" + recipeName);

	});
});


/************************** FUNTIONS ****************************/
/*						  										*/
/****************************************************************/
/*************************** RANDOMS ****************************/

// RETURN TRUE IF STRING HAS WHITESPACES
function hasWhiteSpaces(string) {
	return /\s/g.test(string);
}

function removeWhitespace(string) {
	return string.replace(/\s+/g, '');
}

/********************* FOR ICON AESTHETIC ***********************/

// WHEN ICON BUTTON IS HOVERED
$(document).ready(function() {
	$(document).on('mouseover', '.faIcon', function() {

			$(this).children().first().addClass("fa-lg");
		});
});

$(document).ready(function() {
	$(document).on('mouseleave', '.faIcon', function() {

			$(this).children().first().removeClass("fa-lg");
		});
});

/*********************** CLEARING FORMS *************************/

function clearLoginForm() {

	$('#usrnameField').val("");
	$('#passField').val("");
	$('#usrnameField').focus();
}

function clearCreateAcctForm() {

	$('#newUNField').val("");
	$('#newPassField').val("");
	$('#newUNField').focus();
}

function clearAddRecipeForm() {

	$('#recipeNameField').val("");
	$('#recipeLinkField').val("");
	$('#recipeNameField').focus();
}

function clearAddIngrForm() {

	$('#ingrNameField').val("");
	$('#ingrNameField').focus();
}