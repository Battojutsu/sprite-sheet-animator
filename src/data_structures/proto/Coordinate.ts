/**
 * A x y coordinate.
 */
export class Coordinate {
	x: number;
	y: number;

	/**
	 * @param x x coordinate
	 * @param y y coordinate
	 */
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Check equality of Coordinates
	 * @param other check if this coordinate is equal to this otehr coordinate.
	 * @returns whether this is equal or not as a boolean.
	 */
	is_equal_to(other: Coordinate) {
		return this?.x == other?.x && this?.y == other?.y;
	}
}
