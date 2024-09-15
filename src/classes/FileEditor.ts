import {
	QPixmap,
	QLabel,
	QPainter,
	WidgetEventTypes,
	QFileDialog,
	FileMode,
	AspectRatioMode,
	TransformationMode
} from "@nodegui/nodegui";
import { Interface } from "./Interface";
import { FileEditorWidgets } from "./FileEditorWidgets";
import * as fs from "fs";

/**
 * A specialized UserInterface for opening a file.
 */
export class FileEditor extends Interface {
	widgets: FileEditorWidgets;
	image_label: QLabel;
	image: QPixmap;
	scaled_image: QPixmap;
	COLUMN_WIDTH: number = 100;
	style_sheet: string;

	constructor(title: string) {
		super(title);
		[this.image_label, this.image, this.scaled_image] = this.#build_image_label();
		this.widgets = new FileEditorWidgets(this);

		this.configure_image_grid();
		this.style_sheet = fs.readFileSync(`${__dirname}/style.css`).toString();
		this.window.setStyleSheet(this.style_sheet);
		
		this.add_button_action();

		this.window.addEventListener(WidgetEventTypes.Resize, () => {
			this.#scaleImage();
		});
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
	 * Configure the image_label to draw a grid. The grid uses the width and height
	 * in pixels setup in the user interface. 
	 */
	configure_image_grid(): void {
		this.image_label.addEventListener(WidgetEventTypes.Paint, () => {
			// Setup the painter to draw on the image_label then
			// draw the image in the top left of the image_label.
			const painter: QPainter = new QPainter(this.image_label);
			if(this.is_qimage_defined(this.scaled_image)) {
				painter.drawPixmap(0, 0, this.scaled_image, 0, 0);
			}
			if(this.is_qimage_defined(this.image)) {
				if(this.widgets.width_box.text().length && this.widgets.height_box.text().length){
					// Values of the X and Y input in pixels.
					const size_x = Number(this.widgets.width_box.text());
					const size_y = Number(this.widgets.height_box.text());

					// How much larger or smaller is the scaled_image over the regular image.
					const width_scaler: number = this.scaled_image.width() / this.image.width();
					const height_scaler: number = this.scaled_image.height() / this.image.height();

					// How many slices will be drawn for width and height.
					const slices_width: number = this.image.width() / size_x;
					const slices_height: number = this.image.height() / size_y;

					// How far will the slices be spread apart.
					const width_portion: number = this.image.width() / slices_width * width_scaler;
					const height_portion: number = this.image.height() / slices_height * height_scaler;
					
					// Draw lines until the right of the image is reached.
					for(let i = 0; (i * size_x) <= this.image.width(); i++) {
						painter.drawLine(i * width_portion, 0, i * width_portion, this.scaled_image.height());
					}

					// Draw lines until the bottom of the image is reached.
					for(let i = 0; (i * size_y) <= this.image.height(); i++) {
						painter.drawLine(0, i * height_portion, this.scaled_image.width(), i * height_portion);
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

	add_button_action(): void {
		this.widgets.loader_button.addEventListener("clicked", () => {
			const fileDialog = new QFileDialog();
			fileDialog.setFileMode(FileMode.AnyFile);
			fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
			fileDialog.exec();
			const selectedFiles = fileDialog.selectedFiles();

			this.load_tileset(selectedFiles[0]);
		});

		this.widgets.run_grid_button.addEventListener("clicked", () => {
			this.image_label.update();
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
