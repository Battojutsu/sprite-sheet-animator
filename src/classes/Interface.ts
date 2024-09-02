import { QMainWindow, QPushButton, FlexLayout, QWidget, QPixmap, QLabel, QFileDialog, FileMode, QSize } from "@nodegui/nodegui";

/**
 * Base class to be inherited by Different specialized User interfaces.
 */
export class Interface {
	window: QMainWindow;
	central_widget: QWidget;

	constructor(title: string) {
		this.#build_window(title);
	}

	/**
	 * Show the window.
	 */
	show_window() {
		this.window.showMaximized();
	}

	/**
	 * Create a new QMainWindow and assign it to this.window. then set the title.
	 * and set the nodegui_window object to this window.
	 * @param title - Title of the window.
	 */
	#build_window(title: string) {
		this.window = new QMainWindow();
		this.window.setWindowTitle(title);
		global.nodegui_window = this.window;
	}

	/**
	 * Create a new Widget that is acceptible to use for the base widget of this 
	 * Interface and return it.
	 * 
	 * @param size - Used to set the base size of the widget
	 * @returns a base widget acceptible for this Interface. 
	 */
	get_new_base_widget(size: QSize) {
		const base_widget: QWidget = new QWidget();
		base_widget.setObjectName("central_widget");
		base_widget.setBaseSize(size);
		base_widget.setLayout(new FlexLayout());

		return base_widget;
	}
}