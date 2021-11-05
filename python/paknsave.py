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
webpage = "https://www.paknsave.co.nz/shop/category/"
shop_id = "1"
webpages_categories = []
curr_page_number = 1
total_page_number = 1

# ADD PAKNSAVE CATEGORIES
webpages_categories.append("fresh-foods-and-bakery")
webpages_categories.append("chilled-frozen-and-desserts")
webpages_categories.append("pantry")
webpages_categories.append("drinks")
webpages_categories.append("beer-cider-and-wine")
webpages_categories.append("personal-care")
webpages_categories.append("baby-toddler-and-kids")
webpages_categories.append("pets")
webpages_categories.append("kitchen-dining-and-household")

##### SCRAPE PER CATEGORY #####

# FOR EVERY CATEGORIES
for category in webpages_categories:

	### GET THE TOTAL NUMBER OF PAGES TO SCRAPE ###
	# GET THE SITE THEN GET REQUEST
	curr_page_number = 1
	site = webpage+category+"?pg=1"
	page = requests.get(site)

	# IF REQUEST IS SUCCESS
	if page.status_code == 200:

		# CREATE AN INSTANCE OF BEAUTIFULSOUP - THEN GET THE BODY OF THE SITE
		soup = BeautifulSoup(page.content, 'html.parser')
		soup_body = soup.find('body')

		# GET THE PAGE NUMBER CONTAINERS
		pagenumber_cont = soup_body.find_all('li', class_="fs-pagination__item")
		lastpage_cont = pagenumber_cont[len(pagenumber_cont)-2].select('li > a')[0].get_text()
		total_page_number = int(lastpage_cont.strip())
		# total_page_number = 1

	### SCRAPE PER PAGE ###
	# GET THE SITE THEN GET REQUEST
	while curr_page_number <= total_page_number:

		print("PAGE NUMBER: " + str(curr_page_number))
		print("")
		print("")

		site = webpage+category+"?pg="+str(curr_page_number)
		page = requests.get(site)

		# IF REQUEST IS SUCCESS
		if page.status_code == 200:

			# CREATE AN INSTANCE OF BEAUTIFULSOUP - THEN GET THE BODY OF THE SITE
			soup = BeautifulSoup(page.content, 'html.parser')
			soup_body = soup.find('body')

			# GET THE ALL THE PRODUCT CARDS - ALL PRODUCTS
			product_cards = soup_body.find_all('div', class_="fs-product-card")

			# FOR EVEY CARD (PRODUCT)
			for card in product_cards:

				# PREPARE THE SQL STATEMENT
				check_ingr = "SELECT `ShopIngrName` FROM `shopingr` WHERE `ShopIngrID`= %s AND `ShopID` = %s"
				add_shopingr = "INSERT INTO `shopingr`(`ShopIngrID`, `ShopID`, `ShopIngrName`, `ShopPrice`, `PriceMode`, `BaseUnitPrice`, `MultiBasePrice`, `MultiPrice`, `MultiQuantity`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
				update_shopingr = "UPDATE `shopingr` SET `ShopIngrName`= %s,`ShopPrice`= %s,`PriceMode`= %s,`BaseUnitPrice`= %s,`MultiBasePrice`= %s,`MultiPrice`= %s,`MultiQuantity`= %s  WHERE `ShopIngrID`= %s AND `ShopID` = %s"

				# GET PRODUCT INFO
				name_detail = card.find('div', class_="fs-product-card__description")
				card_details = card.find('div', class_="js-product-card-footer fs-product-card__footer-container")
				product_info = json.loads(card_details['data-options'])

				product_id = product_info['productId'].strip()
				product_subname = name_detail.find('p', class_="u-color-half-dark-grey u-p3").get_text().strip().replace("\n", " ")
				product_name = product_info['productName'].strip() + " (" + product_subname + ")"

				if product_subname == None:
					product_name = product_info['productName'].strip()

				# GET PRODUCT PRICE
				product_price_info = product_info['ProductDetails']

				product_price = product_price_info['PricePerItem'].strip()
				product_priceMode = product_price_info['PriceMode'].strip()
				product_price_baseUnit = product_price_info['PricePerBaseUnitText'].strip()
				product_multi_basePrice = product_price_info['MultiBuyBasePrice'].strip()
				product_multi_Price = product_price_info['MultiBuyPrice'].strip()
				product_multi_Quantity = product_price_info['MultiBuyQuantity'].strip()

				# CHECK IF ITS IN THE DATABASE
				q_ingr_id = (product_id, shop_id)
				cursor.execute(check_ingr, q_ingr_id)
				check_result = cursor.fetchone()

				# IF ITS NOT - ADD TO THE DATABASE
				if check_result == None:
					q_ingr_details = (product_id, int(shop_id), product_name, product_price, product_priceMode, product_price_baseUnit, product_multi_basePrice, product_multi_Price, product_multi_Quantity)
					cursor.execute(add_shopingr, q_ingr_details)
					db.commit()
				# ELSE UPDATE PRODUCT DETAILS
				else:
					print(check_result)

					q_ingr_details = (product_name, product_price, product_priceMode, product_price_baseUnit, product_multi_basePrice, product_multi_Price, product_multi_Quantity, product_id, shop_id)
					cursor.execute(update_shopingr, q_ingr_details)
					db.commit()

				print("ID: " + product_id)
				print("Product Name: " + product_name)
				print("Price Mode: " + product_priceMode)
				print("Product Price: " + product_price)
				print("Price per base unit: " + product_price_baseUnit)
				print("Multi Base Price: " + product_multi_basePrice)
				print("Multi Price: " + product_multi_Price)
				print("Multi Quantity: " + product_multi_Quantity)
				print("")
				print("")

		curr_page_number = curr_page_number + 1

cursor.close()
db.close()