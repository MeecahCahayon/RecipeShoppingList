/****************************************************
*   				  FOR AJAX						*
*****************************************************/

//CREATING ASYNCHRONOUS AJAX REQUEST
function ajaxRequest(url, method, data, callback, json) {

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


function handleError(error) { console.log(error); }

/****************************************************
*   			  FOR LOGGING OUT					*
*****************************************************/

//AJAX REQUEST (DESTROY SESSION)
function checklogout() {

	//AJAX REQUEST TO PROCCESS LOGOUT
	let url = "includes/processLogout.php";
	ajaxRequest(url, "POST", "", logout, false);
}

//LOG OUT
function logout() {

	//REDIRECT TO LOGIN PAGE
	window.location.replace("index.php");
}

/****************************************************
*   			  FOR ACTIVE MENU					*
*****************************************************/

// DIRECT USER TO THE PAGE AND MAKE IT THE ACTIVE PAGE
function gotopage(pageID) {

	// REDIRECT USER TO PAGE
	switch(pageID) {
		case "listpage":
			window.location.replace("dashboardpage.php");
			break;
		case "specialpage":
			window.location.replace("specialpage.php");
			break;
		case "recipepage":
			window.location.replace("recipepage.php");
			break;
		case "shoppage":
			window.location.replace("shoppage.php");
			break;
	}
}

/****************************************************
*   			  FOR POPUP FORM					*
*****************************************************/

function showPopupForm(id) {

	document.getElementById(id).style.display='block';

	// CLEAR FORM TEXTBOXES AND ERROR SECTION
	switch(id) {
		case "addAccountPopup":
			clearCreateAcctForm();
			let addAccount = document.getElementById("formAcntWarn");
			while (addAccount.hasChildNodes()) {
				addAccount.lastElementChild.remove();
			}
			break;
		case "addRecipePopup":
			clearAddRecipeForm();
			let addRecipe = document.getElementById("formRecipeWarn");
			while (addRecipe.hasChildNodes()) {
				addRecipe.lastElementChild.remove();
			}
			break;
	}
}

function hidePopupForm(id) {

	document.getElementById(id).style.display='none';

	// CLEAR FORM TEXTBOXES AND ERROR SECTION
	switch(id) {
		case "addAccountPopup":
			clearLoginForm();
			let warnsec = document.getElementById("logWarn");
			while (warnsec.hasChildNodes()) {
				warnsec.lastElementChild.remove();
			}
			break;
	}
}

/****************************************************
*   			  RAND FUNCTIONS					*
*****************************************************/

// RETURN TRUE IF STRING HAS WHITESPACES
function hasWhiteSpaces(string) {
	return /\s/g.test(string);
}

/****************************************************
*   			  CLEARING FORMS 					*
*****************************************************/

function clearLoginForm() {

	document.getElementById("usrnameField").value = "";
	document.getElementById("passField").value = "";
	document.getElementById("usrnameField").focus();
}

function clearCreateAcctForm() {

	document.getElementById("newUNField").value = "";
	document.getElementById("newPassField").value = "";
	document.getElementById("newUNField").focus();
}

function clearAddRecipeForm() {

	document.getElementById("recipeNameField").value = "";
	document.getElementById("recipeLinkField").value = "";
	document.getElementById("recipeNameField").focus();
}