import { QPixmap, WidgetEventTypes, QPushButton } from "@nodegui/nodegui";
import { BaseInterface, SpriteSheetEditorWidgets } from "interface/interface";
import { Coordinate, Area } from "data_structures/data_structures";
import events from "sprite_events/sprite_events";
import { NativeRawPointer } from "@nodegui/nodegui/dist/lib/core/Component";

/**
 * A specialized UserInterface for editing a tileset.
 */
export class SpriteSheetEditor extends BaseInterface {
	widgets: SpriteSheetEditorWidgets;
	area: Area;
	selected_frame: Coordinate;
	/**
	 * Creates an instance of FileEditor.
	 * @param {string} title title of the window
	 */
	constructor(title: string) {
		super(title);
		// I made a design decison made to use a global here. In interest of reducing cognitive overhead.
		// I don't see it as a problem since there will only be one per application.
		global.editor = this;
		this.area = new Area();

		// Widgets are moved around and stored in the widgets object.
		this.widgets = new SpriteSheetEditorWidgets();

		// Setup event listeners. Each Function is documented for more detail.
		this.#configure_image_label_draw();
		this.#configure_image_label_click();
		this.load_file_with(this.widgets.loader_button);
		this.update_grid_with(this.widgets.run_grid_button);
		this.add_frame_with(this.widgets.add_frame_button);

		// Configure scaling event listener.
		this.window.addEventListener(WidgetEventTypes.Resize, () => {
			events.scale_image();
		});
	}

	/**
	 * Configure the image_label to draw the grid, and image.
	 */
	#configure_image_label_draw(): void {
		this.widgets.image_label.addEventListener(WidgetEventTypes.Paint, () => {
			events.draw_grid();
		});
	}

	/**
	 * This sets up the event listener for the image click function.
	 */
	#configure_image_label_click(): void {
		this.widgets.image_label.addEventListener(
			WidgetEventTypes.MouseButtonRelease,
			(e: NativeRawPointer<"QEvent">) => {
				events.image_click(e);
			}
		);
	}

	/**
	 * Rudimentary way of checking if an image has been loaded. Well, at least one with a pixel.
	 */
	is_qimage_defined(qimage: QPixmap): boolean {
		return Boolean(qimage.height() && qimage.width());
	}

	/**
	 * Load a file dialogue with the QPushButton parameter.
	 * @param loader_button
	 */
	load_file_with(loader_button: QPushButton): void {
		loader_button.addEventListener("clicked", () => {
			events.load_file_with();
		});
	}

	/**
	 * Add a new Frame to the animation editor.
	 */
	add_frame_with(add_frame_button: QPushButton): void {
		add_frame_button.addEventListener("clicked", () => {
			events.add_frame();
		});
	}

	/**
	 * Send a update signal that kicks off the paint event listener for the image_label. See: configure_image_label_draw()
	 * @param run_grid_button
	 */
	update_grid_with(run_grid_button: QPushButton): void {
		run_grid_button.addEventListener("clicked", () => {
			this.widgets.image_label.update();
			this.widgets.frame_editor.update();
		});
	}

	load_tileset(image_url: string): void {
		this.widgets.image.load(image_url);
		events.scale_image();
		this.widgets.image_label.update();
	}
}
