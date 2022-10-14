# 🐳 Docker Compose prod
build: CMD=build --pull --force-rm --no-cache
up: CMD=up -d
stop: CMD=stop
down: CMD=down

build up stop down:
	@docker-compose $(CMD)

rebuild:
	make build
	make down
	make up

restart:
	make stop
	make destroy
	make up

# MONGO
up_mongo: 
		@docker-compose -f ./mongo/docker-compose.yml up -d
down_mongo: 
		@docker-compose -f ./mongo/docker-compose.yml down

# Dev infrastructure
up_i:
	make up_rmq
	make up_mongo
	make up_redis

down_i:
	make down_rmq
	make down_mongo
	make down_redis