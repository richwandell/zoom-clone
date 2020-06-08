#!/bin/bash

if [ "$RUN_MODE" == "app" ]; then
  exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
elif [ "$RUN_MODE" == "test" ]; then
  pipenv run pytest \
    --cov=app \
    --cov-report=term \
    tests/
elif [ "$RUN_MODE" == "db_migrate" ]; then
  pipenv run flask db upgrade
fi