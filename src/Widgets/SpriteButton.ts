import { QPushButton } from "@nodegui/nodegui";

/**
 * Extend QButton and modify for use in the Sprite application.
 */
export class SpriteButton extends QPushButton{
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