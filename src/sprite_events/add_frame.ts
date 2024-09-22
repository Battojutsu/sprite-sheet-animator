import { Coordinate } from "data_structures/proto/Coordinate";
import { Frame } from "data_structures/Frame";
import { Area } from "data_structures/proto/Area";
import { AnimationStructure } from "data_structures/AnimationStructure";
import { SpriteSheetEditor } from "interface/interface";

/**
 * 
 * @param editor the editor calling this event.
 */
export function add_frame() {
	// TODO update th

	const editor: SpriteSheetEditor = global.editor;
	const anime: AnimationStructure = global.anime;
	const default_time: number = editor.widgets.getDefaultTimeInput();

	if(editor.selected_frame) {
		// Source cordinate definition.
		const s_coord = new Coordinate(
			editor.selected_frame.x * editor.widgets.getWidthInput(),
			editor.selected_frame.y * editor.widgets.getHeightInput()
		)

		// Source area definition
		const s_area = new Area(editor.widgets.getWidthInput(), editor.widgets.getHeightInput(), "pixel");

		// Define frame
		const this_frame = new Frame(s_coord, s_area, default_time);

		// Add the frame information to the animation.
		anime.current_animation.frames.push(this_frame)
	}

	editor.widgets.frame_editor.update();
}