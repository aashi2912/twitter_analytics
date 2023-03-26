# Setup Django Application

Create a new virtual environment:

### `python3 -m venv .venv`

Activate the virtual environment:

### `source .venv/bin/activate`

Install the required packages:

### `pip install -r requirements.txt`

Apply the database migrations:

### `python manage.py migrate`

Start the development server:

This will run the development server on http://localhost:8000/

Open your web browser and navigate to [http://localhost:8000/](http://localhost:8000/)

You should see the default Django welcome page. You can now start building your Django project.

### `python manage.py runserver`
