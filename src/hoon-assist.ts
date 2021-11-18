import * as vscode from 'vscode';
import HoonDictionary from './lib/hoon-dictionary';
import { HoonAssistViewProvider } from './view-provider';

export default class HoonAssist {
  viewProvider: HoonAssistViewProvider;
  hoonDict: HoonDictionary;
  term: string;

  constructor(viewProvider: HoonAssistViewProvider) {
    this.hoonDict = new HoonDictionary();
    this.viewProvider = viewProvider;
    this.term = '';
  }

  deactivate() {
  }

  onCursorMoved({ selections, textEditor }: vscode.TextEditorSelectionChangeEvent) {
    const currentWord = this.findCurrentWord(selections, textEditor);
    if (this.term === currentWord || !currentWord) {
      return;
    }

    this.term = currentWord;

    const html = this.hoonDict.htmlForWord(currentWord);

    if (html) {
      this.viewProvider.updateContents(html);
    } else {
      this.viewProvider.clearContents();
    }
  }

  findCurrentWord(selections: readonly vscode.Selection[], editor: vscode.TextEditor): string | undefined {
    if (selections.length !== 1) {
      return undefined;
    }

    const selection = selections[0];
    let wordRange = editor.document.getWordRangeAtPosition(selection.active, /[^\s]+/);
    if (!selection.isEmpty) {
      wordRange = selection.with();
    }

    return editor.document.getText(wordRange);
  }

};
