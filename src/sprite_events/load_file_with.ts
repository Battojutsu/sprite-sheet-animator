import { QFileDialog, FileMode } from "@nodegui/nodegui";
import { SpriteSheetEditor } from "interface/interface";

export function load_file_with() {
	const editor: SpriteSheetEditor = global.editor;
	const fileDialog = new QFileDialog();
	
	fileDialog.setFileMode(FileMode.AnyFile);
	fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
	fileDialog.exec();
	const selectedFiles = fileDialog.selectedFiles();

	editor.load_tileset(selectedFiles[0]);
}