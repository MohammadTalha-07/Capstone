import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

class Restoration(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://127.0.0.1:3000/restoration_booking") 

    def test_submit_restoration_form(self):
        # Name Field Population
        name_input = self.driver.find_element(By.ID, "name")
        email_input = self.driver.find_element(By.ID, "email")
        phone_input = self.driver.find_element(By.ID, "phone")
        brand_input = self.driver.find_element(By.ID, "carBrand")
        submit_button = self.driver.find_element(By.CSS_SELECTOR, "input[type='submit']")

        name_input.send_keys("Mohhamad Talha")
        time.sleep(2)
        email_input.send_keys("mjan8203@conestogac.on.ca")
        time.sleep(2)
        phone_input.send_keys("1234567890")
        time.sleep(2)
        brand_input.send_keys("conestogac.on.ca")
        time.sleep(2)

        # Submit the form
        self.driver.execute_script("arguments[0].click();", submit_button)
        time.sleep(2)

    def tearDown(self):
        time.sleep(2)
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
