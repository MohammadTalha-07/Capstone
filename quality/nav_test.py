# import unittest
# import time
# from selenium import webdriver
# from selenium.webdriver.common.by import By

# class Nav(unittest.TestCase):
#     def setUp(self):
#         self.driver = webdriver.Chrome()
#         self.driver.get("http://127.0.0.1:3000/")  

#     def home_nav(self):
#         nav_services_link = self.driver.find_element(By.ID, "nav_services")
#         time.sleep(5)
#         self.driver.execute_script("arguments[0].click();", nav_services_link)
#         time.sleep(5)

        
        


import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

class TestWebsiteNavigation(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://127.0.0.1:3000/")  

    def test_works_navigation(self):
        nav_services_link = self.driver.find_element(By.ID, "nav_services")
        time.sleep(5)
        self.driver.execute_script("arguments[0].click();", nav_services_link)
        time.sleep(5)

    def test_contact_navigation(self):
        nav_contact_link = self.driver.find_element(By.ID, "nav_contact")
        self.driver.execute_script("arguments[0].click();", nav_contact_link)
        time.sleep(5)

    def test_about_navigation(self):
        nav_Login_link = self.driver.find_element(By.ID, "nav_Login")
        self.driver.execute_script("arguments[0].click();", nav_Login_link)
        time.sleep(5)
        self.driver.quit()

    
        

if __name__ == "__main__":
    unittest.main()
