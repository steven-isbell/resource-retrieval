"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require("puppeteer");
var fs = require("fs");
var sleep = require(__dirname + "/utils");
var writeToFile = function (data) {
    fs.writeFile("./resources.json", JSON.stringify(data), function (err) {
        if (err)
            return console.error(err);
        process.exit();
    });
};
var pullResource = function (val, page) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var titleNode, title, _a, resourceNodes, resources, j, _b, _c, _d, _e, _f, data, err_1, err_2;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _g.trys.push([0, 21, , 22]);
                            return [4 /*yield*/, page.goto(val)];
                        case 1:
                            _g.sent();
                            return [4 /*yield*/, sleep(page, 60000)];
                        case 2:
                            _g.sent();
                            return [4 /*yield*/, page.$(".markdown-body h1")];
                        case 3:
                            titleNode = _g.sent();
                            _g.label = 4;
                        case 4:
                            _g.trys.push([4, 19, , 20]);
                            if (!titleNode) return [3 /*break*/, 7];
                            return [4 /*yield*/, titleNode.getProperty("outerText")];
                        case 5: return [4 /*yield*/, (_g.sent()).jsonValue()];
                        case 6:
                            _a = _g.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            _a = null;
                            _g.label = 8;
                        case 8:
                            title = _a;
                            return [4 /*yield*/, page.$$(".markdown-body li a")];
                        case 9:
                            resourceNodes = _g.sent();
                            resources = [];
                            j = 0;
                            _g.label = 10;
                        case 10:
                            if (!(j < resourceNodes.length)) return [3 /*break*/, 18];
                            _c = (_b = resources).push;
                            _d = {};
                            _e = resourceNodes[j];
                            if (!_e) return [3 /*break*/, 13];
                            return [4 /*yield*/, resourceNodes[j].getProperty("innerText")];
                        case 11: return [4 /*yield*/, (_g.sent()).jsonValue()];
                        case 12:
                            _e = (_g.sent());
                            _g.label = 13;
                        case 13:
                            _d.title = _e;
                            _f = resourceNodes[j];
                            if (!_f) return [3 /*break*/, 16];
                            return [4 /*yield*/, resourceNodes[j].getProperty("href")];
                        case 14: return [4 /*yield*/, (_g.sent()).jsonValue()];
                        case 15:
                            _f = (_g.sent());
                            _g.label = 16;
                        case 16:
                            _c.apply(_b, [(_d.url = _f,
                                    _d)]);
                            _g.label = 17;
                        case 17:
                            j++;
                            return [3 /*break*/, 10];
                        case 18:
                            data = {
                                title: title,
                                resources: resources
                            };
                            resolve(data);
                            return [3 /*break*/, 20];
                        case 19:
                            err_1 = _g.sent();
                            throw err_1;
                        case 20: return [3 /*break*/, 22];
                        case 21:
                            err_2 = _g.sent();
                            console.log(err_2);
                            return [3 /*break*/, 22];
                        case 22: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
(function () { return __awaiter(_this, void 0, void 0, function () {
    var hrefs, data, browser, page, topics, j, href, i, resource, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hrefs = [];
                data = [];
                return [4 /*yield*/, puppeteer.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://www.github.com/steven-isbell/resources/tree/master")];
            case 3:
                _a.sent();
                return [4 /*yield*/, sleep(page, 60000)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.$$("table .js-navigation-open")];
            case 5:
                topics = _a.sent();
                j = 0;
                _a.label = 6;
            case 6:
                if (!(j < topics.length - 2)) return [3 /*break*/, 10];
                return [4 /*yield*/, topics[j].getProperty("href")];
            case 7: return [4 /*yield*/, (_a.sent()).jsonValue()];
            case 8:
                href = _a.sent();
                hrefs.push(href);
                _a.label = 9;
            case 9:
                j++;
                return [3 /*break*/, 6];
            case 10: return [4 /*yield*/, sleep(page, 60000)];
            case 11:
                _a.sent();
                i = 0;
                _a.label = 12;
            case 12:
                if (!(i < hrefs.length)) return [3 /*break*/, 18];
                _a.label = 13;
            case 13:
                _a.trys.push([13, 16, , 17]);
                return [4 /*yield*/, sleep(page, 60000)];
            case 14:
                _a.sent();
                return [4 /*yield*/, pullResource(hrefs[i], page)];
            case 15:
                resource = _a.sent();
                data.push(resource);
                return [3 /*break*/, 17];
            case 16:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 17];
            case 17:
                i++;
                return [3 /*break*/, 12];
            case 18:
                writeToFile(data);
                return [2 /*return*/];
        }
    });
}); })();
