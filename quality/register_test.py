# import unittest
# import time
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.action_chains import ActionChains

# class Register(unittest.TestCase):
#     def setUp(self):
#         self.driver = webdriver.Chrome()
#         self.driver.get("http://127.0.0.1:3000/register") 

        
# def submit_registration(self):
#         # Name Field Population
#         username_input = self.driver.find_element(By.ID, "username")
#         # password_input = self.driver.find_element(By.ID, "password")
#         # phone_input = self.driver.find_element(By.ID, "phone")
#         # submit_button = self.driver.find_element(By.CSS_SELECTOR, "input[type='submit']")

#         username_input.send_keys("mjan8203@conestogac.on.ca")
#         # time.sleep(2)
#         # password_input.send_keys("123")
#         # time.sleep(2)
#         # phone_input.send_keys("1234567890")
#         # time.sleep(2)
        

#         # Submit the form
#         self.driver.execute_script("arguments[0].click();", submit_button)
#         time.sleep(2)

# def tearDown(self):
#         time.sleep(2)
#         self.driver.quit()

# if __name__ == "__main__":
#     unittest.main()



import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

class Restoration(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://127.0.0.1:3000/register") 

    def test_submit_restoration_form(self):
        # Name Field Population
        username_input = self.driver.find_element(By.ID, "username")
        password = self.driver.find_element(By.ID, "password")
        phone_input = self.driver.find_element(By.ID, "phone")
        submit_button = self.driver.find_element(By.CSS_SELECTOR, "input[type='submit']")

        username_input.send_keys("mjan8203@conestogac.on.ca")
        time.sleep(2)
        password.send_keys("mjan8203@conestogac.on.ca")
        time.sleep(2)
        phone_input.send_keys("1234567890")
        time.sleep(2)

        # Submit the form
        self.driver.execute_script("arguments[0].click();", submit_button)
        time.sleep(2)

    def tearDown(self):
        time.sleep(2)
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
