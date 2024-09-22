import {
	AspectRatioMode,
	TransformationMode
} from "@nodegui/nodegui";
import { SpriteSheetEditor } from "interface/interface";

export function scale_image(editor: SpriteSheetEditor): void {
	if (editor.is_qimage_defined(editor.widgets.image)) {
		// Scale image to manageable size and store as a scaled_image file.
		editor.widgets.scaled_image = editor.widgets.image.scaled(
			editor.widgets.image_label.width(),
			editor.widgets.image_label.height(),
			AspectRatioMode.KeepAspectRatio,
			TransformationMode.FastTransformation
		);
	}
}