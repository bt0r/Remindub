# Load .env file
include .env
export

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

.PHONY: lint
lint:
	${RUN_NODE} npx eslint --fix src/ --ext .ts
#
# Use to deploy your container
#
.PHONY: deploy
deploy-on-docker:
	$(MAKE) build
	echo ${DOCKER_PASSWORD} | docker login https://${DOCKER_REGISTRY} -u ${DOCKER_USERNAME} --password-stdin
	docker build . -f docker/node/Dockerfile -t ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_REPOSITORY_VERSION} --target=prod
	docker push ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_REPOSITORY_VERSION}

