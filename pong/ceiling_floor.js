import Ball from "./ball";

export default class CeilingFloor extends godot.Area2D {
	_on_area_entered(area) {
		if (area instanceof Ball) {
			area.direction.y = this.y_direction;
		}
	}
}
godot.register_property(CeilingFloor, 'y_direction', 1);
