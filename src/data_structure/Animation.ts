import { Frame } from "./Frame";

/**
 * A single animation structure that will be exported when animation is complete.
 * metadata is a optional parameter.
 */
export class Animation {
	frames: Frame[];
	metadata: Map<string, string>;
	constructor(metadata: Map<string, string> = new Map() ) {
		this.frames = [];
		this.metadata = metadata;
	}
}
