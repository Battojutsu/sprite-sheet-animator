import { QLabel, WidgetEventTypes } from "@nodegui/nodegui";

/**
 * Extend QLabel and set it up to allow you to view frames in an animation and order them around.
 */
export class FrameEditor extends QLabel {
	labels: QLabel[];

	constructor() {
		super();
		this.setObjectName("labels_ui");
		this.labels = [];

		// Ran when widget comes into view, and when labels_ui.update() (QLabel function) is called.
		this.addEventListener(WidgetEventTypes.Paint, () => {
			console.log("Coming into view.");
		});
	}
}
