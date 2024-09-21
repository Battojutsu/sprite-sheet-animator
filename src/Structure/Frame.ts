/**
 * A single frame structure that will be exported when animation is complete.
 */

import { Coordinate } from "Structure/Proto/Coordinate";
import { Area } from "Structure/Proto/Area";
export class Frame {
	s_coord: Coordinate;
	area: Area;

	duration: number;
	metadata: Map<string, string>;

	/**
	 * @param s_coord - Source x and y coordinate.
	 * @param area - Area in pixels to the right of coordinate(x, y)
	 * @param duration - Duration to display this frame
	 * @param metadata - Any extra metadata you want to set.
	 */
	constructor(s_coord: Coordinate, area: Area, duration: number, metadata: Map<string, string> = new Map()) {
		this.s_coord = s_coord;
		this.area = area;
		this.duration = duration;
		this.metadata = metadata;
	}
}
