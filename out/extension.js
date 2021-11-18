"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const hoon_assist_1 = __importDefault(require("./hoon-assist"));
const view_provider_1 = require("./view-provider");
function activate(context) {
    const viewProvider = new view_provider_1.HoonAssistViewProvider(context.extensionUri);
    const hoonAssist = new hoon_assist_1.default(viewProvider);
    viewProvider.show();
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(view_provider_1.HoonAssistViewProvider.viewType, viewProvider));
    context.subscriptions.push(vscode.commands.registerCommand('hoon-assist.activate', () => {
        viewProvider.show();
    }));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection((event) => hoonAssist.onCursorMoved(event)));
    // context.subscriptions.push(vscode.languages.registerHoverProvider('hoon', { 
    // 	provideHover(document, pos, token) {
    // 		return new vscode.Hover()
    // 	}
    // }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map