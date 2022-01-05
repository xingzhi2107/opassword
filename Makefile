build-dev-env-image:
	docker build -t opass-env:latest .


run-start-dev-env:
	docker start opass-env 2>&1 > /dev/null || docker run \
		--name opass-env \
		-v `pwd`:/usr/src/app \
		-it \
		opass-env:latest /bin/sh

