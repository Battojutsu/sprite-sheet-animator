// This file is used to abstract some of the setup.
import {
	QFileDialog,
	FileMode,
	AspectRatioMode
} from "@nodegui/nodegui";
import * as fs from "fs";
import { FileEditor } from "./FileEditor";

export class UserInterface extends FileEditor {
	style_sheet: string;

	constructor() {
		super("Sprite Sheet Animator");
		this.style_sheet = fs.readFileSync(`${__dirname}/style.css`).toString();
		this.display_file_layout();
		this.add_button_action();
	}

	add_button_action(): void {
		this.loader_button.addEventListener("clicked", () => {
			const fileDialog = new QFileDialog();
			fileDialog.setFileMode(FileMode.AnyFile);
			fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
			fileDialog.exec();
			const selectedFiles = fileDialog.selectedFiles();

			this.load_tileset(selectedFiles[0]);
			this.display_alternative_layout();
		});
	}

	load_tileset(image_url: string): void {
		this.image.load(image_url);

		// Scale image to manageable size
		this.image = this.image.scaled(800,600, AspectRatioMode.KeepAspectRatio);
		this.image_label.setPixmap(this.image);
		this.image_label.update();
	}
}
