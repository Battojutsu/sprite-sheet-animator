/**
 * A single frame structure that will be exported when animation is complete.
 */
export class Frame {
	x: number;
	y: number;
	sx: number;
	sy: number;
	width: number;
	height: number;
	duration: number;
	metadata: Map<string, string>;

	/**
	 * @param x Source x coordinate
	 * @param y Source y coordinate
	 * @param width - Width in pixels to the right of coordinate(x, y)
	 * @param height - height in pixels downwards of the coordinate(x, y)
	 * @param duration - Duration to display this frame
	 * @param metadata - Any extra metadata you want to set.
	 */
	constructor(x: number, y: number, width: number, height: number, duration: number, metadata: Map<string, string> = new Map()) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.duration = duration;
		this.metadata = metadata;
	}

	
}
