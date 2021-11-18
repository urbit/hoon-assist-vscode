"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hoon_dictionary_json_1 = __importDefault(require("./hoon-dictionary.json"));
class HoonDictionary {
    constructor() {
        this.dict = this.buildDict(hoon_dictionary_json_1.default);
    }
    destroy() {
    }
    htmlForWord(word) {
        return this.dict[word];
    }
    buildDict(entries) {
        const res = {};
        for (const entry of entries) {
            for (const key of entry['keys']) {
                res[key] = entry['doc'];
            }
        }
        return res;
    }
}
exports.default = HoonDictionary;
//# sourceMappingURL=hoon-dictionary.js.map