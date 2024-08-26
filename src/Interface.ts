import { QMainWindow, QPushButton, FlexLayout, QWidget, QPixmap, QLabel, QFileDialog, FileMode, QSize } from "@nodegui/nodegui";


export class Interface {
	window: QMainWindow;
	central_widget: QWidget;

	constructor(title: string) {
		this.build_widget();
		this.build_window(title);
	}

	show_window() {
		this.window.show();
	}

	build_window(title: string) {
		this.window = new QMainWindow();

		this.window.setWindowTitle(title);

		global.nodegui_window = this.window;
	}

	build_widget() {
		this.central_widget = new QWidget();
		this.central_widget.setObjectName("central_widget");
		const size = new QSize(640, 480);
		this.central_widget.setBaseSize(size);
	}
}