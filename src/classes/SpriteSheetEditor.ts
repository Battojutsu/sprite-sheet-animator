import {
	QPixmap,
	QPainter,
	WidgetEventTypes,
	QFileDialog,
	FileMode,
	AspectRatioMode,
	TransformationMode,
	QPushButton
} from "@nodegui/nodegui";
import { Interface } from "./Interface";
import { SpriteSheetEditorWidgets } from "./SpriteSheetEditorWidgets";

/**
 * A specialized UserInterface for editing a tileset.
 */
export class SpriteSheetEditor extends Interface {
	widgets: SpriteSheetEditorWidgets;
/**
 * Creates an instance of FileEditor.
 * @param {string} title title of the window
 */
constructor(title: string) {
		super(title);

		// Widgets are moved around and stored in the widgets object.
		this.widgets = new SpriteSheetEditorWidgets(this);

		// Setup event listeners. Each Function is documented for more detail.
		this.configure_image_label_draw();
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
	configure_image_label_draw(): void {
		this.widgets.image_label.addEventListener(WidgetEventTypes.Paint, () => {
			// Setup the painter to draw on the image_label then
			// draw the image in the top left of the image_label.
			const painter: QPainter = new QPainter(this.widgets.image_label);
			if(this.is_qimage_defined(this.widgets.scaled_image)) {
				painter.drawPixmap(0, 0, this.widgets.scaled_image, 0, 0);
			}
			if(this.is_qimage_defined(this.widgets.image)) {
				if(this.widgets.width_box.text().length && this.widgets.height_box.text().length){
					// Values of the X and Y input in pixels.
					const size_x = Number(this.widgets.width_box.text());
					const size_y = Number(this.widgets.height_box.text());

					// How much larger or smaller is the scaled_image over the regular image.
					const width_scaler: number = this.widgets.scaled_image.width() / this.widgets.image.width();
					const height_scaler: number = this.widgets.scaled_image.height() / this.widgets.image.height();

					// How many slices will be drawn for width and height.
					const slices_width: number = this.widgets.image.width() / size_x;
					const slices_height: number = this.widgets.image.height() / size_y;

					// How far will the slices be spread apart.
					const width_portion: number = this.widgets.image.width() / slices_width * width_scaler;
					const height_portion: number = this.widgets.image.height() / slices_height * height_scaler;
					
					// Draw lines until the right of the image is reached.
					for(let i = 0; (i * size_x) <= this.widgets.image.width(); i++) {
						painter.drawLine(i * width_portion, 0, i * width_portion, this.widgets.scaled_image.height());
					}

					// Draw lines until the bottom of the image is reached.
					for(let i = 0; (i * size_y) <= this.widgets.image.height(); i++) {
						painter.drawLine(0, i * height_portion, this.widgets.scaled_image.width(), i * height_portion);
					}
				}
			}
			painter.end();
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
		});
	}

	#scaleImage(): void {
		if(this.is_qimage_defined(this.widgets.image)) {
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
