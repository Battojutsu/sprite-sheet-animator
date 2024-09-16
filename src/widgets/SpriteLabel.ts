import {
	QLabel
} from "@nodegui/nodegui";

/**
 * Extend QLabel and modify for use in the Sprite application.
 */
export class SpriteLabel extends QLabel{
	/**
	 * Construct a Qlabel.
	 * @param text for setText()
	 * @param name for setObjectName()
	 * @param width for setFixedWidth()
	 */
	constructor(text: string, name: string, width: number) {
		super();
		this.setText(text);
		this.setObjectName(name);
		this.setFixedWidth(width);
	}
}