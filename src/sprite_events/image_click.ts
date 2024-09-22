import { QMouseEvent } from "@nodegui/nodegui";
import { NativeRawPointer } from "@nodegui/nodegui/dist/lib/core/Component";
import { Coordinate } from "data_structures/data_structures";
import { SpriteSheetEditor } from "interface/interface";

/**
 * 
 * @param editor the editor calling this event.
 * @param e The event object.
 */
export function image_click(e:NativeRawPointer<"QEvent">, ) {
	const editor: SpriteSheetEditor = global.editor;
	const ev = new QMouseEvent(e);

	// Calculate the coordinates.
	const frame = new Coordinate(
		Math.floor(ev.x() / editor.area.width),
		Math.floor(ev.y() / editor.area.height))

	// Unselect rectangle if you select it again.
	editor.selected_frame = frame.is_equal_to(this.selected_frame) ? undefined : frame;

	// Update and draw the selected frames.
	editor.widgets.image_label.update();
	editor.widgets.frame_editor.update();
}