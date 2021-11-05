/********************* FOR SETTING UP THE PAGE ******************/
/*						  										*/
/****************************************************************/
var shops = [];
var corringrs = [];
var shop_products = [];

function prep_ingr_page() {

	get_shops(function(response) { shops = response; });
	get_corr_ingr(function(response) { corringrs = response; });
	get_shop_products();
	get_user_ingr();
}

function get_shop_products() {
	
	// AJAX REQUEST TO GET ALL PRODUCT FROM ALL SHOPS
	const request = {
		url: 'includes/get/shop_products.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {}
	};

	ajaxJquery(request, false, function(response) { shop_products = response; });
}

function get_user_ingr() {
	
	// AJAX REQUEST TO GET ALL USER'S INGREDIENTS
	const request = {
		url: 'includes/get/all_useringr.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {}
	};

	ajaxJquery(request, true, display_user_ingr);
}

/*************** FOR DISPLAYING USER INGR/PRODUCTS **************/
/*						  										*/
/****************************************************************/

function display_user_ingr(response) {

	// CLEAR THE LIST
	$("#ingrListCont").empty();
	$("#addUsrIngrPopup").hide();

	// FOR EVERY STEP FOUND
	$.each(response, function(_, eachIngr) {

		// VARIABLES
		var compareclass = "comparelist";

		var listclass = "userlists";
		var ingrdelclass = "usrIngrDelete";
		var listnameclass = "listname";

		var pickclass = "userpicks";
		var eachpickclass = "usrselection";
		var logoclass = "img-logo";

		var ingrid = eachIngr.UserIngrName;

		/***** CREATE MAIN DIV *****/
		// CREATE THE CONTAINER
		var compDiv = $("<div></div>");
		compDiv.addClass(compareclass);

		/***** CREATE USERLIST DIV *****/
		// CREATE THE CONTAINER
		var listDiv = $("<div></div>");
		listDiv.addClass(listclass);

		// CREATE THE ICON
		var iconDiv = $("<section></section>");
		iconDiv.addClass("faIcon");
		iconDiv.addClass(ingrdelclass);
		iconDiv.attr("value", ingrid);
		var icon = $("<i class='far fa-minus-square'></i>");

		// ADD THE INGR NAME
		var ingrName = $("<p></p>").html(eachIngr.UserIngrName);
		ingrName.addClass(listnameclass);

		/***** CREATE USERPICKS DIV *****/
		// CREATE THE CONTAINER
		var pickDiv = $("<div></div>");
		pickDiv.addClass(pickclass)

		// CREATE SELECTION FOR EACH SHOP
		$.each(shops, function(_, eachShop) {

			// CREATE SELECTION DIV
			var selectDiv = $("<section></section>");
			selectDiv.addClass(eachpickclass);

			// CREATE LOGO DIV
			var logoDiv = $("<div></div>");
			logoDiv.addClass(logoclass);
			var img = $("<img></img>");
			img.attr("src", eachShop.shoplogo);
			img.css("background-color", eachShop.shopcolor);

			// CREATE SELECT
			var select = $("<select></select>");
			select.addClass("selectUsrPick");
			select.attr("value", eachIngr.UserIngrName);
			var empOption = $("<option></option>");

			// APPEND
			logoDiv.append(img);
			select.append(empOption);

			// GET ALL PRODUCT OF THE SHOP
			$.each(shop_products, function(_, eachsp) {

				// IF THIS IS THE CURR SHOP
				if (eachsp.shopid == eachShop.shopid) {

					var shopprod = eachsp.products;

					// FOR EACH PRODUCT
					$.each(shopprod, function(_, eachProd) {

						// GET VARIABLES
						var prodid = eachProd.ShopIngrID;
						var prodName = eachProd.ShopIngrName;

						// CREATE AN OPTION
						var optionString = `<option value="${prodid}">${prodName}</option>`;

						// FIND IF THIS ITEM HAS A PREF USER ITEM
						$.each(corringrs, function(_, eachCorr) {
							
							// IF ITS HAS
							if (ingrid == eachCorr.corringr) {

								// CHECK IF THIS IS THE PREF ITEM
								$.each(eachCorr.products, function(_, eachprodcorr) {

									// IF IT IS
									if (prodid == eachprodcorr.ShopIngrID) {
										optionString = `<option value="${prodid}" selected="selected">${prodName}</option>`;
										return false;
									}
								});
							}
						});

						// APPEND TO THE SELECT
						select.append(optionString);
					});
				}
			});

			// APPEND
			selectDiv.append(logoDiv);
			selectDiv.append(select);

			pickDiv.append(selectDiv);
		});

		// APPEND
		iconDiv.append(icon);

		listDiv.append(iconDiv);
		listDiv.append(ingrName);

		compDiv.append(listDiv);
		compDiv.append(pickDiv);

		$("#ingrListCont").append(compDiv);
	});

	// MAKE SELECT SELECT2
	$(".selectUsrPick").select2({ 
		placeholder: "Pick Prefered",
		allowClear: true
	});

	// CREATE AN EVENTLISTENER FOR THE SELECT INPUT
	$(".selectUsrPick").on("select2:select", function(e) { add_corr_ingr(e.params.data) });
}

/******************** FOR SEARCHING INGREDIENTS *****************/
/*						  										*/
/****************************************************************/

// // SEARCH EVERYTIME USER ENTER A CHAR 
// $(document).ready(function() {
// 	$("#ingrSearchField").keyup(function() {
// 		search_ingr();
// 	});
// });

// ADD STEP WHEN USER PRESS ENTER
$(document).ready(function() {
	$("#ingrSearchField").keyup(function(e) {

		if (e.key === "Enter") {
			search_ingr();
		}
	});
});

// WHEN SEARCH BUTTON IS CLICKED
$(document).ready(function() {
	$("#searchIngrBtn").click(function() {
		search_ingr();
	});
});

function search_ingr() {

	// GET VARIABLES
	var userInput = $("#ingrSearchField").val().trim();

	// CHECK IF THERE'S AN INPUT TO SEARCH
	if (userInput != "") {

		// AJAX REQUEST TO GET INGR ACCORDING TO USER INPUT
		const request = {
			url: 'includes/get/searchUsrIngr.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "GET",
			dataType: "json",
			data: {
				"userInput": userInput
			}
		};

		ajaxJquery(request, true, display_user_ingr);
	} else {

		get_user_ingr();
	}
}

/********************** FOR ADDING INGREDIENTS ******************/
/*						  										*/
/****************************************************************/

function check_ingr_info() {

	// GET USER INPUTS
	let ingrName = $("#ingrNameField").val().trim();

	// CHECK IF REQUIRED FIELD IS EMPTY
	if (ingrName.localeCompare("") != 0) {

		// AJAX REQUEST TO CHECK INGR INFO
		const request = {
			url: 'includes/check/ingr.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "json",
			data: {
				"ingrName": ingrName
			}
		};

		ajaxJquery(request, true, add_ingr);

	} else { display_msg_ingr("reqEmpty"); }
}

function add_ingr(response) {
	
	if (response[0] === "ingrTaken") { display_msg_ingr("ingrTaken"); return; }
	if (response[0] === "pass") {

		// AJAX REQUEST TO CREATE INGR
		const request = {
			url: 'includes/create/ingr.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"ingrName": response[1]
			}
		};

		ajaxJquery(request, true, get_user_ingr);
	}
}

/********************* FOR DELETING INGREDIENTS *****************/
/*						  										*/
/****************************************************************/

$(document).ready(function() {
	$(document).on('click', '.usrIngrDelete', function() {

		// GET VARIABLES
		var ingrName = $(this).attr("value");

		// AJAX REQUEST TO CHECK IF THIS INGR IS IN USER RECIPE
		const request = {
			url: 'includes/check/recipeingr.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "json",
			data: {
				"ingrName": ingrName
			}
		};

		ajaxJquery(request, true, confirm_deletion);

	});
});

function confirm_deletion(response) {
	
	if (response[0].numrecipe >= 1) {

		cuteAlert({

			type: "question",
			title: "Are you sure?",
			message: "This ingredient is in some of your recipe.",
			confirmText: "Im sure",
			cancelText: "Nevermind",
			closeStyle: "circle"
		}).then((e) => {
			if (e == "confirm") {
				delete_ingr(response[1]);
			}
		});
	} else {

		delete_ingr(response[1]);
	}
}

function delete_ingr(ingrName) {
	
	// AJAX REQUEST TO REMOVE INGR
	const request = {
		url: 'includes/delete/deleteUsrIngr.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "json",
		data: {
			"ingrName": ingrName
		}
	};

	ajaxJquery(request, false, get_user_ingr);
}

/************** FOR SETTING USER CORR-INGREDEIENTS **************/
/*						  										*/
/****************************************************************/

function add_corr_ingr(data) {

	// GET VARIABLES
	var selectelement = data.element.parentElement;
	var optionelement = data.element;

	var usrIngrname = $(selectelement).attr("value");
	var shopIngrID = $(optionelement).attr("value");

	// AJAX REQUEST TO CREATE CORR INGR
	const request = {
		url: 'includes/create/corrIngr.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "",
		data: {
			"usrIngrname": usrIngrname,
			"shopIngrID": shopIngrID
		}
	};

	ajaxJquery(request, true, "");
}

/***************************** FUNCTIONS ************************/
/*						  										*/
/****************************************************************/

function display_msg_ingr(msg) {
	
	let warning = $("#formIngrWarn");

	switch(msg) {
		case "reqEmpty":
			warning.html("<p> Ingredient Name is required </p>");
			break;
		case "ingrTaken":
			warning.html("<p> You already have this Ingredient </p>");
			break;
		case "pass":
			window.location.replace("ingrpage.php");
			break;
	}

	clearAddIngrForm();
}