import { QLabel, WidgetEventTypes, QMouseEvent } from "@nodegui/nodegui";
import { AnimationStructure } from "data_structures/AnimationStructure";
import { SpriteSheetEditor } from "interface/interface";
import events from "sprite_events/sprite_events";

/**
 * Extend QLabel and set it up to allow you to view frames in an animation and order them around.
 */
export class FrameEditor extends QLabel {
	dragged_image: number;
	dropped_image: number;

	constructor() {
		super();
		this.setObjectName("labels_ui");
		// Ran when widget comes into view, and when labels_ui.update() (QLabel function) is called.
		this.addEventListener(WidgetEventTypes.Paint, () => {
			events.draw_frame_editor(this);
		});
		
		
		this.addEventListener(WidgetEventTypes.MouseButtonPress, (e) => {
			const editor: SpriteSheetEditor = global.editor;
			const anime: AnimationStructure = global.anime;
			const ev = new QMouseEvent(e);
			if(editor.area.width) {
				this.dragged_image = Math.floor(ev.x() / editor.area.width);
			}
		});
		
		this.addEventListener(WidgetEventTypes.MouseButtonRelease, (e) => {
			const editor: SpriteSheetEditor = global.editor;
			const anime: AnimationStructure = global.anime;
			const ev = new QMouseEvent(e);

			if(editor.area.width && anime.animations[0].frames.length > this.dragged_image) {
				const CHOSEN_ANIMATION_PLACEHOLDER = 0; // TODO: change this to the chosen animation index when that is implemented.
				this.dropped_image = Math.floor(ev.x() / editor.area.width);

				// Swap out dragged and drop here.
				let dragged = anime.animations[CHOSEN_ANIMATION_PLACEHOLDER].frames[this.dragged_image];
				let dropped = anime.animations[CHOSEN_ANIMATION_PLACEHOLDER].frames[this.dropped_image];
				anime.animations[CHOSEN_ANIMATION_PLACEHOLDER].frames[this.dropped_image] = dragged;
				anime.animations[CHOSEN_ANIMATION_PLACEHOLDER].frames[this.dragged_image] = dropped;

				// Redraw the frame.
				editor.widgets.frame_editor.update();
			}
		});

		this.addEventListener(WidgetEventTypes.MouseMove, (e) => {
			const editor: SpriteSheetEditor = global.editor;
			const anime: AnimationStructure = global.anime;
			const ev = new QMouseEvent(e);

			// TODO add dragging image here.
		});
	}
}
