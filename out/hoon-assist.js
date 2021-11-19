"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hoon_dictionary_1 = __importDefault(require("./lib/hoon-dictionary"));
class HoonAssist {
    constructor(viewProvider) {
        this.hoonDict = new hoon_dictionary_1.default();
        this.viewProvider = viewProvider;
        this.term = '';
    }
    deactivate() {
    }
    onCursorMoved({ selections, textEditor }) {
        const currentWord = this.findCurrentWord(selections, textEditor);
        if (this.term === currentWord || !currentWord) {
            return;
        }
        this.term = currentWord;
        const html = this.hoonDict.htmlForWord(currentWord);
        if (html) {
            this.viewProvider.updateContents(html);
        }
        else {
            this.viewProvider.clearContents();
        }
    }
    findCurrentWord(selections, editor) {
        if (selections.length !== 1) {
            return undefined;
        }
        const selection = selections[0];
        let wordRange = editor.document.getWordRangeAtPosition(selection.active, /[^\s\(\)\[\]]+/);
        if (!selection.isEmpty) {
            wordRange = selection.with();
        }
        return editor.document.getText(wordRange);
    }
}
exports.default = HoonAssist;
;
//# sourceMappingURL=hoon-assist.js.map