import { QMainWindow, QWidget } from "@nodegui/nodegui";

/**
 * Base class to be inherited by Different specialized User interfaces.
 */
export class Interface {
	window: QMainWindow;

	constructor(title: string) {
		this.window = new QMainWindow();
		this.window.setWindowTitle(title);
	}

	/**
	 * Show the window.
	 */
	show_window(): void {
		this.window.show();
	}

	/**
	 * Create a new Widget that is acceptible to use for the base widget of this 
	 * Interface and return it.
	 */
	get_new_base_widget(): QWidget {
		const base_widget: QWidget = new QWidget();
		base_widget.setObjectName("central_widget");
		
		return base_widget;
	}
}