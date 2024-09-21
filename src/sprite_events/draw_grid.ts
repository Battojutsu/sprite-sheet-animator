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

export function draw_grid() {
	// Setup the painter to draw on the image_label then
	// draw the image in the top left of the image_label.
	const painter: QPainter = new QPainter(this.widgets.image_label);
	if (this.is_qimage_defined(this.widgets.scaled_image)) {
		painter.drawPixmap(0, 0, this.widgets.scaled_image, 0, 0);
	}
	if (this.is_qimage_defined(this.widgets.image)) {
		const width = this.widgets.getWidthInput();
		const height = this.widgets.getHeightInput();

		if (width && height) {
			// Values of the X and Y input in pixels.
			const size_x = width;
			const size_y = height;

			// How much larger or smaller is the scaled_image over the regular image.
			const width_scaler: number = this.widgets.scaled_image.width() / this.widgets.image.width();
			const height_scaler: number = this.widgets.scaled_image.height() / this.widgets.image.height();

			// How many slices will be drawn for width and height.
			const slices_width: number = this.widgets.image.width() / size_x;
			const slices_height: number = this.widgets.image.height() / size_y;

			// How far will the slices be spread apart.
			this.area = new Area(
				(this.widgets.image.width() / slices_width) * width_scaler,
				(this.widgets.image.height() / slices_height) * height_scaler,
				"pixels"
			);

			// Draw lines until the right of the image is reached.
			for (let i = 0; i * size_x <= this.widgets.image.width(); i++) {
				painter.drawLine(
					i * this.area.width,
					0,
					i * this.area.width,
					this.widgets.scaled_image.height()
				);
			}

			// Draw lines until the bottom of the image is reached.
			for (let i = 0; i * size_y <= this.widgets.image.height(); i++) {
				painter.drawLine(
					0,
					i * this.area.height,
					this.widgets.scaled_image.width(),
					i * this.area.height
				);
			}

			// Determine if the selected frame is inside the scaled image or it's outside of it inside the image_label.
			const in_image: boolean =
				this.selected_frame.x < slices_width && this.selected_frame.y < slices_height;

			if (this.selected_frame && in_image) {
				painter.setPen(new QColor("green"));
				painter.drawRect(
					this.selected_frame.x * this.area.width,
					this.selected_frame.y * this.area.height,
					this.area.width,
					this.area.height
				);
			}
		}
	}
	painter.end();
}