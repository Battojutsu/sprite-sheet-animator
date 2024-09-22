import { QPainter } from "@nodegui/nodegui";
import { SpriteSheetEditor } from "interface/interface";
import { FrameEditor } from "interface/interface";

/**
 * Handles the drawing of the frame editor.
 * @param editor 
 */
export function draw_frame_editor(editor: SpriteSheetEditor, frame_editor: FrameEditor) {
	let width = editor.area.width;
	let height = editor.area.height;

	if(!width) width = 100;
	if(!height) height = 100;
	
	const painter: QPainter = new QPainter(frame_editor);

	frame_editor.setFixedHeight(height);

	for(let i = 0; (i * width) - width < frame_editor.width(); i++) {
		painter.drawRect(0, 0, i * width, height);
	}
	painter.end();
}