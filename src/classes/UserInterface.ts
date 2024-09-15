// This file is used to abstract some of the setup.
import {
	QFileDialog,
	FileMode,
	AspectRatioMode,
	WidgetEventTypes,
	TransformationMode,
} from "@nodegui/nodegui";
import * as fs from "fs";
import { FileEditor } from "./FileEditor";

export class UserInterface extends FileEditor {
	style_sheet: string;

	constructor() {
		super("Sprite Sheet Animator");
		this.style_sheet = fs.readFileSync(`${__dirname}/style.css`).toString();
		this.window.setStyleSheet(this.style_sheet);
		this.display_alternative_layout();
		this.add_button_action();

		this.window.addEventListener(WidgetEventTypes.Resize, () => {
			this.#scaleImage();
		});
	}

	add_button_action(): void {
		this.loader_button.addEventListener("clicked", () => {
			const fileDialog = new QFileDialog();
			fileDialog.setFileMode(FileMode.AnyFile);
			fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
			fileDialog.exec();
			const selectedFiles = fileDialog.selectedFiles();

			this.load_tileset(selectedFiles[0]);
		});
	}

	#scaleImage(): void {
		if(this.is_qimage_defined(this.image)) {
			// Scale image to manageable size and store as a scaled_image file.
			this.scaled_image = this.image.scaled(
				this.image_label.width(),
				this.image_label.height(),
				AspectRatioMode.KeepAspectRatio,
				TransformationMode.FastTransformation
			);
		}
	}

	load_tileset(image_url: string): void {
		this.image.load(image_url);
		this.#scaleImage();
	}
}
