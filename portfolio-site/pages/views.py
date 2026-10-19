from django.shortcuts import render

GITHUB_URL = "https://github.com/smarika712"
LINKEDIN_URL = "https://www.linkedin.com/in/smarika-thapa-970966319/"
EMAIL = "smarikathapa129@gmail.com"


def index(request):
    context = {
        "name": "Smarika Thapa",
        "github_url": GITHUB_URL,
        "linkedin_url": LINKEDIN_URL,
        "email": EMAIL,
        "skills": [
            "Python", "Django", "HTML", "CSS", "Bootstrap 5",
            "JavaScript", "SQL", "PostgreSQL", "SQLite", "Git and GitHub",
        ],
        "projects": [
            {
                "title": "Bazaario",
                "description": (
                    "Bazaario is a web-based e-commerce application built with Django. "
                    "It includes product browsing, product search, a shopping cart, "
                    "a wishlist, and a checkout process."
                ),
                "tech": ["Python", "Django", "HTML", "CSS", "Bootstrap 5",
                         "JavaScript", "PostgreSQL/SQLite"],
                # Add the real repository URL here when you have it, e.g. "https://github.com/..."
                "github_url": None,
            },
            {
                "title": "Personal Portfolio",
                "description": (
                    "A responsive personal portfolio website built using Django, "
                    "HTML, CSS, Bootstrap, and JavaScript."
                ),
                "tech": ["Python", "Django", "HTML", "CSS", "Bootstrap 5", "JavaScript"],
                "github_url": GITHUB_URL,
            },
        ],
    }
    return render(request, "pages/index.html", context)