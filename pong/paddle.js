import Ball from "./ball";

const MOVE_SPEED = 100;

export default class Paddle extends godot.Area2D {

	_process(delta) {
		let which = this.name;
		// move up and down based on input
		let pos = this.position;
		if (godot.Input.is_action_pressed(which + "_move_up") && this.position.y > 0)
			pos.y -= MOVE_SPEED * delta;
		if (godot.Input.is_action_pressed(which + "_move_down") && this.position.y < this.get_viewport_rect().size.y)
			pos.y += MOVE_SPEED * delta;
		this.position = pos;
	}
	
	_on_area_entered(area) {
		if (area instanceof Ball) {
			let dir = new godot.Vector2(this.ball_dir, godot.randf() * 2 - 1).normalized();
			area.direction = dir;
		}
	}
}

godot.register_property(Paddle, "ball_dir", 1);
