CREATE TABLE User (

	Username VARCHAR(50) PRIMARY KEY,
	MasterPass VARCHAR(500) NOT NULL
);

CREATE TABLE Shop (

	ShopID INT AUTO_INCREMENT PRIMARY KEY,
	ShopName VARCHAR(200) NOT NULL,
	ShopAddy VARCHAR(500) NOT NULL,
	ShopColor VARCHAR(20) NOT NULL,
	ShopLogo VARCHAR(1000) NOT NULL
);

CREATE TABLE ShopIngr (

	ShopIngrID VARCHAR(50) NOT NULL,
	ShopID INT NOT NULL,
	ShopIngrName VARCHAR(200) NOT NULL,
	ShopPrice DECIMAL(10,2) NOT NULL,
	PriceMode VARCHAR(50),
	BaseUnitPrice VARCHAR(100),
	MultiBasePrice VARCHAR(100),
	MultiPrice DECIMAL(10,2),
	MultiQuantity INT,
	PRIMARY KEY(ShopIngrID,ShopID),
	CONSTRAINT FK_ShopIngr_ShopID
		FOREIGN KEY(ShopID) 
		REFERENCES Shop(ShopID)
);

CREATE TABLE Recipe (

	RecipeName VARCHAR(500) NOT NULL,
	Username VARCHAR(50) NOT NULL,
	Link VARCHAR(500),
	OnMenu boolean NOT NULL,
	PRIMARY KEY(RecipeName,Username),
	CONSTRAINT FK_Recipe_Username
		FOREIGN KEY(Username) 
		REFERENCES User(Username)
);

CREATE TABLE Step (

	StepNum INT AUTO_INCREMENT NOT NULL,
	Username VARCHAR(50) NOT NULL,
	RecipeName VARCHAR(500) NOT NULL,
	Instruction VARCHAR(2000) NOT NULL,
	PRIMARY KEY(StepNum,Username,RecipeName),
	-- CONSTRAINT FK_Step_Username
	-- 	FOREIGN KEY(Username) 
	-- 	REFERENCES User(Username),
	CONSTRAINT FK_Step_Recipe
		FOREIGN KEY(Username,RecipeName) 
		REFERENCES Recipe(Username,RecipeName)
);

CREATE TABLE UserIngr (

	UserIngrName VARCHAR(200) NOT NULL,
	Username VARCHAR(50) NOT NULL,
	OnWatch boolean NOT NULL,
	PRIMARY KEY(UserIngrName,Username),
	CONSTRAINT FK_UserIngr_Username
		FOREIGN KEY(Username) 
		REFERENCES User(Username)
);


CREATE TABLE CorrIngr (

	Username VARCHAR(50) NOT NULL,
	UserIngrName VARCHAR(200) NOT NULL,
	ShopID INT NOT NULL,
	ShopIngrID VARCHAR(50) NOT NULL,
	PRIMARY KEY(Username,UserIngrName,ShopID),
	-- CONSTRAINT FK_CorrIngr_Username
	-- 	FOREIGN KEY(Username) 
	-- 	REFERENCES User(Username),
	CONSTRAINT FK_CorrIngr_UserIngr
		FOREIGN KEY(Username,UserIngrName) 
		REFERENCES UserIngr(Username,UserIngrName),
	-- CONSTRAINT FK_CorrIngr_ShopID
	-- 	FOREIGN KEY(ShopID) 
	-- 	REFERENCES Shop(ShopID),
	CONSTRAINT FK_CorrIngr_ShopIngr
		FOREIGN KEY(ShopID,ShopIngrID) 
		REFERENCES ShopIngr(ShopID,ShopIngrID)
);

CREATE TABLE Note (

	NoteID INT AUTO_INCREMENT PRIMARY KEY,
	Note VARCHAR(2000),
	NoteDate DATE,
	Username VARCHAR(50) NOT NULL,
	RecipeName VARCHAR(500) NOT NULL,
	-- CONSTRAINT FK_Note_Username
	-- 	FOREIGN KEY(Username) 
	-- 	REFERENCES User(Username),
	CONSTRAINT FK_Note_Recipe
		FOREIGN KEY(Username,RecipeName) 
		REFERENCES Recipe(Username,RecipeName)
);

CREATE TABLE RecipeHasIngr (

	Username VARCHAR(50) NOT NULL,
	RecipeName VARCHAR(500) NOT NULL,
	UserIngrName VARCHAR(200) NOT NULL,
	PRIMARY KEY(Username,RecipeName,UserIngrName),
	CONSTRAINT FK_RecipeHasIngr_RecipeName
		FOREIGN KEY(RecipeName) 
		REFERENCES Recipe(RecipeName),
	CONSTRAINT FK_RecipeHasIngr_UserIngrName
		FOREIGN KEY(UserIngrName, Username) 
		REFERENCES UserIngr(UserIngrName, Username)
);