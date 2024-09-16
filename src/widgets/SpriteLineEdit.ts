import {
	QLineEdit
} from "@nodegui/nodegui";

/**
 * Extend QLineEdit and modify for use in the Sprite application.
 */
export class SpriteLineEdit extends QLineEdit{
	/**
	 * Construct a QLineEdit.
	 * @param width for setFixedWidth()
	 */
	constructor(width: number) {
		super();
		this.setFixedWidth(width);
	}
}