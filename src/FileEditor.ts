import { QMainWindow, QPushButton, FlexLayout, QWidget, QPixmap, QLabel, QFileDialog, FileMode, QSize } from "@nodegui/nodegui";
import { Interface } from "./Interface";


export class FileEditor extends Interface {
	file_layout: FlexLayout;
	loader_button: QPushButton;
	image_label: QLabel;
	image: QPixmap;

	constructor(title: string) {
		super(title);
		this.build_loader_btn();
		this.build_image_label();
	}

	display_file_layout() {
		this.file_layout = new FlexLayout();
		this.file_layout.addWidget(this.loader_button);
		this.file_layout.addWidget(this.image_label);

		this.central_widget.setLayout(this.file_layout);
		this.window.setCentralWidget(this.central_widget);
	}

	build_image_label() {
		this.image_label = new QLabel();
		this.image = new QPixmap();
		this.image_label.setPixmap(this.image);
	}

	build_loader_btn() {
		this.loader_button = new QPushButton();
		this.loader_button.setText("Button");
		this.loader_button.setObjectName("loader_btn");
	}
}