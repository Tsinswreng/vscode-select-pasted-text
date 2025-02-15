import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('select-pasted-text.PasteAndSelect', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		// 获取粘贴前的内容和位置
		const originalDoc = editor.document.getText();
		const originalSelections = editor.selections;
		const originalCursor = editor.selection.active;

		// 执行默认粘贴操作
		await vscode.commands.executeCommand('editor.action.clipboardPasteAction');

		// 获取粘贴后的内容
		const newDoc = editor.document.getText();
		
		// 计算差异
		const diff = findDiff(originalDoc, newDoc, originalCursor);
		if (!diff) { return; }

		// 创建新选择范围
		const newSelection = new vscode.Selection(diff.start, diff.end);
		editor.selections = [newSelection];
	});

	context.subscriptions.push(disposable);
}

interface TextDiff {
	start: vscode.Position;
	end: vscode.Position;
}

function findDiff(original: string, updated: string, cursor: vscode.Position): TextDiff | null {
	let i = 0;
	while (i < original.length && i < updated.length && original[i] === updated[i]) {
		i++;
	}

	let j = 0;
	while (
		j < original.length - i &&
		j < updated.length - i &&
		original[original.length - 1 - j] === updated[updated.length - 1 - j]
	) {
		j++;
	}

	const startOffset = i;
	const endOffset = updated.length - j;
	
	const startPos = offsetToPosition(updated, startOffset);
	const endPos = offsetToPosition(updated, endOffset);

	return { start: startPos, end: endPos };
}

function offsetToPosition(text: string, offset: number): vscode.Position {
	let line = 0;
	let char = 0;
	for (let i = 0; i < offset && i < text.length; i++) {
		if (text[i] === '\n') {
			line++;
			char = 0;
		} else {
			char++;
		}
	}
	return new vscode.Position(line, char);
}

export function deactivate() {}