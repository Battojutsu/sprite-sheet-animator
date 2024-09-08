import {
	QPushButton,
	QGridLayout,
	QWidget,
	QPixmap,
	QLabel,
	QSize,
	QLayout,
	QLineEdit
} from "@nodegui/nodegui";
import { Interface } from "./Interface";

/**
 * A specialized UserInterface for opening a file.
 */
export class FileEditor extends Interface {
	loader_button: QPushButton;
	image_label: QLabel;
	image: QPixmap;
	height_box: QLineEdit;
	width_box: QLineEdit;

	constructor(title: string) {
		super(title);
		this.loader_button = this.#build_loader_btn();
		[this.image_label, this.image] = this.#build_image_label();
		this.height_box = this.#build_QLineEdit();
		this.width_box = this.#build_QLineEdit();
	}

	/**
	 * Add a image to the central_widget layout.
	 * Then set the central_widget to the window.
	 */
	display_alternative_layout(): void {
		this.#clear_widgets();
		const base_widget: QWidget = this.get_new_base_widget(
			new QSize(1280, 720)
		);
		const grid_layout: QGridLayout = new QGridLayout();
		base_widget.setLayout(grid_layout);

		grid_layout.addWidget(this.image_label, 0, 0, 8, 14);

		
		//Setup toolbar right aligned
		grid_layout.addWidget(this.loader_button, 7, 16, 1, 1);
		
		// Add width height inputs
		grid_layout.addWidget(this.height_box, 6, 15, 1, 1);
		grid_layout.addWidget(this.width_box, 6, 16, 1, 1);

		this.window.setCentralWidget(base_widget);
	}

	/**
	 * Remove all of the widgets defined here from the central widgets layout.
	 */
	#clear_widgets(): void {
		// Central Widget 
		const base_layout: QLayout | null = this.window?.centralWidget()?.layout();
		if(!base_layout) return;
		base_layout?.removeWidget(this.loader_button);
		base_layout?.removeWidget(this.image_label);
	}

	/**
	 * private abstraction function to setup an image label.
	 */
	#build_image_label(): [QLabel, QPixmap] {
		const image_label = new QLabel();
		const image = new QPixmap();
		image_label.setPixmap(image);
		
		return [image_label, image];
	}

	/**
	 * private abstraction function to build a QPlainTextEdit field.
	 */

	#build_QLineEdit(): QLineEdit {
		const qpte = new QLineEdit();
		return qpte;
	}

	/**
	 * private abstraction function to setup an loading button label.
	 */
	#build_loader_btn(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Load Tileset");
		loader_button.setObjectName("loader_btn");
		loader_button.setMaximumWidth(120);

		return loader_button;
	}
}
