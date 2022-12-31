#!/bin/bash
sleep 5
python manage.py makemigrations account
python manage.py migrate
python manage.py collectstatic --noinput
uwsgi --socket :8001 --module config.wsgi
