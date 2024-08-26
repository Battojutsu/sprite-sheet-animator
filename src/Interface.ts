import { QMainWindow, QPushButton, FlexLayout, QWidget, QPixmap, QLabel, QFileDialog, FileMode, QSize } from "@nodegui/nodegui";


export class Interface {
	window: QMainWindow;

	constructor() {

	}

	show_window() {
		this.window.show();
	}
}