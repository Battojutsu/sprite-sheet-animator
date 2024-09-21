import { Animation } from "./data_structures";

/**
 * A collection of animation structures that will be exported when animation is complete.
 */
export class AnimationStructure {
	id: string;
	path_to_sprite: string;
	animations: Animation[];
	metadata: Map<string, string>;
	constructor(id: string, path_to_sprite: string, metadata: Map<string, string> = new Map()) {
		this.id = id;
		this.path_to_sprite = this.path_to_sprite = path_to_sprite;
		this.animations = [];
	}
	
	setMetadata(metadata: Map<string, string>) {
		this.metadata = metadata;
	}

	pushAnimation(animation: Animation) {
		this.animations.push(animation);
	}
}
