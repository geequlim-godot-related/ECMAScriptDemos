const GRAVITY_VEC = new godot.Vector2(0, 900);
const FLOOR_NORMAL = new godot.Vector2(0, -1);

const STATE_WALKING = 0;
const STATE_KILLED = 1;
const WALK_SPEED = 70;

export default class Enermy extends godot.KinematicBody2D {
	
	linear_velocity = new godot.Vector2();
	direction = -1;
	anim = "";
	state = STATE_WALKING;
	
	_ready() {
		this.DetectFloorLeft = this.$('DetectFloorLeft');
		this.DetectWallLeft = this.$('DetectWallLeft');
		this.DetectFloorRight = this.$('DetectFloorRight');
		this.DetectWallRight = this.$('DetectWallRight');
		this.sprite = this.$('Sprite');
	}
	
	_physics_process(delta) {
		let new_anim = "idle"
		if (this.state == STATE_WALKING) {
			this.linear_velocity += GRAVITY_VEC * new godot.Vector2(delta);
			this.linear_velocity.x = this.direction * WALK_SPEED;
			this.linear_velocity = this.move_and_slide(this.linear_velocity, FLOOR_NORMAL);
			
			if (!this.DetectFloorLeft.is_colliding() || this.DetectWallLeft.is_colliding())
				this.direction = 1;
			if (!this.DetectFloorRight.is_colliding() || this.DetectWallRight.is_colliding())
				this.direction = -1;
			this.sprite.scale = new godot.Vector2(this.direction, 1);
			new_anim = "walk";
		} else {
			new_anim = "explode";
		}
		if (this.anim != new_anim) {
			this.anim = new_anim;
			this.$('Anim').play(this.anim);
		}
	}
	
	hit_by_bullet() {
		this.state = STATE_KILLED;
	}
}
