"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemById = exports.getIndexById = exports.saveToJsonFile = exports.readJsonFile = void 0;
const fs_1 = __importDefault(require("fs"));
function readJsonFile(fileName) {
    const fileContent = fs_1.default.readFileSync(fileName);
    const actualData = JSON.parse(fileContent.toString());
    return actualData;
}
exports.readJsonFile = readJsonFile;
function saveToJsonFile(fileName, datatoSave) {
    fs_1.default.writeFileSync(fileName, JSON.stringify(datatoSave));
}
exports.saveToJsonFile = saveToJsonFile;
function getIndexById(array, id) {
    return array.findIndex(e => e.id === Number(id));
}
exports.getIndexById = getIndexById;
function getItemById(array, id) {
    return array.find(e => e.id === Number(id));
}
exports.getItemById = getItemById;
