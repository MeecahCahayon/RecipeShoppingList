/******************** FOR PROCESSING LOGIN **********************/
/*						  										*/
/****************************************************************/

// CHECK IF USER INPUT MATCH DATA IN DB
function checklogin() {

	// GET USER INPUTS
	let username = $("#usrnameField").val().trim();
	let password = $("#passField").val().trim();

	// CHECK IF REQUIRED FIELDS ARE EMPTY
	if ((username.localeCompare("") != 0) && (password.localeCompare("") != 0)) {

		// AJAX REQUEST TO PROCCESS LOGIN
		const request = {
			url: 'includes/processLogin.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"usrnameField": username,
				"passField": password
			}
		};

		ajaxJquery(request, true, login);

	} else {
		login("-888");
	}
}

// DISPLAY RESULT OF PROCESS LOGIN (SUCCESS OR INVALID)
function login(response) {

	//IF WRONG USERNME OR PASSWORD
	if (response === "-888") {

		$("#logWarn").html("<p> Invalid Username or Password </p>");
		clearLoginForm();

	} else {

		// REDIRECT TO DASHBOARD PAGE
		window.location.replace("watchpage.php");
	}	
}

/******************** FOR CREATING ACCOUNT **********************/
/*						  										*/
/****************************************************************/

// CHECK NEW ACCOUNT INFO IF VALID
function checkActInfo() {
	
	// GET USER INPUTS
	let username = $("#newUNField").val().trim();
	let password = $("#newPassField").val().trim();

	// CHECK IF REQUIRED FIELDS ARE EMPTY
	if ((username.localeCompare("") != 0) && (password.localeCompare("") != 0)) {

		// CHECK IF USERNAME HAS WHITESPACES - IF SO DISPLAY ERROR
		if (hasWhiteSpaces(username)) { displayMsg_index("whitespace"); return; }

		// CHECK IF PASSWORD IS MORE THAT 5 LEN
		if (password.length > 5) {

			// CHECK IS PASS HASS ALL REQ ALPAHBET
			if (hasAllAlphabet(password)) {

				// AJAX REQUEST TO CHECK NEW LOGIN ACCOUNT
				const request = {
					url: 'includes/check/account.php',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					type: "POST",
					dataType: "json",
					data: {
						"usrnameField": username,
						"passField": password
					}
				};

				ajaxJquery(request, true, createAccount);

			} else { displayMsg_index("notAllAlphabet"); }
		} else { displayMsg_index("passlen"); }
	} else { displayMsg_index("reqEmpty"); }
}

// TRY CREATE ACCOUNT (CHECKS IF ACCOUNT ALREADY EXITS)
function createAccount(response) {

	// CHECK IF SUER IS TAKEN - IF SO DISPLAY ERROR
	if (response[0] === "usertaken") { displayMsg_index("usertaken"); return; }
	if (response[0] === "pass") {

		// AJAX REQUEST TO CREATE LOGIN
		const request = {
			url: 'includes/create/account.php',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			type: "POST",
			dataType: "",
			data: {
				"usrnameField": response[1],
				"passField": response[2]
			}
		};

		ajaxJquery(request, true, displayMsg_index);
	}
}

/************************** FUNTIONS ****************************/
/*						  										*/
/****************************************************************/

// DISPLAYS ERROR TO THE USER
function displayMsg_index(msg) {

	let warnNewAcct = $("#formAcntWarn");

	switch(msg) {
		case "reqEmpty":
			warnNewAcct.html("<p> Username and Password are required </p>");
			break;
		case "whitespace":
			warnNewAcct.html("<p> Username cannot have whitespaces </p>");
			break;
		case "passlen":
			warnNewAcct.html("<p> Length of the password must be more than 5 </p>");
			break;
		case "notAllAlphabet":
			warnNewAcct.html("<p> Password must have atleast one of each: </p><p>Uppercase</p><p>Lowercase</p><p>Numeric</p>");
			break;
		case "usertaken":
			warnNewAcct.html("<p> The username is already taken </p>");
			break;
		case "pass":
			hidePopupForm('#addAccountPopup');
			$("#logWarn").html("<p class='successMsg'> Your Account has been created </p>");
			break;
	}

	clearCreateAcctForm();
}

// CHECKS IF PASSWORD HAS ALL THE PASSWORD ALPHABET
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
