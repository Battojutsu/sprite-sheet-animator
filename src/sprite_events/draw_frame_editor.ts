import { QPainter, QImage } from "@nodegui/nodegui";
import { AnimationStructure } from "data_structures/AnimationStructure";
import { FrameEditor, SpriteSheetEditor } from "interface/interface";

/**
 * Handles the drawing of the frame editor.
 * @param editor 
 */
export function draw_frame_editor(frame_editor: FrameEditor) {
	const editor: SpriteSheetEditor = global.editor;
	const anime: AnimationStructure = global.anime;

	let width = editor.area.width;
	let height = editor.area.height;

	if(!width) width = 100;
	if(!height) height = 100;
	
	const painter: QPainter = new QPainter(frame_editor);

	frame_editor.setFixedHeight(height);

	for(let i = 0; (i * width) - width < frame_editor.width(); i++) {
		const frame_i = anime.current_animation.frames[i];

		if(frame_i) {
			let x = frame_i.s_coord.x / frame_i.area.width;
			let y = frame_i.s_coord.y / frame_i.area.height;

			painter.drawPixmap(i * width, 0, editor.widgets.scaled_image, x * editor.area.width, y * editor.area.height, editor.area.width, editor.area.height )
		} else {
			painter.drawRect(i * width, 0, i * width, height);
		}
	}
	painter.end();
}