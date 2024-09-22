import { QLabel, WidgetEventTypes } from "@nodegui/nodegui";
import { SpriteSheetEditor } from "interface/interface";
import events from "sprite_events/sprite_events";

/**
 * Extend QLabel and set it up to allow you to view frames in an animation and order them around.
 */
export class FrameEditor extends QLabel {
	labels: QLabel[];
	constructor(editor: SpriteSheetEditor) {
		super();
		this.labels = [];
		this.setObjectName("labels_ui");
		// Ran when widget comes into view, and when labels_ui.update() (QLabel function) is called.
		this.addEventListener(WidgetEventTypes.Paint, () => {
			events.draw_frame_editor(editor, this);
		});
	}
}
