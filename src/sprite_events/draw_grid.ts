import { QPainter, QColor } from "@nodegui/nodegui";
import { Area } from "data_structures/data_structures";
import { SpriteSheetEditor } from "interface/interface";

/**
 * Handles the drawing of the image grid. And the spritesheet.
 * @param editor 
 */
export function draw_grid() {
	const editor: SpriteSheetEditor = global.editor;
	
	// Setup the painter to draw on the image_label then
	// draw the image in the top left of the image_label.
	const painter: QPainter = new QPainter(editor.widgets.image_label);
	
	if (editor.is_qimage_defined(editor.widgets.scaled_image)) {
		painter.drawPixmap(0, 0, editor.widgets.scaled_image, 0, 0);
	}
	if (editor.is_qimage_defined(editor.widgets.image)) {
		const width = editor.widgets.getWidthInput();
		const height = editor.widgets.getHeightInput();

		if (width && height) {
			// Values of the X and Y input in pixels.
			const size_x = width;
			const size_y = height;

			// How much larger or smaller is the scaled_image over the regular image.
			const width_scaler: number = editor.widgets.scaled_image.width() / editor.widgets.image.width();
			const height_scaler: number = editor.widgets.scaled_image.height() / editor.widgets.image.height();

			// How many slices will be drawn for width and height.
			const slices_width: number = editor.widgets.image.width() / size_x;
			const slices_height: number = editor.widgets.image.height() / size_y;

			// How far will the slices be spread apart.
			editor.area = new Area(
				(editor.widgets.image.width() / slices_width) * width_scaler,
				(editor.widgets.image.height() / slices_height) * height_scaler,
				"pixels"
			);

			// Draw lines until the right of the image is reached.
			for (let i = 0; i * size_x <= editor.widgets.image.width(); i++) {
				painter.drawLine(
					i * editor.area.width,
					0,
					i * editor.area.width,
					editor.widgets.scaled_image.height()
				);
			}

			// Draw lines until the bottom of the image is reached.
			for (let i = 0; i * size_y <= editor.widgets.image.height(); i++) {
				painter.drawLine(
					0,
					i * editor.area.height,
					editor.widgets.scaled_image.width(),
					i * editor.area.height
				);
			}

			// Determine if the selected frame is inside the scaled image or it's outside of it inside the image_label.
			const in_image: boolean =
				editor.selected_frame.x < slices_width && editor.selected_frame.y < slices_height;

			if (editor.selected_frame && in_image) {
				painter.setPen(new QColor("green"));
				painter.drawRect(
					editor.selected_frame.x * editor.area.width,
					editor.selected_frame.y * editor.area.height,
					editor.area.width,
					editor.area.height
				);
			}
		}
	}
	painter.end();
}