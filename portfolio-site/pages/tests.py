from django.test import TestCase


class HomePageTests(TestCase):
    def test_home_page_loads(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_contact_links_present(self):
        html = self.client.get("/").content.decode()
        self.assertIn("https://github.com/smarika712", html)
        self.assertIn("https://www.linkedin.com/in/smarika-thapa-970966319/", html)
        self.assertIn("mailto:smarikathapa129@gmail.com", html)