release: python backend.manage.py migrate
web: gunicorn backend.backend_manager.wsgi --log-file - 