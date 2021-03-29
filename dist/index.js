/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/Config.ts":
/*!******************************!*\
  !*** ./src/config/Config.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Config = void 0;\nconst yaml = __importStar(__webpack_require__(/*! js-yaml */ \"js-yaml\"));\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nclass Config {\n    constructor() {\n        this.parameters = yaml.load(fs.readFileSync(__dirname + \"/../config/config.yaml\", 'utf8'));\n    }\n}\nexports.Config = Config;\n\n\n//# sourceURL=webpack://remindub/./src/config/Config.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst node_schedule_1 = __webpack_require__(/*! node-schedule */ \"node-schedule\");\nconst Github_1 = __webpack_require__(/*! ./repository/Github */ \"./src/repository/Github.ts\");\nconst Config_1 = __webpack_require__(/*! ./config/Config */ \"./src/config/Config.ts\");\nconst logger_1 = __webpack_require__(/*! ./logger/logger */ \"./src/logger/logger.ts\");\nconst Discord_1 = __webpack_require__(/*! ./repository/Discord */ \"./src/repository/Discord.ts\");\nconst dayjs_1 = __importDefault(__webpack_require__(/*! dayjs */ \"dayjs\"));\nconst config = new Config_1.Config();\nconst github = new Github_1.Github();\nconst discordClient = new Discord_1.DiscordClient();\nconfig.parameters.settings.users.map((user) => __awaiter(void 0, void 0, void 0, function* () {\n    const githubUsername = yield github.getUsername(user.github_token);\n    user.scheduled_notifications.map((scheduled_notification) => __awaiter(void 0, void 0, void 0, function* () {\n        // Instantiate schedules\n        node_schedule_1.scheduleJob(scheduled_notification, function () {\n            return __awaiter(this, void 0, void 0, function* () {\n                const notifyOnDays = config.parameters.settings.notify_on_days;\n                if (!notifyOnDays.includes(dayjs_1.default().format('ddd'))) {\n                    logger_1.logger.info(`Bypassing notification for today.`);\n                    return;\n                }\n                logger_1.logger.info(`Scheduled job triggered: ${scheduled_notification}`);\n                let pullRequests = [];\n                for (let i = 0; i < user.repositories.length; i++) {\n                    const repository = user.repositories[i];\n                    const pullRequestsWaitingForReview = yield github.getPullRequestsWaitingForReview(repository, githubUsername, user.github_token);\n                    if (pullRequestsWaitingForReview.length > 0) {\n                        pullRequests = pullRequests.concat(pullRequestsWaitingForReview);\n                    }\n                }\n                if (pullRequests.length > 0) {\n                    logger_1.logger.info(`Sending reminder to ${logger_1.userDescription(user.discord_id, githubUsername)}`);\n                    pullRequests.map(pullRequest => discordClient.sendMessage(user.discord_id, githubUsername, pullRequest));\n                }\n            });\n        });\n    }));\n}));\n\n\n//# sourceURL=webpack://remindub/./src/index.ts?");

/***/ }),

/***/ "./src/logger/logger.ts":
/*!******************************!*\
  !*** ./src/logger/logger.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.userDescription = exports.logger = void 0;\nconst winston_1 = __importDefault(__webpack_require__(/*! winston */ \"winston\"));\nexports.logger = winston_1.default.createLogger({\n    level:  false ? 0 : 'debug',\n    format: winston_1.default.format.json(),\n    defaultMeta: { service: 'github-reminder' },\n    transports: [\n        new winston_1.default.transports.Console(),\n    ],\n});\nconst userDescription = (discordId, githubUsername) => {\n    return `[Discord: ${discordId}, Github: ${githubUsername}]`;\n};\nexports.userDescription = userDescription;\n\n\n//# sourceURL=webpack://remindub/./src/logger/logger.ts?");

/***/ }),

/***/ "./src/model/ReminderMessage.ts":
/*!**************************************!*\
  !*** ./src/model/ReminderMessage.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ReminderMessage = void 0;\nconst discord_js_1 = __webpack_require__(/*! discord.js */ \"discord.js\");\nconst dayjs_1 = __importDefault(__webpack_require__(/*! dayjs */ \"dayjs\"));\nconst Config_1 = __webpack_require__(/*! ../config/Config */ \"./src/config/Config.ts\");\nconst Translator_1 = __importDefault(__webpack_require__(/*! ../translator/Translator */ \"./src/translator/Translator.ts\"));\nconst config = new Config_1.Config();\nconst delaysColors = {\n    GREEN: \"#40c24d\",\n    YELLOW: \"#e0d728\",\n    ORANGE: \"#d77116\",\n    RED: \"#ba2121\"\n};\nconst ReminderColor = (delaysInDays) => {\n    const delayColorAfterDays = config.parameters.settings.delay_color_after_days;\n    if (delaysInDays <= delayColorAfterDays.yellow) {\n        return delaysColors.GREEN;\n    }\n    if (delaysInDays > delayColorAfterDays.yellow && delaysInDays <= delayColorAfterDays.orange) {\n        return delaysColors.YELLOW;\n    }\n    if (delaysInDays > delayColorAfterDays.orange && delaysInDays <= delayColorAfterDays.red) {\n        return delaysColors.ORANGE;\n    }\n    return delaysColors.RED;\n};\nconst ReminderMessage = (pullrequest) => {\n    const createdAtFormatted = dayjs_1.default(pullrequest.createdAt).format(config.parameters.settings.date_format);\n    const delaysInDays = dayjs_1.default(new Date()).diff(pullrequest.createdAt, 'days');\n    return new discord_js_1.MessageEmbed()\n        .setColor(ReminderColor(delaysInDays))\n        .setTitle(pullrequest.title)\n        .setURL(pullrequest.url)\n        .setAuthor(pullrequest.author.username, pullrequest.author.avatar)\n        .setDescription(Translator_1.default.t('reminder.description', { username: pullrequest.author.username }))\n        .setTimestamp()\n        .setFooter(Translator_1.default.t('reminder.footer.base', {\n        createdAtFormatted,\n        delay: Translator_1.default.t('reminder.footer.delay', { count: delaysInDays })\n    }));\n};\nexports.ReminderMessage = ReminderMessage;\n\n\n//# sourceURL=webpack://remindub/./src/model/ReminderMessage.ts?");

/***/ }),

/***/ "./src/repository/Discord.ts":
/*!***********************************!*\
  !*** ./src/repository/Discord.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DiscordClient = void 0;\nconst logger_1 = __webpack_require__(/*! ../logger/logger */ \"./src/logger/logger.ts\");\nconst discord_js_1 = __webpack_require__(/*! discord.js */ \"discord.js\");\nconst Config_1 = __webpack_require__(/*! ../config/Config */ \"./src/config/Config.ts\");\nconst ReminderMessage_1 = __webpack_require__(/*! ../model/ReminderMessage */ \"./src/model/ReminderMessage.ts\");\nclass DiscordClient {\n    constructor() {\n        this.sendMessage = (discordId, githubUsername, pullRequest) => {\n            this.client.users.fetch(discordId).then((user) => {\n                user\n                    .send(ReminderMessage_1.ReminderMessage(pullRequest))\n                    .catch(e => {\n                    console.log(e);\n                    logger_1.logger.error('Cannot send reminder to user ');\n                });\n            }).catch(e => {\n                console.log(e);\n                logger_1.logger.error(`Cannot find discord user ${logger_1.userDescription(discordId, githubUsername)}`);\n            });\n        };\n        this.client = new discord_js_1.Client();\n        const config = new Config_1.Config();\n        this.client\n            .login(config.parameters.settings.discord.token)\n            .catch(e => logger_1.logger.error(`Cannot login to discord, error: ${e}`));\n        this.client.on('ready', () => {\n            logger_1.logger.info(`Logged in as ${this.client.user.tag}!`);\n        });\n    }\n}\nexports.DiscordClient = DiscordClient;\n\n\n//# sourceURL=webpack://remindub/./src/repository/Discord.ts?");

/***/ }),

/***/ "./src/repository/Github.ts":
/*!**********************************!*\
  !*** ./src/repository/Github.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Github = void 0;\nconst Config_1 = __webpack_require__(/*! ../config/Config */ \"./src/config/Config.ts\");\nconst axios_1 = __importDefault(__webpack_require__(/*! axios */ \"axios\"));\nclass Github {\n    constructor() {\n        this.apiVersion = \"application/vnd.github.v3+json\";\n        this.config = new Config_1.Config();\n        this.defaultHeaders = {\n            Accept: this.apiVersion\n        };\n    }\n    getUsername(token) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const url = `https://api.github.com/user`;\n            const headers = Object.assign(this.defaultHeaders, {\n                Authorization: `token ${token}`\n            });\n            const response = yield axios_1.default.get(url, { headers });\n            if (response.status === 200 && response.data) {\n                return response.data.login;\n            }\n            return null;\n        });\n    }\n    getPullRequestsWaitingForReview(repository, username, token) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const url = `https://api.github.com/repos/${repository}/pulls`;\n            const headers = Object.assign(this.defaultHeaders, {\n                Authorization: `token ${token}`\n            });\n            const response = yield axios_1.default.get(url, { headers });\n            const pullRequestsWaitingForReview = [];\n            if (response.status === 200) {\n                response.data.map(pullrequest => {\n                    const reviewers = pullrequest.requested_reviewers;\n                    reviewers.map(reviewer => {\n                        if (reviewer.login === username) {\n                            pullRequestsWaitingForReview.push({\n                                title: pullrequest.title,\n                                url: pullrequest.html_url,\n                                id: pullrequest.id,\n                                createdAt: new Date(pullrequest.created_at),\n                                author: {\n                                    avatar: pullrequest.user.avatar_url,\n                                    username: pullrequest.user.login\n                                }\n                            });\n                        }\n                    });\n                });\n                return pullRequestsWaitingForReview;\n            }\n            throw new Error(`An error occurred when trying to fetch a pull request from ${repository}`);\n        });\n    }\n}\nexports.Github = Github;\n\n\n//# sourceURL=webpack://remindub/./src/repository/Github.ts?");

/***/ }),

/***/ "./src/translator/Translator.ts":
/*!**************************************!*\
  !*** ./src/translator/Translator.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst i18next_1 = __importDefault(__webpack_require__(/*! i18next */ \"i18next\"));\nconst translations_en_json_1 = __importDefault(__webpack_require__(/*! ../../translations/translations.en.json */ \"./translations/translations.en.json\"));\nconst translations_fr_json_1 = __importDefault(__webpack_require__(/*! ../../translations/translations.fr.json */ \"./translations/translations.fr.json\"));\nconst i18next_fs_backend_1 = __importDefault(__webpack_require__(/*! i18next-fs-backend */ \"i18next-fs-backend\"));\nclass Translator {\n    constructor() {\n        this.init = () => __awaiter(this, void 0, void 0, function* () {\n            this.t = yield i18next_1.default\n                .use(i18next_fs_backend_1.default)\n                .init({\n                lng: 'fr',\n                fallbackLng: \"en\",\n                debug: false,\n                preload: ['en', 'fr'],\n                ns: ['translations'],\n                defaultNS: 'translations',\n                backend: {\n                    loadPath: 'translations/{{ns}}.{{lng}}.json'\n                },\n                resources: {\n                    en: {\n                        translations: translations_en_json_1.default\n                    },\n                    fr: {\n                        translations: translations_fr_json_1.default\n                    }\n                }\n            });\n        });\n        this.t = (...args) => {\n            this.i18next(args);\n        };\n        this.init();\n    }\n}\nexports.default = new Translator();\n\n\n//# sourceURL=webpack://remindub/./src/translator/Translator.ts?");

/***/ }),

/***/ "./translations/translations.en.json":
/*!*******************************************!*\
  !*** ./translations/translations.en.json ***!
  \*******************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"reminder\":{\"description\":\"{{- username}} is waiting for your review\",\"footer\":{\"base\":\"Pull-request created at {{- createdAtFormatted}} ({{- delay}})\",\"delay\":\"less than 24h\",\"delay_plural\":\"{{count}} days ago\"}}}');\n\n//# sourceURL=webpack://remindub/./translations/translations.en.json?");

/***/ }),

/***/ "./translations/translations.fr.json":
/*!*******************************************!*\
  !*** ./translations/translations.fr.json ***!
  \*******************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"reminder\":{\"description\":\"{{- username}} est en attente de votre review\",\"footer\":{\"base\":\"Pull-request crée le {{- createdAtFormatted}} ({{- delay}})\",\"delay\":\"moins de 24h\",\"delay_plural\":\"Il y a {{count}} jours\"}}}');\n\n//# sourceURL=webpack://remindub/./translations/translations.fr.json?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");;

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");;

/***/ }),

/***/ "discord.js":
/*!*****************************!*\
  !*** external "discord.js" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("discord.js");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("i18next");;

/***/ }),

/***/ "i18next-fs-backend":
/*!*************************************!*\
  !*** external "i18next-fs-backend" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("i18next-fs-backend");;

/***/ }),

/***/ "js-yaml":
/*!**************************!*\
  !*** external "js-yaml" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("js-yaml");;

/***/ }),

/***/ "node-schedule":
/*!********************************!*\
  !*** external "node-schedule" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("node-schedule");;

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;