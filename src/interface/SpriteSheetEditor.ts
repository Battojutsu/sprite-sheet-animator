import {
	QPixmap,
	QPainter,
	WidgetEventTypes,
	QFileDialog,
	FileMode,
	AspectRatioMode,
	TransformationMode,
	QPushButton,
	QColor,
	QMouseEvent,
} from "@nodegui/nodegui";
import { BaseInterface, SpriteSheetEditorWidgets } from "interface/interface";
import { Coordinate, Area } from "data_structures/data_structures"

/**
 * A specialized UserInterface for editing a tileset.
 */
export class SpriteSheetEditor extends BaseInterface {
	widgets: SpriteSheetEditorWidgets;
	area: Area;
	selected_frame: Coordinate;
	/**
	 * Creates an instance of FileEditor.
	 * @param {string} title title of the window
	 */
	constructor(title: string) {
		super(title);
		this.area = new Area();

		// Widgets are moved around and stored in the widgets object.
		this.widgets = new SpriteSheetEditorWidgets(this);

		// Setup event listeners. Each Function is documented for more detail.
		this.#configure_image_label_draw();
		this.#configure_image_label_click();
		this.load_file_with(this.widgets.loader_button);
		this.update_grid_with(this.widgets.run_grid_button);

		// Configure scaling event listener.
		this.window.addEventListener(WidgetEventTypes.Resize, () => {
			this.#scaleImage();
		});
	}

	/**
	 * Configure the image_label to draw the grid, and image.
	 */
	#configure_image_label_draw(): void {
		this.widgets.image_label.addEventListener(WidgetEventTypes.Paint, () => {

		});
	}

	/**
	 * This sets up the event listener for the image click function.
	 */
	#configure_image_label_click(): void {
		this.widgets.image_label.addEventListener(WidgetEventTypes.MouseButtonRelease, (e) => {
			let ev = new QMouseEvent(e);

			const x_frame = Math.floor(ev.x() / this.area.width);
			const y_frame = Math.floor(ev.y() / this.area.height);

			// Unselect rectangle if you select it again.
			if (this.selected_frame?.x == x_frame && this.selected_frame?.y == y_frame) {
				this.selected_frame = undefined;
			} else {
				this.selected_frame = new Coordinate(x_frame, y_frame);
			}
			this.widgets.image_label.update();
		});
	}

	/**
	 * Rudimentary way of checking if an image has been loaded. Well, at least one with a pixel.
	 */
	is_qimage_defined(qimage: QPixmap): boolean {
		return Boolean(qimage.height() && qimage.width());
	}

	/**
	 * Load a file dialogue with the QPushButton parameter.
	 * @param loader_button
	 */
	load_file_with(loader_button: QPushButton): void {
		loader_button.addEventListener("clicked", () => {
			const fileDialog = new QFileDialog();
			fileDialog.setFileMode(FileMode.AnyFile);
			fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
			fileDialog.exec();
			const selectedFiles = fileDialog.selectedFiles();

			this.load_tileset(selectedFiles[0]);
		});
	}

	/**
	 * Send a update signal that kicks off the paint event listener for the image_label. See: configure_image_label_draw()
	 * @param run_grid_button
	 */
	update_grid_with(run_grid_button: QPushButton): void {
		run_grid_button.addEventListener("clicked", () => {
			this.widgets.image_label.update();
			this.widgets.frame_editor.update();
		});
	}

	#scaleImage(): void {
		if (this.is_qimage_defined(this.widgets.image)) {
			// Scale image to manageable size and store as a scaled_image file.
			this.widgets.scaled_image = this.widgets.image.scaled(
				this.widgets.image_label.width(),
				this.widgets.image_label.height(),
				AspectRatioMode.KeepAspectRatio,
				TransformationMode.FastTransformation
			);
		}
	}

	load_tileset(image_url: string): void {
		this.widgets.image.load(image_url);
		this.#scaleImage();
	}
}
