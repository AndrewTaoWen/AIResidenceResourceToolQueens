# Security deployment changes

Set DJANGO_SECRET_KEY to a new random secret; previously signed sessions must be invalidated. Set DJANGO_ALLOWED_HOSTS to the deployed hostname list. Debug is off by default; set DJANGO_DEBUG=true only for local development.
