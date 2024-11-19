dev:
	docker-compose -f docker-compose.dev.yml up -d

start:
	docker pull frymarshall/fmorpion_api && docker compose -f docker-compose.prod.yml up -d

deploy:
	docker build -t fmorpion_api -f Dockerfile . && docker tag fmorpion_api frymarshall/fmorpion_api:latest && docker push frymarshall/fmorpion_api:latest 

compile: 
	npx tsc

migrate: 
	npm run migrate

test: 
	npm run test
