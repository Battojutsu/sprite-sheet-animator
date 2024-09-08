import { QPushButton, FlexLayout, QGridLayout, QWidget, QPixmap, QLabel, QSize, QLayout } from "@nodegui/nodegui";
import { Interface } from "./Interface";

/**
 * A specialized UserInterface for opening a file.
 */
export class FileEditor extends Interface {
	loader_button: QPushButton;
	image_label: QLabel;
	image: QPixmap;

	constructor(title: string) {
		super(title);
		this.loader_button = this.#build_loader_btn();
		[this.image_label, this.image] = this.#build_image_label();
	}

	/**
	 * Add loader_button to the central_widget layout.
	 * Then set the central_widget to the window.
	 */
	display_file_layout(): void {
		this.#clear_widgets();

		const base_widget: QWidget = this.get_new_base_widget(new QSize(640, 480));
		base_widget.setLayout(new FlexLayout());
		base_widget.layout()?.addWidget(this.loader_button);

		this.window.setCentralWidget(base_widget);
	}

	/**
	 * Add a image to the central_widget layout.
	 * Then set the central_widget to the window.
	 */
	display_alternative_layout(): void {
		this.#clear_widgets();
		const base_widget: QWidget = this.get_new_base_widget(new QSize(1280, 720));
		const grid_layout: QGridLayout = new QGridLayout();

		base_widget.setLayout(grid_layout);
		grid_layout.addWidget(this.image_label, 0, 0);
		grid_layout.addWidget(this.loader_button, 0, 1);
		
		this.window.setCentralWidget(base_widget);
	}

	/** 
	 * Remove all of the widgets defined here from the central widgets layout.
	 */
	#clear_widgets():void {
		const base_layout: QLayout | null = this.window.centralWidget().layout();
		base_layout?.removeWidget(this.loader_button);
		base_layout?.removeWidget(this.image_label);
	}

	/**
	 * private abstraction function to setup an image label.
	 */
	#build_image_label(): [QLabel, QPixmap] {
		const image_label = new QLabel();
		const image = new QPixmap();
		image_label.setPixmap(this.image);

		return [image_label, image];
	}

	/**
	 * private abstraction function to setup an loading button label.
	 */
	#build_loader_btn(): QPushButton {
		const loader_button = new QPushButton();
		loader_button.setText("Button");
		loader_button.setObjectName("loader_btn");

		return loader_button;
	}
}