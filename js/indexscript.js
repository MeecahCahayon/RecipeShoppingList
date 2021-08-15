/****************************************************
*   			FOR PROCESSING LOGIN				*
*****************************************************/

// CHECK IF USER INPUT MATCH DATA IN DB
function checklogin() {

	// GET USER INPUTS
	let username = document.getElementById("usrnameField").value.trim();
	let password = document.getElementById("passField").value.trim();

	// CHECK IF REQUIRED FIELDS ARE EMPTY
	if ((username.localeCompare("") != 0) && (password.localeCompare("") != 0)) {

		// AJAX REQUEST TO PROCCESS LOGIN
		let url = "includes/processLogin.php";
		let data = "usrnameField=" + username + "&passField=" + password;
		ajaxRequest(url, "POST", data, login, false);
	} else {
		login("-888");
	}
}

// DISPLAY RESULT OF PROCESS LOGIN (SUCCESS OR INVALID)
function login(response) {

	//IF WRONG USERNME OR PASSWORD
	if (response === "-888") {
		
		let container = document.getElementById("logWarn");
		container.innerHTML = "<p> Invalid Username or Password </p>";
		clearLoginForm();

	} else {

		// REDIRECT TO DASHBOARD PAGE
		window.location.replace("dashboardpage.php");
	}	
}

/****************************************************
*   			FOR CREATING ACCOUNT				*
*****************************************************/

// CHECK NEW ACCOUNT INFO IF VALID
function checkActInfo() {
	
	// GET USER INPUTS
	let username = document.getElementById("newUNField").value.trim();
	let password = document.getElementById("newPassField").value.trim();

	// CHECK IF REQUIRED FIELDS ARE EMPTY
	if ((username.localeCompare("") != 0) && (password.localeCompare("") != 0)) {

		// CHECK IF USERNAME HAS WHITESPACES - IF SO DISPLAY ERROR
		if (hasWhiteSpaces(username)) { displayMsg_index("whitespace"); return; }

		// CHECK IF PASSWORD IS MORE THAT 5 LEN
		if (password.length > 5) {

			if (hasAllAlphabet(password)) {

				// AJAX REQUEST TO PROCCESS LOGIN
				let url = "includes/check/account.php";
				let data = "usrnameField=" + username + "&passField=" + password;
				ajaxRequest(url, "POST", data, createAccount, true);

			} else { displayMsg_index("notAllAlphabet"); }
		} else { displayMsg_index("passlen"); }
	} else { displayMsg_index("reqEmpty"); }
}

// TRY CREATE ACCOUNT (CHECKS IF ACCOUNT ALREADY EXITS)
function createAccount(response) {

	if (response[0] === "usertaken") { displayMsg_index("usertaken"); }
	if (response[0] === "pass") {


		// AJAX REQUEST TO PROCCESS LOGIN
		let url = "includes/create/account.php";
		let data = "usrnameField=" + response[1] + "&passField=" + response[2];
		ajaxRequest(url, "POST", data, displayMsg_index, false);
	}
}

// DISPLAYS ERROR TO THE USER
function displayMsg_index(msg) {

	let warnNewAcct = document.getElementById("formAcntWarn");

	switch(msg) {
		case "reqEmpty":
			warnNewAcct.innerHTML = "<p> Username and Password are required </p>";
			break;
		case "whitespace":
			warnNewAcct.innerHTML = "<p> Username cannot have whitespaces </p>";
			break;
		case "passlen":
			warnNewAcct.innerHTML = "<p> Length of the password must be more than 5 </p>";
			break;
		case "notAllAlphabet":
			warnNewAcct.innerHTML = "<p> Password must have atleast one of each: </p> <p>Uppercase</p><p>Lowercase</p><p>Numeric</p>";
			break;
		case "usertaken":
			warnNewAcct.innerHTML = "<p> The username is already taken </p>";
			break;
		case "pass":
			hidePopupForm("addAccountPopup");
			let warnLogIn = document.getElementById("logWarn");
			warnLogIn.innerHTML = "<p class='successMsg'> Your Account has been created </p>";
			break;
	}

	clearCreateAcctForm();
}

function hasAllAlphabet(password) {

	// DECLARE VARIABLES
	const passLetters = password.split("");
	let upper = false;
	let lower = false;
	let digit = false;

	for (var i = 0; i < passLetters.length; i++) {

		// CHECK IF ITS A NUMERIC OR NOT - IF ITS A LETTER
		if (isNaN(passLetters[i])) {

			if (passLetters[i] == passLetters[i].toUpperCase()) { upper = true; }
			if (passLetters[i] == passLetters[i].toLowerCase()) { lower = true; }

		} 
		// IF ITS NUMERIC
		else { digit = true; }
	}

	return upper&&lower&&digit;
}
