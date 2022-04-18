# Instructions to run
Open five terminals.
### Terminal 1 (redis)
```
redis-server
```
### Terminal 2 (rabbitmq)
```
brew services run rabbitmq
```

### Terminal 3 (celery)
```
cd backend
pipenv shell
celery -A app.celery worker --loglevel=info
```

### Terminal 4 (backend)
```
cd backend
pipenv run flask run
```

### Terminal 5
```
cd frontend
yarn start
```