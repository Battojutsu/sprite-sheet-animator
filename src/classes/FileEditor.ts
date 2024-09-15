import {
	QPushButton,
	QGridLayout,
	QWidget,
	QPixmap,
	QLabel,
	QLayout,
	QLineEdit,
	QPainter,
	WidgetEventTypes
} from "@nodegui/nodegui";
import { Interface } from "./Interface";

/**
 * A specialized UserInterface for opening a file.
 */
export class FileEditor extends Interface {
	loader_button: QPushButton;
	image_label: QLabel;
	image: QPixmap;
	scaled_image: QPixmap;
	height_box: QLineEdit;
	width_box: QLineEdit;
	COLUMN_WIDTH: number = 100;

	constructor(title: string) {
		super(title);
		this.loader_button = this.#build_loader_btn();
		[this.image_label, this.image, this.scaled_image] = this.#build_image_label();
		this.height_box = this.#build_QLineEdit();
		this.width_box = this.#build_QLineEdit();

		this.image_label.addEventListener(WidgetEventTypes.Paint, () => {
			const painter: QPainter = new QPainter(this.image_label);

			if(this.is_qimage_defined(this.scaled_image)) {
				painter.drawPixmap(0, 0, this.scaled_image, 0, 0);
				painter.drawLine(0, 0, this.scaled_image.width(), this.scaled_image.height());
			}

			painter.end();
		});
	}

	/**
	 * Add a image to the central_widget layout.
	 * Then set the central_widget to the window.
	 */
	display_alternative_layout(): void {
		this.#clear_widgets();
		const base_widget: QWidget = this.get_new_base_widget();
		const grid_layout: QGridLayout = new QGridLayout();

		base_widget.setLayout(grid_layout);
		grid_layout.addWidget(this.image_label, 0, 0, 8, 14);
		
		//Setup toolbar right aligned
		grid_layout.addWidget(this.loader_button, 7, 16, 1, 1);
		
		// Add width height inputs
		grid_layout.addWidget(this.height_box, 6, 15, 1, 1);
		grid_layout.addWidget(this.width_box, 6, 16, 1, 1);

		this.window.setCentralWidget(base_widget);
	}

	/**
	 * Remove all of the widgets defined here from the central widgets layout.
	 */
	#clear_widgets(): void {
		// Central Widget 
		const base_layout: QLayout | null = this.window?.centralWidget()?.layout();
		if(!base_layout) return;
		base_layout?.removeWidget(this.loader_button);
		base_layout?.removeWidget(this.image_label);
	}

	/**
	 * private abstraction function to setup an image label.
	 */
	#build_image_label(): [QLabel, QPixmap, QPixmap] {
		const image_label = new QLabel();
		const image = new QPixmap();

		image_label.setMinimumWidth(800);
		image_label.setMinimumHeight(600);
		image_label.setObjectName("image_label");
		
		return [image_label, image, new QPixmap()];
	}

	/**
	 * private abstraction function to build a QPlainTextEdit field.
	 */

	#build_QLineEdit(): QLineEdit {
		const qpte = new QLineEdit();
		qpte.setFixedWidth(this.COLUMN_WIDTH);
		return qpte;
	}

	/**
	 * private abstraction function to setup an loading button label.
	 */
	#build_loader_btn(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Load Tileset");
		loader_button.setObjectName("loader_btn");
		loader_button.setFixedWidth(this.COLUMN_WIDTH);

		return loader_button;
	}

	/**
	 * Rudimentary way of checking if an image has been loaded. Well, at least one with a pixel.
	 */
	is_qimage_defined(qimage: QPixmap): boolean {
		return Boolean(qimage.height() && qimage.width());
	}
}
