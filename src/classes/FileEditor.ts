import { QMainWindow, QPushButton, FlexLayout, QWidget, QPixmap, QLabel, QFileDialog, FileMode, QSize, QLayout } from "@nodegui/nodegui";
import { Interface } from "./Interface";

/**
 * A specialized UserInterface for opening a file.
 */
export class FileEditor extends Interface {
	file_layout: FlexLayout;
	loader_button: QPushButton;
	image_label: QLabel;
	image: QPixmap;

	constructor(title: string) {
		super(title);
		this.#build_loader_btn();
		this.#build_image_label();
	}

	/**
	 * Add loader_button to the central_widget layout. 
	 * Then set the central_widget to the window.
	 */
	display_file_layout() {
		this.#clear_widgets();

		const base_widget = this.get_new_base_widget(new QSize(640, 480));
		base_widget.layout().addWidget(this.loader_button);

		this.window.setCentralWidget(base_widget);
	}

	/**
	 * Add a image to the central_widget layout.
	 * Then set the central_widget to the window.
	 */
	display_alternative_layout() {
		this.#clear_widgets();

		const base_widget = this.get_new_base_widget(new QSize(640, 480));
		base_widget.layout().addWidget(this.image_label);

		this.window.setCentralWidget(base_widget);
	}

	/** 
	 * Remove all of the widgets defined here from the central widgets layout.
	 */
	#clear_widgets() {
		const base_layout: QLayout = this.window?.centralWidget()?.layout();
		if(!base_layout) return;
		base_layout.removeWidget(this.loader_button);
		base_layout.removeWidget(this.image_label);
	}

	/**
	 * private abstraction function to setup an image label.
	 */
	#build_image_label() {
		this.image_label = new QLabel();
		this.image = new QPixmap();
		this.image_label.setPixmap(this.image);
	}

	/**
	 * private abstraction function to setup an loading button label.
	 */
	#build_loader_btn() {
		this.loader_button = new QPushButton();
		this.loader_button.setText("Button");
		this.loader_button.setObjectName("loader_btn");
	}
}