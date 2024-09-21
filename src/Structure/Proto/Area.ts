/**
 * A Area with a width and height. 
 */
export class Area {
	width: number;
	height: number;
	unit: string;

	/**
	 * @param width
	 * @param height
	 * @param unit - A hint describing the unit used for this width.
	 */
	constructor(width: number, height: number, unit?: string) {
		if (typeof unit !== 'undefined') this.unit = "";
		this.width = width;
		this.width = height;
		this.unit = unit
	}	
}
