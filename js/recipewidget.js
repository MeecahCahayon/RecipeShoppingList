/*********************************************************************************
* 																				*
*   			Constructor function for a Admin Page instance					*
* 																				*
*  container_element : a DOM element inside which the widget will place its UI 	*
* 																				*
*********************************************************************************/

function recipewidget(container_element, last_child) {
	
	// DECLARING WIDGET PROPERTY
	var _recipelist = [];

	/*** CLASS, NAME, AND ID NAMES ***/
	// GRID SECTION
	var _classGridInner = "innerGrids";
	var _idGridSearch = "dishSearchGrid"
	var _idGridList = "dishLstGrid";
	// CONTENT SECTION
	var _idContSeacrh = "searchCont";
	var _idRecipeLst = "dishLstContent";
	// CONTENT ELEMENTS
	var _classElemSearchInput = "searchInput";
	var _idElemSearchInput = "searchField";
	var _nameElemSearchInput = "searchValue";

	var _idElemSearchBtn = "seacrhrecipebtn";
	var _contElemSearchBtn = "Search";

	// CREATE OBJECT LITERAL (WIDGETS UI)
	var _widgetUI = {

		//CONTAINER FOR ALL THE UI ELEMENTS
		rootContainer: null,

		searchSection: null,
		searchCont: null,
		searchInput: null,
		searchBtn: null,

		listSection: null,
		recipeList: null,

	};

	// CREATE WIDGET UI
	var _createWidgetUI = function() {
		
		// ASSIGN WHERE THE WIDGET WILL GO - THE ROOT CONTAINER
		_widgetUI.rootContainer = container_element;

		/*** CREATE SEARCH GRID ***/
		// SEACRH SECTION
		_widgetUI.searchSection = document.createElement("section");
		_widgetUI.searchSection.className = _classGridInner;
		_widgetUI.searchSection.id = _idGridSearch;
		// SEARCH CONTENT
		_widgetUI.searchCont = document.createElement("div");
		_widgetUI.searchCont.id = _idContSeacrh;
		// ADD ELEMENTS - SEARCH INPUT
		_widgetUI.searchInput = document.createElement("input");
		_widgetUI.searchInput.className = _classElemSearchInput;
		_widgetUI.searchInput.id = _idElemSearchInput;
		_widgetUI.searchInput.type = "text";
		_widgetUI.searchInput.name = _nameElemSearchInput;
		// ADD ELEMENTS - SEARCH BUTTON
		_widgetUI.searchBtn = document.createElement("button");
		_widgetUI.searchBtn.id = _idElemSearchBtn;
		_widgetUI.searchBtn.innerHTML = _contElemSearchBtn;
		// APPEND CONTENTS TO THE SECTION CONTAIONER
		_widgetUI.searchCont.appendChild(_widgetUI.searchInput);
		_widgetUI.searchCont.appendChild(_widgetUI.searchBtn);
		_widgetUI.searchSection.appendChild(_widgetUI.searchCont);

		/*** CREATE DISH LIST GRID ***/
		// LIST SECTION
		_widgetUI.listSection = document.createElement("section");
		_widgetUI.listSection.className = _classGridInner;
		_widgetUI.listSection.id = _idGridList;
		// RECIPELIST
		_widgetUI.recipeList = document.createElement("div");
		_widgetUI.recipeList.id = _idRecipeLst;
		// APPEND CONTENTS TO THE SECTION CONTAIONER
		_widgetUI.listSection.appendChild(_widgetUI.recipeList);

		// INSERT SECTION BEOFRE LAST CHILD(THE BUTTON SECTION) CONTAINERS TO THE ROOT CONTAINER
		_widgetUI.rootContainer.insertBefore(_widgetUI.searchSection, last_child);
		_widgetUI.rootContainer.insertBefore(_widgetUI.listSection, last_child);

		/*** CREATE EVENTS ***/
		// WHEN ENTER KEY IS PRESSED, TRIGGER BUTTON CLICK
		_widgetUI.searchInput.addEventListener("keyup", function(event) {

			if(event.key === 'Enter') {
				_widgetUI.searchBtn.click();
			}
			// _searchCompany(_widgetUI.searchInput.value);
		});

		// WHEN SEARCH BUTTON IS PRESS
		_widgetUI.searchBtn.onclick = function() {
			

		}

	};

	/*********************************************************************************
	* 																				*
	*   		  Add any other methods required for the functionality				*
	* 																				*
	*********************************************************************************/

	//CREATING ASYNCHRONOUS AJAX REQUEST
	var _ajaxRequest = function(url, method, data, callback) {

		let request = new XMLHttpRequest();
		request.open(method, url, true);

		if (method == "POST") {
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}

		request.onreadystatechange = function() {
			//IF REQUEST IS READY TO BE PROCCESS
			if (request.readyState === 4) {
				//IF REQUEST WAS SUCCESSFUL
				if (request.status === 200) {
					//GET RESPONSE AND CALLBACK
					response = JSON.parse(request.responseText);
					callback(response);
				} else { _handleError(request.statusText); }
			}
		}
		request.send(data);	
	};

	var _handleError = function(error) { console.log(error); };

	// AJAX REQUEST TO GET RECIPES
	var _getRecipes = function() {
		
		var url = "includes/get/allRecipe.php";
		_ajaxRequest(url, "GET", "", _addRecipetoList);
	};

	// ADD ALL RECIPE TO THE LIST TO DISPLAY
	var _addRecipetoList = function(response) {

		// ADD RECIPE TO _recipelist
		for (var i = 0; i < response.length; i++) {

			var recipeItem = new _recipeContainer(response[i].RecipeName);
			_recipelist.push(recipeItem);
		}

		_displayRecipe();
	};

	// DISPLAY RECIPE
	var _displayRecipe = function() {
		
		if (_recipelist == null) return;

		// REMOVE EVERYTHING
		while (_widgetUI.recipeList.hasChildNodes()) {

			_widgetUI.recipeList.removeChild(_widgetUI.recipeList.lastChild);
		}

		// ADD EVERYTHING
		for (var i = 0; i < _recipelist.length; i++) {

			var recipeLine = _recipelist[i];
			_widgetUI.recipeList.appendChild(recipeLine.getDiv());
		}
	};

	// SEACRH RECIPE
	var _searchRecipe = function(input) {
		
		var url = encodeURI("includes/get/searchRecipe.php?input=" + encodeURIComponent(input));
		_ajaxRequest(url, "GET", "", _addtoSearchList);
	}

	/*********************************************************************************
	* 																				*
	*   		private method to intialise the widget's UI on start up				*
	* 																				*
	*********************************************************************************/

	var _initialise = function(container_element) 
	{
		_createWidgetUI(container_element);
		_getRecipes();
	};

	/*********************************************************************************
	* 																				*
	* 					Constructor Function for the recipe object					*
	* 																				*
	*						this is to hold recipe information						*
	* 																				*
	*********************************************************************************/

	var _recipeContainer = function(recipeName) {
		
		// DECLARING RECIPE PROPERTIES
		var _recipeName = recipeName;

		/*** CLASS, NAME, AND ID NAMES ***/
		// ROOT CONTAINER
		var _classRoot = "recipe";
		var _classRecipeName = "recipeName";

		// DECLARING INNER OBJECT LITERAL (THE OBJECTS UI)
		var _recipeContUI = {

			//CONTAINER FOR ALL THE UI ELEMENTS
			rootContainer: null,
			recipeNameLbl: null,
		};

		// CREATE THE OBJECTS UI
		var _createObjetUI = function() {
			
			// CREATE ROOT CONTAINER
			_recipeContUI.rootContainer = document.createElement("div");
			_recipeContUI.rootContainer.className = _classRoot;

			// ADD ELEMENTS - P
			_recipeContUI.recipeNameLbl = document.createElement("p");
			_recipeContUI.recipeNameLbl.className = _classRecipeName;
			_recipeContUI.recipeNameLbl.innerHTML = _recipeName;

			// APPEND CONTENTS TO THE SECTION CONTAIONER
			_recipeContUI.rootContainer.appendChild(_recipeContUI.recipeNameLbl);

			//CREATING EVENTS
			_recipeContUI.rootContainer.onclick = function() {
				console.log("CLICKED");
			};
		};

		/*********************************************************************************
		* 																				*
		*   		 Add any remaining functions you need for the object RLine			*
		* 																				*
		*********************************************************************************/
		/* GETTER */
		// ROOT CONTAINER
		this.getDiv = function() { return _recipeContUI.rootContainer; };

		//_createObjetUI() IS CALLED WHEN THE OBJECT IS INSTANTIATED
		_createObjetUI();
	};

	// _initialise IS CALLED WHEN THE RECIPEWIDGET IS INSTANTIATED
	_initialise(container_element);
}