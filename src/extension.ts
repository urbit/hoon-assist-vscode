import * as vscode from 'vscode';
import HoonAssist from './hoon-assist';
import { HoonAssistViewProvider } from './view-provider';

export function activate(context: vscode.ExtensionContext) {
	const viewProvider = new HoonAssistViewProvider(context.extensionUri);
	const hoonAssist = new HoonAssist(viewProvider);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(HoonAssistViewProvider.viewType, viewProvider));

	context.subscriptions.push(vscode.commands.registerCommand('hoon-assist.activate', () => {
		viewProvider.show();
	}));

	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(
		(event) => hoonAssist.onCursorMoved(event)
	));

	// context.subscriptions.push(vscode.languages.registerHoverProvider('hoon', { 
	// 	provideHover(document, pos, token) {

	// 		return new vscode.Hover()
	// 	}
	// }));
}

export function deactivate() {}
