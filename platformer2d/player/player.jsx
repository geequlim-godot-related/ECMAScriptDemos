const GRAVITY_VEC = new godot.Vector2(0, 900);
const FLOOR_NORMAL = new godot.Vector2(0, -1);
const SLOPE_SLIDE_STOP = 25.0;
const WALK_SPEED = 250; // pixels/sec
const JUMP_SPEED = 480;
const SIDING_CHANGE_SPEED = 10;
const BULLET_VELOCITY = 1000;
const SHOOT_TIME_SHOW_WEAPON = 0.2;
import Bullet from "res://player/Bullet.tscn";
export default class Player extends godot.KinematicBody2D {
	
	linear_vel = new godot.Vector2();
	shoot_time = 99999; // time since last shot
	anim = "";
	
	_ready() {
		this.sprite = this.$(godot.Sprite);
	}
	
	_physics_process(delta) {
		// Increment counters
		this.shoot_time += delta;
		
		/// MOVEMENT ///
		
		// Apply gravity
		this.linear_vel += (new godot.Vector2(delta)) * GRAVITY_VEC;
		// Move and slide
		this.linear_vel = this.move_and_slide(this.linear_vel, FLOOR_NORMAL, SLOPE_SLIDE_STOP);
		let on_floor = this.is_on_floor();
		
		/// CONTROL ///
		
		// Horizontal movement
		let target_speed = 0;
		if (godot.Input.is_action_pressed("move_left"))
			target_speed -= 1;
		if (godot.Input.is_action_pressed("move_right"))
			target_speed += 1;

		target_speed *= WALK_SPEED;
		this.linear_vel.x = godot.lerp(this.linear_vel.x, target_speed, 0.1);
		
		// Jumping
		if (on_floor && godot.Input.is_action_just_pressed("jump")) {
			this.linear_vel.y = -JUMP_SPEED;
			this.$("SoundJump").play();
		}
		
		// Shooting
		if (godot.Input.is_action_just_pressed("shoot")) {
			let bullet = Bullet.instance();
			bullet.position = this.$('Sprite/BulletShoot').global_position; // use node for shoot position
			bullet.linear_velocity = new godot.Vector2(this.sprite.scale.x * BULLET_VELOCITY, 0);
			bullet.add_collision_exception_with(this); // don't want player to collide with bullet
			this.get_parent().add_child(bullet) // don't want bullet to move with me, so add it as child of parent
			this.$('SoundShoot').play();
			this.shoot_time = 0;
		}
		
		/// ANIMATION ///
		let new_anim = "idle";
		
		if (on_floor) {
			if (this.linear_vel.x < - SIDING_CHANGE_SPEED) {
				let s = this.sprite.scale;
				s.x = -1;
				this.sprite.scale = s;
				new_anim = "run";
			}
			if (this.linear_vel.x > SIDING_CHANGE_SPEED) {
				let s = this.sprite.scale;
				s.x = 1;
				this.sprite.scale = s;
				new_anim = "run";
			}
		} else {
			// We want the character to immediately change facing side when the player
			// tries to change direction, during air control.
			// This allows for example the player to shoot quickly left then right.
			let s = this.sprite.scale;
			if (godot.Input.is_action_pressed("move_left") && !godot.Input.is_action_pressed("move_right"))
				s.x = - 1;
			if (godot.Input.is_action_pressed("move_right") && !godot.Input.is_action_pressed("move_left"))
				s.x = 1;
			this.sprite.scale = s;
			
			if (this.linear_vel.y < 0)
				new_anim = "jumping";
			else
				new_anim = "falling";
		}
		
		if (this.shoot_time < SHOOT_TIME_SHOW_WEAPON)
			new_anim += "_weapon";
		
		if (new_anim != this.anim) {
			this.anim = new_anim;
			this.$(godot.AnimationPlayer).play(this.anim);
		}
	}
}
