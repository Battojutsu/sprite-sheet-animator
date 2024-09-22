import { Animation } from "./data_structures";

/**
 * A collection of animation structures that will be exported when animation is complete.
 */
export class AnimationStructure {
	id: string;
	path_to_sprite: string;
	animations: Animation[];
	metadata: Map<string, string>;
	current_animation: Animation;
	constructor(id: string, path_to_sprite: string, metadata: Map<string, string> = new Map()) {
		// I made a design decison made to use a global here. In interest of reducing cognitive overhead.
		// I don't see it as a problem since there will only be one per application.
		global.anime = this;
		this.id = id;
		this.path_to_sprite = this.path_to_sprite = path_to_sprite;
		this.animations = [];

		// There needs to be at least one animation.
		this.current_animation = new Animation();
		this.pushAnimation(this.current_animation);
	}
	
	setMetadata(metadata: Map<string, string>) {
		this.metadata = metadata;
	}

	pushAnimation(animation: Animation) {
		this.animations.push(animation);
	}
}
