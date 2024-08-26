// This file is used to abstract some of the setup.
import {
	QMainWindow,
	QPushButton,
	FlexLayout,
	QWidget,
	QPixmap,
	QLabel,
	QFileDialog,
	FileMode,
	QSize,
} from "@nodegui/nodegui";
import * as fs from "fs";
import { Interface } from "./Interface";

export class UserInterface extends Interface {
	loader_button: QPushButton;
	central_widget: QWidget;
	style_sheet: string;
	image: QPixmap;
	image_label: QLabel;

	constructor() {
		super();
		this.build_loader_btn();
		this.build_image_label();
		this.build_central_widget();
		this.build_window();
		this.build_style_sheet();
	}

	build_style_sheet() {
		this.style_sheet = fs.readFileSync(`${__dirname}/style.css`).toString();
	}

	build_image_label() {
		this.image_label = new QLabel();
		this.image = new QPixmap();
		this.image_label.setPixmap(this.image);
	}

	build_layout(): FlexLayout {
		const layout: FlexLayout = new FlexLayout();
		return layout;
	}

	build_window() {
		this.window = new QMainWindow();
		this.window.setWindowTitle("Sprite Sheet Animator");
		this.window.setCentralWidget(this.central_widget);
		global.nodegui_window = this.window;
	}

	build_loader_btn() {
		this.loader_button = new QPushButton();
		this.loader_button.setText("Button");

		this.loader_button.addEventListener("clicked", () => {
			const fileDialog = new QFileDialog();
			fileDialog.setFileMode(FileMode.AnyFile);
			fileDialog.setNameFilter("Images (*.png *.bmp *.jpg)");
			fileDialog.exec();
			const selectedFiles = fileDialog.selectedFiles();

			this.load_tileset(selectedFiles[0]);
		});
		this.loader_button.setObjectName("loader_btn");
	}

	build_central_widget() {
		this.central_widget = new QWidget();
		this.central_widget.setObjectName("central_widget");
		const root_layout = this.build_layout();
		this.central_widget.setLayout(root_layout);
		root_layout.addWidget(this.loader_button);
		root_layout.addWidget(this.image_label);
		const size = new QSize(640, 480);
		this.central_widget.setBaseSize(size);
	}

	load_tileset(image_url: string) {
		this.image.load(image_url);
		this.image_label.setPixmap(this.image);
		this.image_label.update();
	}
}
