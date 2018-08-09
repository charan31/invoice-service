
 MYSQL_HOST=`docker-machine ip default`

# ---------- Release Agent ----------
#Server statup: createApp should create an express app
build:
	docker build -t charan/invoice-service .
	docker run --env-file ./docker_dev_env --name=my-dev-mysql -p 5208:3306 -d mysql:5.7
	sleep 10
	docker run -t --env-file ./docker_dev_env  --net=host --name=invoice-service-dev -e NODE_ENV=development -e MYSQL_HOST=localhost charan/invoice-service