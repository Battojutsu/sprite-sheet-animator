import { QGridLayout, QWidget, QPixmap, QLabel } from "@nodegui/nodegui";

import { SpriteButton } from "interface/widgets/SpriteButton";
import { SpriteLineEdit } from "interface/widgets/SpriteLineEdit";
import { SpriteLabel } from "interface/widgets/SpriteLabel";
import { SpriteSheetEditor } from "interface/SpriteSheetEditor";
import { FrameEditor } from "interface/widgets/FrameEditor";

import * as fs from "fs";

/**
 * A class that structures and abstracts the widgets of the FileEditor Interface. This is heavily customized and designed for FileEditor.ts.
 */
export class SpriteSheetEditorWidgets {
	loader_button: SpriteButton;
	run_grid_button: SpriteButton;
	height_box: SpriteLineEdit;
	width_box: SpriteLineEdit;
	default_time_between_frames_box: SpriteLineEdit;
	image_label: QLabel;
	image: QPixmap;
	scaled_image: QPixmap;
	#COLUMN_WIDTH: number = 100;
	style_sheet: string;
	frame_editor: FrameEditor;

	constructor(host: SpriteSheetEditor) {
		this.style_sheet = fs.readFileSync(`${__dirname}/style.css`).toString();
		host.window.setStyleSheet(this.style_sheet);
		this.loader_button = new SpriteButton("Load Tileset", "loader_button", this.#COLUMN_WIDTH);
		this.run_grid_button = new SpriteButton("Load grid", "run_grid_button", this.#COLUMN_WIDTH);
		this.height_box = new SpriteLineEdit(this.#COLUMN_WIDTH);
		this.width_box = new SpriteLineEdit(this.#COLUMN_WIDTH);
		this.default_time_between_frames_box = new SpriteLineEdit(this.#COLUMN_WIDTH);
		[this.image_label, this.image, this.scaled_image] = this.#build_image_label();
		this.frame_editor = new FrameEditor(host);
		this.#setup_layout(host);
	}

	/**
	 * Get the width input in pixels;
	 * @returns the number entered into the width in pixels textinput.
	 */
	getWidthInput(): number {
		if(this.width_box.text().length) return Number(this.width_box.text());
		else return 0;
	}

	/**
	 * Get the height input in pixels;
	 * @returns the number entered into the height in pixels textinput.
	 */
	getHeightInput(): number {
		if(this.height_box.text().length) return Number(this.height_box.text());
		else return 0;
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
	 * Setup the grid layout.
	 * @param host reference to FileEditor
	 */
	#setup_layout(host: SpriteSheetEditor): void {
		// Configure static items
		const width_label = new SpriteLabel("Width in px", "width_label", 18);
		const height_label = new SpriteLabel("Height in px", "height_label", 18);
		const default_frame_time_label = new SpriteLabel("Default frame time (ms): ", "default_frame_time_label", 18);

		// Begin creation of Layout.
		const base_widget: QWidget = host.get_new_base_widget();
		const grid_layout: QGridLayout = new QGridLayout();

		// Begin alignment of widgets
		base_widget.setLayout(grid_layout);
		grid_layout.addWidget(this.image_label, 0, 0, 8, 14);

		grid_layout.addWidget(default_frame_time_label, 4, 15, 1, 1);
		grid_layout.addWidget(this.default_time_between_frames_box, 4, 16, 1, 1);

		grid_layout.addWidget(height_label, 5, 15, 1, 1);
		grid_layout.addWidget(width_label, 5, 16, 1, 1);

		// Add width height inputs
		grid_layout.addWidget(this.height_box, 6, 15, 1, 1);
		grid_layout.addWidget(this.width_box, 6, 16, 1, 1);

		//Setup toolbar right aligned
		grid_layout.addWidget(this.run_grid_button, 7, 15, 1, 1);
		grid_layout.addWidget(this.loader_button, 7, 16, 1, 1);

		//Setup the animation tinkerer.
		grid_layout.addWidget(this.frame_editor, 8, 0, 1, 17);

		host.window.setCentralWidget(base_widget);
	}
}
