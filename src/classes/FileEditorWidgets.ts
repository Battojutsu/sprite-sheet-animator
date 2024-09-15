import {
	QPushButton,
	QLineEdit,
	QLabel,
	QGridLayout,
	QWidget
} from "@nodegui/nodegui";

import { FileEditor } from "./FileEditor"

/**
 * A class that structures and abstracts the widgets of the FileEditor Interface. This is heavily customized and designed for FileEditor.ts.
 */
export class FileEditorWidgets {
	loader_button: QPushButton;
	run_grid_button: QPushButton;
	height_box: QLineEdit;
	width_box: QLineEdit;
	COLUMN_WIDTH: number = 100;

	constructor(host: FileEditor) {
		this.loader_button = this.#build_loader_button();
		this.run_grid_button = this.#build_run_grid_button();
		this.height_box = this.#build_QLineEdit();
		this.width_box = this.#build_QLineEdit();
		this.setup_layout(host)
	}

	/**
	 * private abstraction function to setup an loading button label.
	 */
	#build_loader_button(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Load Tileset");
		loader_button.setObjectName("loader_button");
		loader_button.setFixedWidth(this.COLUMN_WIDTH);

		return loader_button;
	}

	/**
	 * private abstraction function to setup an button to load the grid and set it up.
	 */
	#build_run_grid_button(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Load grid");
		loader_button.setObjectName("run_grid_button");
		loader_button.setFixedWidth(this.COLUMN_WIDTH);

		return loader_button;
	}

	/**
	 * private abstraction function to build a QPlainTextEdit field.
	 */
	#build_QLineEdit(): QLineEdit {
		const qpte = new QLineEdit();
		qpte.setFixedWidth(this.COLUMN_WIDTH);
		return qpte;
	}

	/**
	 * Abstraction function to build a plain label as needed for this program.
	 * 
	 * @param text text inside the button conveyed to the user.
	 * @param name name of the object for reference in css.
	 * @param height height in pixels of the label
	 * @returns {QLabel} a label that is setup like we need for this program.
	 */
	#build_plain_label(text: string, name: string, height: number): QLabel {
		const plain_label = new QLabel();
		plain_label.setText(text);
		plain_label.setObjectName(name);
		plain_label.setFixedHeight(height);

		return plain_label;
	}

	/**
	 * Setup the grid layout.
	 * @param host reference to FileEditor
	 */
	setup_layout(host: FileEditor): void {
		// Configure static items
		const width_label: QLabel = this.#build_plain_label("width px", "width_label", 18);
		const height_label = this.#build_plain_label("height px", "height_label", 18);

		// Begin creation of Layout.
		const base_widget: QWidget = host.get_new_base_widget();
		const grid_layout: QGridLayout = new QGridLayout();

		// Begin alignment of widgets
		base_widget.setLayout(grid_layout);
		grid_layout.addWidget(host.image_label, 0, 0, 8, 14);

		grid_layout.addWidget(height_label, 5, 15, 1, 1);
		grid_layout.addWidget(width_label, 5, 16, 1, 1);

		// Add width height inputs
		grid_layout.addWidget(this.height_box, 6, 15, 1, 1);
		grid_layout.addWidget(this.width_box, 6, 16, 1, 1);

		//Setup toolbar right aligned
		grid_layout.addWidget(this.run_grid_button, 7, 15, 1, 1);
		grid_layout.addWidget(this.loader_button, 7, 16, 1, 1);
		
		host.window.setCentralWidget(base_widget);
	}
}
