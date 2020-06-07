import Ball from "./ball";

export default class Wall extends godot.Area2D {
	_on_wall_area_entered(area) {
		if (area instanceof Ball) {
			area.reset();
		}
	}
}
