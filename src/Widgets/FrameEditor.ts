import { QLabel, QPainter, WidgetEventTypes } from "@nodegui/nodegui";
import { SpriteSheetEditor } from "SpriteInterface/SpriteSheetEditor";

/**
 * Extend QLabel and set it up to allow you to view frames in an animation and order them around.
 */
export class FrameEditor extends QLabel {
	labels: QLabel[];
	constructor(host: SpriteSheetEditor) {
		super();
		this.labels = [];
		this.setObjectName("labels_ui");
		// Ran when widget comes into view, and when labels_ui.update() (QLabel function) is called.
		this.addEventListener(WidgetEventTypes.Paint, () => {
			let width = host.width_portion;
			let height = host.height_portion;

			if(!width) width = 100;
			if(!height) height = 100;
			
			const painter: QPainter = new QPainter(this);

			this.setFixedHeight(height);

			for(let i = 0; (i * width) - width < this.width(); i++) {
				painter.drawRect(0, 0, i * width, height);
			}
			painter.end();
		});
	}
}
