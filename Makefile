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