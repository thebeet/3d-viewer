import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'pcdViewer.pcdPreview',
      new PcdCustomEditorProvider(context),
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );
}

class PcdDocument implements vscode.CustomDocument {
	readonly uri: vscode.Uri;
	private readonly disposeEmitter = new vscode.EventEmitter<void>();
	onDidDispose = this.disposeEmitter.event;
  
	constructor(uri: vscode.Uri) {
	  this.uri = uri;
	}
  
	dispose(): void {
	  this.disposeEmitter.fire();
	  this.disposeEmitter.dispose();
	}
  }

class PcdCustomEditorProvider implements vscode.CustomReadonlyEditorProvider<PcdDocument> {
  private context: vscode.ExtensionContext;
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, token: vscode.CancellationToken): Thenable<PcdDocument> | PcdDocument {
	console.log('openCustomDocument called');
	return new PcdDocument(uri);
  }

  resolveCustomEditor(document: PcdDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): Thenable<void> | void {
	console.log('resolveCustomEditor called');
    // 1. 读取PCD文件内容
    const fileData = fs.readFileSync(document.uri.fsPath);
    const fileBase64 = fileData.toString('base64');

    // 2. 设置webview HTML
    const htmlPath = path.join(this.context.extensionPath, 'media', 'webview.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'media'))]
    };
    webviewPanel.webview.html = html;

	
	function withResolvers<T>() {
		let resolve: (value: T | PromiseLike<T>) => void = () => {};
		let reject: (value: T | PromiseLike<T>) => void = () => {};;
		const promise = new Promise<T>((res, rej) => {
		  resolve = res;
		  reject = rej;
		});
		return { promise, resolve, reject };
	  }
	  
	  // 用法示例
	const { promise, resolve, reject } = withResolvers<void>();

    // 3. 传递数据给Webview
    webviewPanel.webview.onDidReceiveMessage(
      message => {
		resolve();
      },
      undefined,
      this.context.subscriptions
    );
	promise.then(() => {
		webviewPanel.webview.postMessage({
			type: 'loadPCD',
			fileName: path.basename(document.uri.fsPath),
			fileData: fileBase64,
		});
	});
  }
}