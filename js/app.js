"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formActions_1 = require("./formActions");
const uiElements_1 = require("./models/uiElements");
const user_1 = require("./models/user");
const processLifeInWeeks_1 = require("./processLifeInWeeks");
const persistence_service_1 = require("./services/persistence.service");
const translate_1 = __importDefault(require("./utils/translate"));
translate_1.default.init('', './i18n/').then(() => {
    translate_1.default.template();
    const user = new user_1.User();
    user.copy(persistence_service_1.Persistence.load('user'));
    uiElements_1.Ui.init(user);
    (0, formActions_1.formFields)(user);
    (0, processLifeInWeeks_1.processLifeInWeeks)(user);
});
