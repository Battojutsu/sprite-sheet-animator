// This file is used to abstract some of the setup.
import { QMainWindow, QPushButton, FlexLayout, QWidget } from "@nodegui/nodegui";

export class UserInterface {
	window: QMainWindow;
	loader_button: QPushButton;
	central_widget: QWidget;
	root_layout: FlexLayout;

	constructor() {
		this.window = this.build_window();
		this.loader_button = this.build_loader_btn();
		this.central_widget = this.get_central_widget();
		this.central_widget.setObjectName("central_widget");
		this.loader_button.setObjectName("loader_btn")
		this.root_layout = this.build_layout();
		this.central_widget.setLayout(this.root_layout);
		this.root_layout.addWidget(this.loader_button);
		this.window.setCentralWidget(this.central_widget);

		this.window.setStyleSheet(
			`
			  #central_widget {
				background-color: gray;
			  }
			  #loader_btn {
				background-color: green;
			  }
			`
		);
	}

	build_layout(): FlexLayout {
		const layout: FlexLayout = new FlexLayout();

		return layout;
	}

	build_window(): QMainWindow {
		const window: QMainWindow = new QMainWindow();
		window.setWindowTitle("Sprite Sheet Animator");
		global.nodegui_window = window;
	
		return window;
	}

	show_window() {
		this.window.show();
	}

	build_loader_btn(): QPushButton {
		const load_image = new QPushButton();

		load_image.setText("Button");
		load_image.addEventListener("clicked", () => {
			console.log("here");
		});
	
		return load_image;
	}

	get_central_widget():  QWidget {
		const central_widget: QWidget = new QWidget();
		return central_widget;
	} 
}