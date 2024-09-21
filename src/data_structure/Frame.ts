/**
 * A single frame structure that will be exported when animation is complete.
 */

import { Coordinate } from "data_structure/proto/Coordinate";
import { Area } from "data_structure/proto/Area";
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
