#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

#djangorestframework
#django-cors-headers
#djangorestframework
#django
#npm
# npm install -g create-react-app
#npm을 이용한 방법
# yarn global add create-react-app
#yarn을 이용한 방법
# create-react-app frontend
# cd frontend
# yarn start
#Both daemons have to open

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoProject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
