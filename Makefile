RUN_NODE = docker-compose run --rm node
.PHONY: watch
watch:
	${RUN_NODE} npx webpack --mode=development --config=webpack.config.js --watch

.PHONY: build
build:
	${RUN_NODE} npx webpack --mode=production --config=webpack.config.js

.PHONY: install
install:
	cp config/config.yaml.dist config/config.yaml
	${RUN_NODE} npm install

.PHONY: start
start:
	${RUN_NODE} npm start

.PHONY: sh
sh:
	${RUN_NODE} sh

#
# Use to deploy your container
# make deploy-on-docker GITHUB_USERNAME=bob GITHUB_TOKEN=xxxxx DOCKER_REPOSITORY=user/repository/image_name:version
.PHONY: deploy
deploy-on-docker:
	$(MAKE) build
	echo ${GITHUB_TOKEN} | docker login https://docker.pkg.github.com -u ${GITHUB_USERNAME} --password-stdin
	docker build . -f docker/node/Dockerfile -t ${DOCKER_REPOSITORY} --target=prod
	docker push ${DOCKER_REPOSITORY}

