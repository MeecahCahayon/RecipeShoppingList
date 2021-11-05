/********************* FOR SETTING UP THE PAGE ******************/
/*						  										*/
/****************************************************************/
var prodOnWatch = [];
var shops = [];
var corringrs = [];

var pricediv = "";

// SET UP THE PAGE
function prep_watch_page() {
	
	// MAKE watchSearchField SELECT2 - ADD PLACEHOLDERS FOR ALL SELECT AND INPUTS
	$("#watchSearchField").select2({ 
		placeholder: "Find Ingredients or Product to watch"
	});

	// CREATE AN EVENTLISTENER FOR THE SELECT INPUT
	$("#watchSearchField").on("select2:select", function(e) { set_onWatch(e.params.data) });

	get_shops(function(response) { shops = response; });
	get_corr_ingr(function(response) { corringrs = response; });
	get_onWatch();
}

// GET THE USERS ONWACTH INGR/PRODUCTS FROM DB
function get_onWatch() {

	// AJAX REQUEST TO GET ALL USER ONWACTH INGR/PRODUCTS
	const request = {
		url: 'includes/get/onWatchProd.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {}
	};

	ajaxJquery(request, true, display_onWatch);
}

/*********** FOR DISPLAYING USER ONWACTH INGR/PRODUCTS **********/
/*						  										*/
/****************************************************************/

// DISPLAY USERS ONWACTH INGR/PRODUCTS
function display_onWatch(response) {
	
	// GET VARIABLES
	var container = $("#onwatchlist");

	// CLEAR THE ARRAY AND LIST
	prodOnWatch = [];
	container.empty();

	// FOR EVERY ONWACTH INGR/PRODUCTS, STORE IN ARRAY AND DISPLAY
	$.each(response, function(_, eachProd) {

		// GET VARIABLES
		var compareclass = "comparelist";

		var listclass = "userlists";
		var onWatchdelclass = "onWatchDelete";
		var listnameclass = "listname";

		var pickclass = "userpicks";
		var eachpickclass = "eachpicks";
		var logoclass = "img-logo";

		var ingrname = eachProd.UserIngrName;

		// ADD TO THE ARRAY (FOR DISABLE OPTION)
		prodOnWatch[prodOnWatch.length] = eachProd.UserIngrName;

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
		iconDiv.addClass(onWatchdelclass);
		iconDiv.attr("value", ingrname);
		var icon = $("<i class='far fa-minus-square'></i>");

		// ADD THE INGR NAME
		var ingrp = $("<p></p>").html(ingrname);
		ingrp.addClass(listnameclass);

		// APPENDS
		iconDiv.append(icon);

		listDiv.append(iconDiv);
		listDiv.append(ingrp);

		compDiv.append(listDiv);

		// CHECK IF THIS PROD HAS CORR INGR
		$.each(corringrs, function(_, eachCorr) {

			// IF IT HAS
			if (eachProd.UserIngrName == eachCorr.corringr) {

				// GET VARIABLES
				var corringrprod = eachCorr.products;

				/***** CREATE USERPICKS DIV *****/
				// CREATE THE CONTAINER
				var pickDiv = $("<div></div>");
				pickDiv.addClass(pickclass);

				// FOR EACH CORRPROD OF THIS PROD
				$.each(corringrprod, function(_, eachCorrProd) {

					// CHECK WHICH SHOP THE PROD HAS CORRPROD
					$.each(shops, function(_, eachShop) {
					
						// IF IT HAS CORRPROD WITH THE CURR SHOP
						if (eachCorrProd.ShopID == eachShop.shopid) {

							// CREATE CARD DIV
							var cardDiv = $("<section></section>");
							cardDiv.addClass(eachpickclass);

							// CREATE THE LOGO DIV
							var logoDiv = $("<div></div>");
							logoDiv.addClass(logoclass);
							var img = $("<img></img>");
							img.attr("src", eachShop.shoplogo);
							img.css("background-color", eachShop.shopcolor);

							// AJAX REQUEST TO GET CORRINGR INFORMATION
							const request = {
								url: 'includes/get/shopingr.php',
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
								type: "GET",
								dataType: "json",
								data: {
									"shopingrid": eachCorrProd.ShopIngrID
								}
							};

							ajaxJquery(request, false, display_corringr_price);

							// CREATE THE PRICES DIV
							var priceDiv = pricediv;

							// APPENDS
							logoDiv.append(img);

							cardDiv.append(logoDiv);
							cardDiv.append(priceDiv);

							pickDiv.append(cardDiv);
						}
					});
				});

				// APPENDS
				compDiv.append(pickDiv);
			}
		});

		// APPENDS
		container.append(compDiv);
	});

	get_ingr_opt("#watchSearchField", prodOnWatch);
}

// DISPLAY THE PRICES OF EACH CORR INGR/PROD
function display_corringr_price(response) {
	
	// CREATE THE PRICES DIV
	var priceDiv = $("<div></div>");

	// ADD THE INGR SALE AND PRICE
	if (parseInt(response.MultiQuantity) > 1) {

		// GET VARIABLES
		var saleprice = parseInt(response.MultiPrice) / parseInt(response.MultiQuantity);

		var ingrSale = $("<p></p>").html(response.MultiQuantity + " for $" + response.MultiPrice);
		var ingrPrice = $("<p></p>").html("<strike>$"+ response.ShopPrice + "</strike> $" + saleprice);

		// APPENDS
		priceDiv.append(ingrSale);
		priceDiv.append(ingrPrice);
	} else {

		var ingrPrice = $("<p></p>").html("$"+ response.ShopPrice);

		// APPENDS
		priceDiv.append(ingrPrice);
	}

	pricediv = priceDiv;
}

/***************** FOR SETTING ONWATCH INGR/PROD ****************/
/*						  										*/
/****************************************************************/

// SET THE SELECTED INGR/PROD AS ONWATCH
function set_onWatch(data) {

	// GET VARAIBLES
	var ingrname = data.id;

	// AJAX REQUEST TO SET INGR/PROD FROM ONWATCH
	const request = {
		url: 'includes/create/setOnWatch.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "",
		data: {
			"ingrname": ingrname
		}
	};

	ajaxJquery(request, true, get_onWatch);
}

/**************** FOR UNSETTING ONWATCH INGR/PROD ***************/
/*						  										*/
/****************************************************************/

// UNSET THE SELECTED INGR/PROD
$(document).ready(function() {
	$(document).on('click', '.onWatchDelete', function() {

		// GET VARIABLES
		var ingrname = $(this).attr("value");

		// AJAX REQUEST TO UNSET INGR/PROD FROM ONWATCH
		const request = {
			url: 'includes/create/unsetOnWatch.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"ingrname": ingrname
			}
		};

		ajaxJquery(request, true, get_onWatch);

	});
});