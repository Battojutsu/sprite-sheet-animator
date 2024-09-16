import {
	QLineEdit,
	QLabel,
	QGridLayout,
	QWidget,
	QPixmap,
} from "@nodegui/nodegui";

import { SpriteButton } from "widgets/SpriteButton";
import { SpriteSheetEditor } from "classes/SpriteSheetEditor";

import * as fs from "fs";

/**
 * A class that structures and abstracts the widgets of the FileEditor Interface. This is heavily customized and designed for FileEditor.ts.
 */
export class SpriteSheetEditorWidgets {
	loader_button: SpriteButton;
	run_grid_button: SpriteButton;
	height_box: QLineEdit;
	width_box: QLineEdit;
	default_time_between_frames_box: QLineEdit;
	image_label: QLabel;
	image: QPixmap;
	scaled_image: QPixmap;
	#COLUMN_WIDTH: number = 100;
	style_sheet: string;

	constructor(host: SpriteSheetEditor) {
		this.style_sheet = fs.readFileSync(`style.css`).toString();
		host.window.setStyleSheet(this.style_sheet);
		this.loader_button = new SpriteButton("Load Tileset", "loader_button",this.#COLUMN_WIDTH);
		this.run_grid_button = new SpriteButton("Load grid", "run_grid_button", this.#COLUMN_WIDTH);
		this.run_grid_button = this.#build_run_grid_button();
		this.height_box = this.#build_QLineEdit();
		this.width_box = this.#build_QLineEdit();
		this.default_time_between_frames_box = this.#build_QLineEdit();
		[this.image_label, this.image, this.scaled_image] =
			this.#build_image_label();
		this.#setup_layout(host);
	}

	/**
	 * private abstraction function to setup an image label.
	 */
	#build_image_label(): [QLabel, QPixmap, QPixmap] {
		const image_label = new QLabel();
		const image = new QPixmap();

		image_label.setMinimumWidth(800);
		image_label.setMinimumHeight(600);
		image_label.setObjectName("image_label");

		return [image_label, image, new QPixmap()];
	}

	/**
	 * private abstraction function to build a QPlainTextEdit field.
	 */
	#build_QLineEdit(): QLineEdit {
		const qpte = new QLineEdit();
		qpte.setFixedWidth(this.#COLUMN_WIDTH);
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
	#setup_layout(host: SpriteSheetEditor): void {
		// Configure static items
		const width_label: QLabel = this.#build_plain_label(
			"Width in px",
			"width_label",
			18
		);
		const height_label = this.#build_plain_label(
			"Height in px",
			"height_label",
			18
		);
		const default_frame_time_label = this.#build_plain_label(
			"Default frame time (ms): ",
			"default_frame_time_label",
			18
		);

		// Begin creation of Layout.
		const base_widget: QWidget = host.get_new_base_widget();
		const grid_layout: QGridLayout = new QGridLayout();

		// Begin alignment of widgets
		base_widget.setLayout(grid_layout);
		grid_layout.addWidget(this.image_label, 0, 0, 8, 14);

		grid_layout.addWidget(default_frame_time_label, 4, 15, 1, 1);
		grid_layout.addWidget(
			this.default_time_between_frames_box,
			4,
			16,
			1,
			1
		);

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
