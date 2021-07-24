
build-base-docker:
	node scripts/build-base-docker.js

run-mysql-service:
	node scripts/run-mysql-service.js

attach-mysql-shell:
	docker exec -it mysql.opassword.service /bin/bash

build-docker:
	docker build -t opassword-server:latest .

attach-www-shell:
	docker exec -it www.opassword.service /bin/sh


run-server:
	docker stop www.opassword.service 2>&1 > /dev/null || echo "stop"
	docker rm www.opassword.service 2>&1 > /dev/null || echo "clean"
	docker run \
		--name www.opassword.service \
		--link mysql.opassword.service \
		--env "VIRTUAL_HOST=opassword.word-collect.com" \
		--env "VIRTUAL_PORT=3000" \
		--env "LETSENCRYPT_HOST=opassword.word-collect.com" \
		--env "LETSENCRYPT_EMAIL=zhenguolin@me.com" \
		-d \
		opassword-server:latest
