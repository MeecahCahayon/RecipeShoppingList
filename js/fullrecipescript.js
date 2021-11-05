/********************* FOR SETTING UP THE PAGE ******************/
/*						  										*/
/****************************************************************/
var recipeName = getQueryVariable("recipename");
var recipeIngr = [];
var recipeStep = [];

// DISPLAY THE RECIPE NAME THEN GET ALL INGR LIST OF THE RECIPE
function prep_fullrecipe_page() {

	// MAKE addIngrInput SELECT2 - ADD PLACEHOLDERS FOR ALL SELECT AND INPUTS
	$("#addIngrInput").select2({ 
		placeholder: "Add Ingredients"
	});
	$("#addstepField").attr("placeholder", "Add Step Instruction");

	// CREATE AN EVENTLISTENER FOR THE SELECT INPUT
	$("#addIngrInput").on("select2:select", function(e) { add_ingr(e.params.data) });

	// DISPLAY THE RECIPE NAME AS A SUBHEADER
	if (recipeName != false) { $("#recipeName").html(recipeName); }

	get_recipe_ingr();
	get_recipe_step();
}

function get_recipe_ingr() {
	
	// AJAX REQUEST TO GET ALL INGR OF THE RECIPE
	const request = {
		url: 'includes/get/fullrecipe.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {
			"recipename": recipeName,
			"opt": "ingrs"
		}
	};

	ajaxJquery(request, true, display_ingr);
}

function get_recipe_step() {
	
	// AJAX REQUEST TO GET ALL STEPS OF THE RECIPE
	const request = {
		url: 'includes/get/fullrecipe.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "GET",
		dataType: "json",
		data: {
			"recipename": recipeName,
			"opt": "steps"
		}
	};

	ajaxJquery(request, true, displayStep);
}

/******************* FOR DISPLAYING FULL RECIPE *****************/
/*						  										*/
/****************************************************************/

// DISPLAY THE INGR LIST OF THE RECIPE
function display_ingr(response) {

	// CLEAR THE ARRAY, INPUT AND LIST
	recipeIngr = [];
	$("#ingrList").empty();
	$('#addIngrInput').val('');

	// CREATE VARIABLES - THE INGREDIENT LIST CONTAINER 
	var listContainer = $("#ingrList");

	// FOR EVERY INGREDIENTS FOUND
	$.each(response.slice(1), function(_, eachIngr) {

		// VARIABLES
		var listclass = "userlists";
		var ingrdelclass = "ingrDelete";
		var listnameclass = "listname";

		var ingrid = eachIngr.UserIngrName;

		// ADD TO THE ARRAY (FOR DISABLE OPTION)
		recipeIngr[recipeIngr.length] = eachIngr.UserIngrName;

		// CREATE INGR CONTAINER
		var ingrDiv = $("<div></div>");
		ingrDiv.addClass(listclass);

		// CREATE THE ICON
		var iconDiv = $("<section></section>");
		iconDiv.addClass("faIcon");
		iconDiv.addClass(ingrdelclass);
		iconDiv.attr("value", ingrid);
		var icon = $("<i class='far fa-minus-square'></i>");

		// ADD THE INGR NAME
		var ingrName = $("<p></p>").html(ingrid);
		ingrName.addClass(listnameclass);

		// APPENDS
		iconDiv.append(icon);
		ingrDiv.append(iconDiv);
		ingrDiv.append(ingrName);
		listContainer.append(ingrDiv);
	});

	// REMOVE THE PLACEHOLDER
	if (recipeIngr.length >= 1) {
		$("#ingrplaceholder").hide();
	} else {
		$("#ingrplaceholder").show();
	}

	// AJAX REQUEST TO GET ALL THE INGREDIENTS OF THE USERS THEN ADD AS AN OPTION
	get_ingr_opt("#addIngrInput", recipeIngr);
}

// DISPLAY THE STEPS FOR RECIPE
function displayStep(response) {

	// CLEAR THE ARRAY, INPUT AND LIST
	recipeStep = [];
	$("#stepList").empty();
	$('#addstepField').val('');

	// CREATE ORDERED LIST
	var ol = $("<ol></ol>");
	ol.attr("id", "listofsteps");

	// FOR EVERY STEP FOUND
	$.each(response.slice(1), function(_, eachStep) {

		// VARIABLES
		var listclass = "userlists";
		var stepeditclass = "stepEdit";
		var stepdelclass = "stepDelete";
		var listnameclass = "listname";

		var stepvalue = eachStep.StepNum;

		// ADD TO THE ARRAY (FOR CHECKING LATER)
		recipeStep[recipeStep.length] = eachStep.Instruction;

		// CREATE STEP CONTAINER
		var stepDiv = $("<div></div>");
		stepDiv.addClass(listclass);

		// CREATE THE ICON
		var iconeditDiv = $("<section></section>");
		iconeditDiv.addClass("faIcon");
		iconeditDiv.addClass(stepeditclass);
		iconeditDiv.attr("value", stepvalue);
		var iconedit = $("<i class='far fa-edit'></i>");

		var icondeleteDiv = $("<section></section>");
		icondeleteDiv.addClass("faIcon");
		icondeleteDiv.addClass(stepdelclass);
		icondeleteDiv.attr("value", stepvalue);
		var icondelete = $("<i class='far fa-minus-square'></i>");

		// ADD THE STEP INSTRUCTION
		var step = $("<li></li>").html(eachStep.Instruction);
		step.addClass(listnameclass);

		// APPENDS
		iconeditDiv.append(iconedit);
		icondeleteDiv.append(icondelete);

		stepDiv.append(iconeditDiv);
		stepDiv.append(icondeleteDiv);
		stepDiv.append(step);

		ol.append(stepDiv);
	});

	$("#stepList").append(ol);

	// REMOVE THE PLACEHOLDER
	if (recipeStep.length >= 1) {
		$("#stepplaceholder").hide();
	} else {
		$("#stepplaceholder").show();
	}
}

/************************** FOR ADDING INGR *********************/
/*						  										*/
/****************************************************************/

function add_ingr(ingrData) {

	// GET VARAIBLES
	var ingrName = ingrData.id;

	// AJAX REQUEST TO ADD INGR TO THE RECIPE
	const request = {
		url: 'includes/create/add_ingr.php',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		type: "POST",
		dataType: "",
		data: {
			"recipeName": recipeName,
			"ingrName": ingrName
		}
	};

	ajaxJquery(request, true, get_recipe_ingr);
}

/************************* FOR REMOVING INGR ********************/
/*						  										*/
/****************************************************************/

$(document).ready(function() {
	$(document).on('click', '.ingrDelete', function() {

		// GET VARIABLES
		var userIngrName = $(this).attr("value");

		// AJAX REQUEST TO REMOVE INGR FROM THE RECIPIE
		const request = {
			url: 'includes/delete/delete_ingr.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"recipeName": recipeName,
				"ingrName": userIngrName
			}
		};

		ajaxJquery(request, false, get_recipe_ingr);

	});
});

/************************** FOR ADDING STEP *********************/
/*						  										*/
/****************************************************************/

// ADD STEP WHEN USER PRESS ENTER
$(document).ready(function() {
	$("#addstepField").keyup(function(e) {

		if (e.key === "Enter") {
			add_steps($(this).val())
			$(this).val("");
		}
	});
});

// ADD STEP WHEN USER PRESS THE ADD STEP BUTTON
$(document).ready(function() {
	$(document).on('click', '#addStepBtn', function() {

		add_steps($("#addstepField").val())
		$("#addstepField").val("");
	});
});

function add_steps(instruction) {
	
	var stepfound = false;
	instruction = instruction.toLowerCase();
	$("#logStep").empty();

	// FIND IF THIS STEP IS ALREADY IN THE LIST
	$.each(recipeStep, function(_, eachStep) {
		
		// IF IT IS - SET FOUND TO TRUE
		if (eachStep === instruction) {

			stepfound = true;
		}
	});

	if (!stepfound) {

		// AJAX REQUEST TO ADD STEP TO THE RECIPE
		const request = {
			url: 'includes/create/add_step.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"recipeName": recipeName,
				"instruction": instruction
			}
		};

		ajaxJquery(request, true, get_recipe_step);
	} else {

		$("#logStep").html("<p> You already have that step </p>");
	}
}

/************************* FOR REMOVING STEP ********************/
/*						  										*/
/****************************************************************/

$(document).ready(function() {
	$(document).on('click', '.stepDelete', function() {

		// GET VARIABLES
		var stepnumber = $(this).attr("value");

		// AJAX REQUEST TO REMOVE STEP FROM THE RECIPIE
		const request = {
			url: 'includes/delete/delete_step.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"recipeName": recipeName,
				"stepnumber": stepnumber
			}
		};

		ajaxJquery(request, false, get_recipe_step);

	});
});

/************************* FOR EDITING STEP *********************/
/*						  										*/
/****************************************************************/

$(document).ready(function() {
	$(document).on('click', '.stepEdit', function() {

		var instructioncont = $(this).parent().children().last();
		var steptext = instructioncont.html();
		instructioncont.attr("contentEditable", "true");
		instructioncont.attr("id", $(this).attr("value"));
		instructioncont.attr("value", instructioncont.html());
		instructioncont.addClass("editablestep");
		set_cursor(instructioncont);
	});
});

$(document).ready(function() {
	$(document).on('focusout', '.editablestep', function() {
		
		edit_step($(this));
		$(this).removeAttr("contentEditable");
		$(this).removeAttr("id");
		$(this).removeAttr("value");
		$(this).removeClass();
	});
});


function edit_step(step) {

	// GET VARIABLES
	var stepfound = false;
	stepnumber = step.attr("id");
	instruction = step.html().toLowerCase();
	$("#logStep").empty();

	// FIND IF THIS STEP IS ALREADY IN THE LIST
	$.each(recipeStep, function(_, eachStep) {
		
		// IF IT IS - SET FOUND TO TRUE
		if (eachStep === instruction) {

			stepfound = true;
		}
	});

	if (!stepfound) {

		// AJAX REQUEST TO EDIT STEP OF THE RECIPE
		const request = {
			url: 'includes/create/edit_step.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"recipeName": recipeName,
				"stepnumber": stepnumber,
				"instruction": instruction
			}
		};

		ajaxJquery(request, false, get_recipe_step);

	} else {

		$("#logStep").html("<p> You already have that step </p>");
		step.html(step.attr("value"));
	}
}

/****************************************************
*   				FUNCTIONS						*
*****************************************************/

// GET DATA FROM WINDOW.LOCATION
function getQueryVariable(variable) {
	
	// GET ALL THE DATA IN THE WINDOW.LOCATION
	var query = window.location.search.substring(1);
	var variables = query.split("&");

	// CHECK IF ITS THE VARIABLE
	for (var i = 0; i < variables.length; i++) {

		var pair = variables[i].split("=");

		if (pair[0] == variable) { return decodeURI(pair[1]); }
	}

	return false;
}

function set_cursor(editable) {

	// CREATE RANGE OBJECT
	var setpos = document.createRange();
	setpos.selectNodeContents(editable[0]);
	setpos.collapse(false);

	var set = window.getSelection();
	set.removeAllRanges();
	set.addRange(setpos);

	editable.focus();
}