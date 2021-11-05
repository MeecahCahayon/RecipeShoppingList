##### IMPORTING #####
from bs4 import BeautifulSoup
from decimal import Decimal
import requests
import json
import mysql.connector as mysql

db = mysql.connect(
	user = 'root',
	password = '',
	host = 'localhost',
	database = 'foodpricespy',
	port = '3306'
)

cursor = db.cursor()

##### DECLARING VARAIBLES #####
webpage = "https://www.thewarehouse.co.nz/c/"
shop_id = "4"
webpages_categories = []
num_of_prod = 100;

# ADD PAKNSAVE CATEGORIES
webpages_categories.append("halloween")
webpages_categories.append("christmas")
webpages_categories.append("home-garden")
webpages_categories.append("toys-baby")
webpages_categories.append("health-beauty")
webpages_categories.append("food-pets-household")

##### SCRAPE PER CATEGORY #####
# FOR EVERY CATEGORIES
for category in webpages_categories:

	### GET THE TOTAL NUMBER OF PRODUCTS TO SCRAPE ###
	# GET THE SITE THEN GET REQUEST
	site = webpage+category+"?sz=64"
	page = requests.get(site)

	# IF REQUEST IS SUCCESS
	if page.status_code == 200:

		# CREATE AN INSTANCE OF BEAUTIFULSOUP - THEN GET THE BODY OF THE SITE
		soup = BeautifulSoup(page.content, 'html.parser')
		soup_body = soup.find('body')

		# GET THE NUMBER OF PRODUCTS
		pagenumber_cont = soup_body.find('div', class_="result-count")
		lastpage_cont = pagenumber_cont.find('p', class_="mb-0").getText().strip(" Result").replace(",", "")
		num_of_prod = int(lastpage_cont.strip())
		# num_of_prod = 30

		### SCRAPE THE WHOLE PAGE ###
		# GET THE SITE THEN GET REQUEST
		print("PAGE CATEGORY: " + category)
		print("")
		print("")

		site = webpage+category+"?sz="+str(num_of_prod)
		page = requests.get(site)

		# IF REQUEST IS SUCCESS
		if page.status_code == 200:

			# CREATE AN INSTANCE OF BEAUTIFULSOUP - THEN GET THE BODY OF THE SITE
			soup = BeautifulSoup(page.content, 'html.parser')
			soup_body = soup.find('div', class_="product-grid")

			# GET THE ALL THE PRODUCT CARDS - ALL PRODUCTS
			product_cards = soup_body.find_all('div', class_="product-tile")

			# FOR EVEY CARD (PRODUCT)
			for card in product_cards:

				# PREPARE THE SQL STATEMENT
				check_ingr = "SELECT `ShopIngrName` FROM `shopingr` WHERE `ShopIngrID`= %s AND `ShopID` = %s"
				add_shopingr = "INSERT INTO `shopingr`(`ShopIngrID`, `ShopID`, `ShopIngrName`, `ShopPrice`, `PriceMode`) VALUES (%s,%s,%s,%s,%s)"
				update_shopingr = "UPDATE `shopingr` SET `ShopIngrName`= %s,`ShopPrice`= %s,`PriceMode`= %s WHERE `ShopIngrID`= %s AND `ShopID` = %s"

				# GET PRODUCT INFO
				product_info = json.loads(card['data-gtm-product'])

				product_id = product_info['id'].strip()
				product_name = product_info['name'].strip()
				product_price = product_info['price'].strip()

				# CHECK IF ITS IN THE DATABASE
				q_ingr_id = (product_id, shop_id)
				cursor.execute(check_ingr, q_ingr_id)
				check_result = cursor.fetchone()

				# IF ITS NOT - ADD TO THE DATABASE
				if check_result == None:
					q_ingr_details = (product_id, int(shop_id), product_name, product_price, "ea")
					cursor.execute(add_shopingr, q_ingr_details)
					db.commit()
				# ELSE UPDATE PRODUCT DETAILS
				else:
					print(check_result)

					q_ingr_details = (product_name, product_price, "ea", product_id, shop_id)
					cursor.execute(update_shopingr, q_ingr_details)
					db.commit()

				print("ID: " + product_id)
				print("Product Name: " + product_name)
				print("Price Mode: " + product_price)
				print("")
				print("")

cursor.close()
db.close()