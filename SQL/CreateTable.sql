CREATE TABLE Users (

	Username VARCHAR(50) PRIMARY KEY,
	HashPassword VARCHAR(500) NOT NULL
);

CREATE TABLE Recipes (

	RecipeName VARCHAR(500) PRIMARY KEY,
	Link VARCHAR(500),
	Username VARCHAR(50) NOT NULL,
	CONSTRAINT FK_Recipe_Username
		FOREIGN KEY(Username) 
		REFERENCES Users(Username)
);

CREATE TABLE Notes (

	NoteID INT AUTO_INCREMENT PRIMARY KEY,
	Note VARCHAR(2000),
	NoteDate DATE,
	RecipeName VARCHAR(500) NOT NULL,
	CONSTRAINT FK_Notes_RecipeName
		FOREIGN KEY(RecipeName) 
		REFERENCES Recipes(RecipeName)
);

CREATE TABLE Ingr (

	IngrID INT AUTO_INCREMENT PRIMARY KEY,
	IngrName VARCHAR(200) NOT NULL
);

CREATE TABLE Shop (

	ShopID INT AUTO_INCREMENT PRIMARY KEY,
	ShopName VARCHAR(200) NOT NULL,
	ShopAddy VARCHAR(500) NOT NULL
);

CREATE TABLE Step (
	
	StepNum INT NOT NULL,
	RecipeName VARCHAR(500) NOT NULL,
	Instruction VARCHAR(2000) NOT NULL,
	PRIMARY KEY(StepNum,RecipeName),
	CONSTRAINT FK_Step_RecipeName
		FOREIGN KEY(RecipeName) 
		REFERENCES Recipes(RecipeName)
);

CREATE TABLE RecipeHas (

	RecipeName VARCHAR(500) NOT NULL,
	IngrID INT NOT NULL,
	Quantity INT, 
	Label VARCHAR(50),
	PRIMARY KEY(RecipeName,IngrID)
);

CREATE TABLE SoldIn (

	IngrID INT NOT NULL,
	ShopID INT NOT NULL,
	Price INT,
	PRIMARY KEY(IngrID,ShopID)
);

