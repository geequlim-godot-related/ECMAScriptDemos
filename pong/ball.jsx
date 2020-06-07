const BALL_SPEED = 100;

export default class Ball extends godot.Area2D {
	
	direction = new godot.Vector2(-1, 0);
	speed = BALL_SPEED;
	
	_ready() {
		this.initial_pos = this.position;
	}

	reset() {
		this.position = this.initial_pos;
		this.speed = BALL_SPEED;
		this.direction = new godot.Vector2(-1, 0);
	}
	
	_process(delta) {
		this.position += this.direction * (new godot.Vector2(this.speed * delta));
	}
}
