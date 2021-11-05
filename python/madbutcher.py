##### IMPORTING #####
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
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
chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--headless')

driver = webdriver.Chrome(options=chrome_options, executable_path='C:/Users/Pwet/Downloads/chromedriver.exe')

##### DECLARING VARAIBLES #####
webpage = "https://madbutcher.co.nz/kahikatea-drive/"
shop_id = "3"
curr_page_number = 1
total_page_number = 1

### GET THE TOTAL NUMBER OF PAGES TO SCRAPE ###
# GET THE SITE THEN GET REQUEST
site = webpage+"?_paged=1"
driver.get(site)
page = driver.execute_script('return document.body.innerHTML')

# CREATE AN INSTANCE OF BEAUTIFULSOUP - THEN GET THE BODY OF THE SITE
soup = BeautifulSoup(''.join(page), 'html.parser')

# GET THE PAGE NUMBER CONTAINERS
lastpage_cont = soup.find('a', class_="facetwp-page last")
total_page_number = int(lastpage_cont.get_text())
# total_page_number = 1

### SCRAPE PER PAGE ###
# GET THE SITE THEN GET REQUEST
while curr_page_number <= total_page_number:

	print("PAGE NUMBER: " + str(curr_page_number))
	print("")
	print("")

	site =  webpage+"?_paged="+str(curr_page_number)
	driver.get(site)
	page = driver.execute_script('return document.body.innerHTML')

	# CREATE AN INSTANCE OF BEAUTIFULSOUP - THEN GET THE BODY OF THE SITE
	soup = BeautifulSoup(''.join(page), 'html.parser')
	soup_body = soup.find('div', class_='fwpl-layout el-i87o8t')

	# GET THE ALL THE PRODUCT CARDS - ALL PRODUCTS
	product_cards = soup_body.find_all('div', class_="fwpl-result")

	# FOR EVEY CARD (PRODUCT)
	for card in product_cards:

		# PREPARE THE SQL STATEMENT
		check_ingr = "SELECT `ShopIngrName` FROM `shopingr` WHERE `ShopIngrID`= %s AND `ShopID` = %s"
		add_shopingr = "INSERT INTO `shopingr`(`ShopIngrID`, `ShopID`, `ShopIngrName`, `ShopPrice`, `PriceMode`) VALUES (%s,%s,%s,%s,%s)"
		update_shopingr = "UPDATE `shopingr` SET `ShopIngrName`= %s,`ShopPrice`= %s,`PriceMode`= %s WHERE `ShopIngrID`= %s AND `ShopID` = %s"

		# GET PRODUCT INFO
		name_detail = card.find('div', class_="fwpl-item el-7rjwma ferry-road-product-title")
		card_details = card.find('div', class_="fwpl-item el-lf7cv5 ferry-road-product-price")

		product_name = name_detail.find('a').get_text()
		product_price = card_details.get_text()[1:]
		product_id = product_name.replace(" ", "")+"-MB"

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
		print("Product Price: " + product_price)
		print("")

	curr_page_number = curr_page_number + 1

cursor.close()
db.close()