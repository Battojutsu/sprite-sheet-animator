import {
	QPushButton,
	QGridLayout,
	QWidget,
	QPixmap,
	QLabel,
	QLayout,
	QLineEdit,
	QPainter,
	WidgetEventTypes,
} from "@nodegui/nodegui";
import { Interface } from "./Interface";

/**
 * A specialized UserInterface for opening a file.
 */
export class FileEditor extends Interface {
	loader_button: QPushButton;
	run_grid_button: QPushButton;
	image_label: QLabel;
	image: QPixmap;
	scaled_image: QPixmap;
	height_box: QLineEdit;
	width_box: QLineEdit;
	COLUMN_WIDTH: number = 100;

	constructor(title: string) {
		super(title);
		this.loader_button = this.#build_loader_button();
		this.run_grid_button = this.#build_run_grid_button();
		[this.image_label, this.image, this.scaled_image] = this.#build_image_label();
		this.height_box = this.#build_QLineEdit();
		this.width_box = this.#build_QLineEdit();
		this.configure_image_grid();
	}

	/**
	 * Configure the grid layout.
	 */
	display_alternative_layout(): void {
		this.#clear_widgets();

		// Configure static items
		const width_label: QLabel = this.#build_plain_label("width px", "width_label", 18);
		const height_label = this.#build_plain_label("height px", "height_label", 18);

		// Begin creation of Layout.
		const base_widget: QWidget = this.get_new_base_widget();
		const grid_layout: QGridLayout = new QGridLayout();

		// Begin alignment of widgets
		base_widget.setLayout(grid_layout);
		grid_layout.addWidget(this.image_label, 0, 0, 8, 14);

		grid_layout.addWidget(height_label, 5, 15, 1, 1);
		grid_layout.addWidget(width_label, 5, 16, 1, 1);


		// Add width height inputs
		grid_layout.addWidget(this.height_box, 6, 15, 1, 1);
		grid_layout.addWidget(this.width_box, 6, 16, 1, 1);

		//Setup toolbar right aligned
		grid_layout.addWidget(this.run_grid_button, 7, 15, 1, 1);
		grid_layout.addWidget(this.loader_button, 7, 16, 1, 1);
		

		this.window.setCentralWidget(base_widget);
	}

	/**
	 * Abstraction function to build a plain label as needed for this program.
	 * 
	 * @param text text inside the button conveyed to the user.
	 * @param name name of the object for reference in css.
	 * @param height height in pixels of the label
	 * @returns {QLabel} a label that is setup like we need for this program.
	 */
	#build_plain_label(text: string, name: string, height: number): QLabel {
		const plain_label = new QLabel();
		plain_label.setText(text);
		plain_label.setObjectName(name);
		plain_label.setFixedHeight(height);

		return plain_label;
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
	#build_loader_button(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Load Tileset");
		loader_button.setObjectName("loader_button");
		loader_button.setFixedWidth(this.COLUMN_WIDTH);

		return loader_button;
	}

	/**
	 * private abstraction function to setup an button to load the grid and set it up.
	 */
	#build_run_grid_button(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Load grid");
		loader_button.setObjectName("run_grid_button");
		loader_button.setFixedWidth(this.COLUMN_WIDTH);

		return loader_button;
	}
	

	/**
	 * Configure the image_label to draw a grid. The grid uses the width and height
	 * in pixels setup in the user interface. 
	 */
	configure_image_grid(): void {
		this.image_label.addEventListener(WidgetEventTypes.Paint, () => {
			// Setup the painter to draw on the image_label then
			// draw the image in the top left of the image_label.
			const painter: QPainter = new QPainter(this.image_label);
			if(this.is_qimage_defined(this.scaled_image)) {
				painter.drawPixmap(0, 0, this.scaled_image, 0, 0);
			}
			if(this.is_qimage_defined(this.image)) {
				if(this.width_box.text().length && this.height_box.text().length){
					// Values of the X and Y input in pixels.
					const size_x = Number(this.width_box.text());
					const size_y = Number(this.height_box.text());

					// How much larger or smaller is the scaled_image over the regular image.
					const width_scaler: number = this.scaled_image.width() / this.image.width();
					const height_scaler: number = this.scaled_image.height() / this.image.height();

					// How many slices will be drawn for width and height.
					const slices_width: number = this.image.width() / size_x;
					const slices_height: number = this.image.height() / size_y;

					// How far will the slices be spread apart.
					const width_portion: number = this.image.width() / slices_width * width_scaler;
					const height_portion: number = this.image.height() / slices_height * height_scaler;
					
					// Draw lines until the right of the image is reached.
					for(let i = 0; (i * size_x) <= this.image.width(); i++) {
						painter.drawLine(i * width_portion, 0, i * width_portion, this.scaled_image.height());
					}

					// Draw lines until the bottom of the image is reached.
					for(let i = 0; (i * size_y) <= this.image.height(); i++) {
						painter.drawLine(0, i * height_portion, this.scaled_image.width(), i * height_portion);
					}
				}
			}
			painter.end();
		});
	}

	/**
	 * Rudimentary way of checking if an image has been loaded. Well, at least one with a pixel.
	 */
	is_qimage_defined(qimage: QPixmap): boolean {
		return Boolean(qimage.height() && qimage.width());
	}
}
