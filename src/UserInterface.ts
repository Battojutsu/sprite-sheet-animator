// This file is used to abstract some of the setup.
import {
	QFileDialog,
	FileMode,
} from "@nodegui/nodegui";
import * as fs from "fs";
import { FileEditor } from "./FileEditor";

export class UserInterface extends FileEditor {
	style_sheet: string;

	constructor() {
		super("Sprite Sheet Animator");
		this.build_style_sheet();
		this.display_file_layout();
		this.add_button_action();
	}

	build_style_sheet() {
		this.style_sheet = fs.readFileSync(`${__dirname}/style.css`).toString();
	}

	add_button_action() {
		this.loader_button.addEventListener("clicked", () => {
			const fileDialog = new QFileDialog();
			fileDialog.setFileMode(FileMode.AnyFile);
			fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
			fileDialog.exec();
			const selectedFiles = fileDialog.selectedFiles();

			this.load_tileset(selectedFiles[0]);
		});
	}

	load_tileset(image_url: string) {
		this.image.load(image_url);
		this.image_label.setPixmap(this.image);
		this.image_label.update();
	}
}
